
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TrendingUp, TrendingDown, Save, X, Package } from "lucide-react";

const stockMovementSchema = z.object({
  partId: z.string().min(1, "Peça é obrigatória"),
  quantity: z.number().min(1, "Quantidade deve ser maior que zero"),
  type: z.enum(["Entrada", "Saída"], { required_error: "Tipo é obrigatório" }),
  orderId: z.string().optional(),
  reason: z.string().min(1, "Motivo é obrigatório")
});

type StockMovementFormData = z.infer<typeof stockMovementSchema>;

interface StockMovementFormProps {
  initialData?: Partial<StockMovementFormData>;
  onSubmit: (data: StockMovementFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const mockParts = [
  { id: '1', name: 'Óleo motor 5W30', code: 'OLE001' },
  { id: '2', name: 'Filtro de óleo', code: 'FIL001' },
  { id: '3', name: 'Pastilhas de freio', code: 'FRE001' },
  { id: '4', name: 'Correia dentada', code: 'COR001' }
];

const mockOrders = [
  { id: '001', description: 'OS #001 - Honda Civic' },
  { id: '002', description: 'OS #002 - Toyota Corolla' },
  { id: '003', description: 'OS #003 - Ford Focus' }
];

export function StockMovementForm({ initialData, onSubmit, onCancel, isLoading }: StockMovementFormProps) {
  const form = useForm<StockMovementFormData>({
    resolver: zodResolver(stockMovementSchema),
    defaultValues: {
      partId: initialData?.partId || '',
      quantity: initialData?.quantity || 1,
      type: initialData?.type || 'Entrada',
      orderId: initialData?.orderId || '',
      reason: initialData?.reason || ''
    }
  });

  const movementType = form.watch('type');

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Package className="h-6 w-6 text-blue-600" />
            Nova Movimentação de Estoque
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Seleção da Peça */}
              <FormField
                control={form.control}
                name="partId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peça *</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma peça" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockParts.map((part) => (
                          <SelectItem key={part.id} value={part.id}>
                            {part.name} - {part.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quantidade */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tipo de Movimentação */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Movimentação *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-row space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Entrada" id="entrada" />
                            <Label htmlFor="entrada" className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              Entrada
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Saída" id="saida" />
                            <Label htmlFor="saida" className="flex items-center gap-2">
                              <TrendingDown className="h-4 w-4 text-red-600" />
                              Saída
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Ordem de Serviço Vinculada (apenas para saídas) */}
              {movementType === 'Saída' && (
                <FormField
                  control={form.control}
                  name="orderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ordem de Serviço Vinculada</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma OS (opcional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockOrders.map((order) => (
                            <SelectItem key={order.id} value={order.id}>
                              {order.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Motivo/Observações */}
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Motivo/Observações *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={
                          movementType === 'Entrada' 
                            ? "Ex: Compra do fornecedor XYZ, Devolução de cliente..."
                            : "Ex: Utilizada na OS #001, Defeito de fabricação..."
                        }
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botões */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Salvando...' : 'Registrar Movimentação'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
