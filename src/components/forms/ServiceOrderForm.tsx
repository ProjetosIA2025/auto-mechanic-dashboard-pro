
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Minus, Search, AlertTriangle, Save, X, Printer } from "lucide-react";

const serviceOrderSchema = z.object({
  clientId: z.string().min(1, "Cliente é obrigatório"),
  vehicleId: z.string().min(1, "Veículo é obrigatório"),
  services: z.array(z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number().min(1),
    unitPrice: z.number().min(0)
  })).min(1, "Pelo menos um serviço deve ser selecionado"),
  parts: z.array(z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number().min(1),
    unitPrice: z.number().min(0),
    stock: z.number()
  })),
  observations: z.string().optional(),
  laborCost: z.number().min(0),
  discount: z.number().min(0),
  status: z.enum(["Aberta", "Em andamento", "Concluída", "Cancelada"])
});

type ServiceOrderFormData = z.infer<typeof serviceOrderSchema>;

interface ServiceOrderFormProps {
  initialData?: Partial<ServiceOrderFormData>;
  onSubmit: (data: ServiceOrderFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const mockClients = [
  { id: '1', name: 'João Silva', document: '123.456.789-00' },
  { id: '2', name: 'Maria Santos', document: '987.654.321-00' },
  { id: '3', name: 'Pedro Costa', document: '456.789.123-00' }
];

const mockVehicles = [
  { id: '1', plate: 'ABC-1234', model: 'Honda Civic', clientId: '1' },
  { id: '2', plate: 'XYZ-5678', model: 'Toyota Corolla', clientId: '2' },
  { id: '3', plate: 'DEF-9012', model: 'Ford Focus', clientId: '3' }
];

const mockServices = [
  { id: '1', name: 'Troca de óleo', price: 80 },
  { id: '2', name: 'Alinhamento', price: 120 },
  { id: '3', name: 'Balanceamento', price: 100 },
  { id: '4', name: 'Revisão completa', price: 350 }
];

const mockParts = [
  { id: '1', name: 'Óleo motor 5W30', price: 45, stock: 15 },
  { id: '2', name: 'Filtro de óleo', price: 25, stock: 8 },
  { id: '3', name: 'Pastilhas de freio', price: 180, stock: 3 },
  { id: '4', name: 'Correia dentada', price: 85, stock: 12 }
];

export function ServiceOrderForm({ initialData, onSubmit, onCancel, isLoading }: ServiceOrderFormProps) {
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [selectedParts, setSelectedParts] = useState<any[]>([]);
  const [clientSearch, setClientSearch] = useState('');
  const [vehicleSearch, setVehicleSearch] = useState('');

  const form = useForm<ServiceOrderFormData>({
    resolver: zodResolver(serviceOrderSchema),
    defaultValues: {
      clientId: initialData?.clientId || '',
      vehicleId: initialData?.vehicleId || '',
      services: initialData?.services || [],
      parts: initialData?.parts || [],
      observations: initialData?.observations || '',
      laborCost: initialData?.laborCost || 0,
      discount: initialData?.discount || 0,
      status: initialData?.status || 'Aberta'
    }
  });

  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    client.document.includes(clientSearch)
  );

  const selectedClientId = form.watch('clientId');
  const filteredVehicles = mockVehicles.filter(vehicle => 
    vehicle.clientId === selectedClientId &&
    (vehicle.plate.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
     vehicle.model.toLowerCase().includes(vehicleSearch.toLowerCase()))
  );

  const addService = (service: any) => {
    const newService = { ...service, quantity: 1, unitPrice: service.price };
    setSelectedServices([...selectedServices, newService]);
  };

  const removeService = (index: number) => {
    setSelectedServices(selectedServices.filter((_, i) => i !== index));
  };

  const updateServiceQuantity = (index: number, quantity: number) => {
    const updated = [...selectedServices];
    updated[index].quantity = quantity;
    setSelectedServices(updated);
  };

  const addPart = (part: any) => {
    if (part.stock <= 0) return;
    const newPart = { ...part, quantity: 1, unitPrice: part.price };
    setSelectedParts([...selectedParts, newPart]);
  };

  const removePart = (index: number) => {
    setSelectedParts(selectedParts.filter((_, i) => i !== index));
  };

  const updatePartQuantity = (index: number, quantity: number) => {
    const updated = [...selectedParts];
    const maxQuantity = updated[index].stock;
    updated[index].quantity = Math.min(quantity, maxQuantity);
    setSelectedParts(updated);
  };

  const calculateTotal = () => {
    const servicesTotal = selectedServices.reduce((sum, service) => 
      sum + (service.quantity * service.unitPrice), 0);
    const partsTotal = selectedParts.reduce((sum, part) => 
      sum + (part.quantity * part.unitPrice), 0);
    const laborCost = form.watch('laborCost') || 0;
    const discount = form.watch('discount') || 0;
    return servicesTotal + partsTotal + laborCost - discount;
  };

  const handleSubmit = (data: ServiceOrderFormData) => {
    const formData = {
      ...data,
      services: selectedServices,
      parts: selectedParts
    };
    onSubmit(formData);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Save className="h-6 w-6 text-blue-600" />
            {initialData ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cliente */}
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente *</FormLabel>
                      <div className="space-y-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Buscar cliente..."
                            value={clientSearch}
                            onChange={(e) => setClientSearch(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um cliente" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredClients.map((client) => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name} - {client.document}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Veículo */}
                <FormField
                  control={form.control}
                  name="vehicleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Veículo *</FormLabel>
                      <div className="space-y-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Buscar veículo..."
                            value={vehicleSearch}
                            onChange={(e) => setVehicleSearch(e.target.value)}
                            className="pl-10"
                            disabled={!selectedClientId}
                          />
                        </div>
                        <Select value={field.value} onValueChange={field.onChange} disabled={!selectedClientId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um veículo" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredVehicles.map((vehicle) => (
                              <SelectItem key={vehicle.id} value={vehicle.id}>
                                {vehicle.plate} - {vehicle.model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Serviços */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Serviços *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockServices.map((service) => (
                    <Card key={service.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-gray-600">R$ {service.price.toFixed(2)}</p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => addService(service)}
                          disabled={selectedServices.some(s => s.id === service.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {selectedServices.length > 0 && (
                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">Serviços Selecionados</h4>
                    <div className="space-y-3">
                      {selectedServices.map((service, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{service.name}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => updateServiceQuantity(index, service.quantity - 1)}
                              disabled={service.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{service.quantity}</span>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => updateServiceQuantity(index, service.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <span className="ml-2 font-medium">
                              R$ {(service.quantity * service.unitPrice).toFixed(2)}
                            </span>
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              onClick={() => removeService(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              {/* Peças */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Peças</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockParts.map((part) => (
                    <Card key={part.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{part.name}</h4>
                          <p className="text-sm text-gray-600">R$ {part.price.toFixed(2)}</p>
                          <div className="flex items-center gap-1 text-xs">
                            {part.stock <= 5 && (
                              <AlertTriangle className="h-3 w-3 text-orange-500" />
                            )}
                            <span className={part.stock <= 5 ? 'text-orange-500' : 'text-green-600'}>
                              Estoque: {part.stock}
                            </span>
                          </div>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => addPart(part)}
                          disabled={part.stock <= 0 || selectedParts.some(p => p.id === part.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {selectedParts.length > 0 && (
                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">Peças Selecionadas</h4>
                    <div className="space-y-3">
                      {selectedParts.map((part, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{part.name}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => updatePartQuantity(index, part.quantity - 1)}
                              disabled={part.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{part.quantity}</span>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => updatePartQuantity(index, part.quantity + 1)}
                              disabled={part.quantity >= part.stock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <span className="ml-2 font-medium">
                              R$ {(part.quantity * part.unitPrice).toFixed(2)}
                            </span>
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              onClick={() => removePart(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Observações */}
                <FormField
                  control={form.control}
                  name="observations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Observações adicionais sobre o serviço..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aberta">Aberta</SelectItem>
                          <SelectItem value="Em andamento">Em andamento</SelectItem>
                          <SelectItem value="Concluída">Concluída</SelectItem>
                          <SelectItem value="Cancelada">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Valores */}
              <Card className="p-4">
                <h4 className="font-semibold mb-4">Valores</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="laborCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mão de Obra</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desconto</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label>Total</Label>
                    <div className="text-2xl font-bold text-blue-600">
                      R$ {calculateTotal().toFixed(2)}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Botões */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button type="button" variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
                <Button type="submit" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
