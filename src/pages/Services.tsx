
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Wrench, Package, Edit, Trash2, AlertTriangle } from "lucide-react";

const mockServices = [
  {
    id: '1',
    name: 'Troca de óleo',
    description: 'Troca completa do óleo do motor com filtro',
    laborCost: 80.00,
    estimatedTime: '30 min'
  },
  {
    id: '2',
    name: 'Alinhamento',
    description: 'Alinhamento das rodas dianteiras e traseiras',
    laborCost: 120.00,
    estimatedTime: '1h'
  },
  {
    id: '3',
    name: 'Balanceamento',
    description: 'Balanceamento das 4 rodas',
    laborCost: 100.00,
    estimatedTime: '45 min'
  },
  {
    id: '4',
    name: 'Revisão completa',
    description: 'Revisão geral do veículo com checklist completo',
    laborCost: 350.00,
    estimatedTime: '3h'
  },
  {
    id: '5',
    name: 'Diagnóstico eletrônico',
    description: 'Diagnóstico completo dos sistemas eletrônicos',
    laborCost: 80.00,
    estimatedTime: '1h'
  }
];

const mockParts = [
  {
    id: '1',
    name: 'Óleo motor 5W30',
    code: 'OLE001',
    unitPrice: 45.00,
    stock: 15,
    minStock: 5,
    supplier: 'Distribuidora ABC'
  },
  {
    id: '2',
    name: 'Filtro de óleo',
    code: 'FIL001',
    unitPrice: 25.00,
    stock: 8,
    minStock: 10,
    supplier: 'Peças & Cia'
  },
  {
    id: '3',
    name: 'Pastilhas de freio dianteiras',
    code: 'FRE001',
    unitPrice: 180.00,
    stock: 3,
    minStock: 5,
    supplier: 'Auto Peças Silva'
  },
  {
    id: '4',
    name: 'Correia dentada',
    code: 'COR001',
    unitPrice: 85.00,
    stock: 12,
    minStock: 3,
    supplier: 'Distribuidora ABC'
  },
  {
    id: '5',
    name: 'Vela de ignição',
    code: 'VEL001',
    unitPrice: 35.00,
    stock: 2,
    minStock: 8,
    supplier: 'Peças & Cia'
  },
  {
    id: '6',
    name: 'Amortecedor dianteiro',
    code: 'AMO001',
    unitPrice: 250.00,
    stock: 6,
    minStock: 2,
    supplier: 'Auto Peças Silva'
  }
];

export default function Services() {
  const [serviceSearch, setServiceSearch] = useState('');
  const [partSearch, setPartSearch] = useState('');

  const filteredServices = mockServices.filter(service => 
    service.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
    service.description.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  const filteredParts = mockParts.filter(part => 
    part.name.toLowerCase().includes(partSearch.toLowerCase()) ||
    part.code.toLowerCase().includes(partSearch.toLowerCase()) ||
    part.supplier.toLowerCase().includes(partSearch.toLowerCase())
  );

  const criticalStockParts = mockParts.filter(part => part.stock <= part.minStock);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Serviços & Produtos</h1>
          <p className="text-gray-600 mt-1">Gerencie o catálogo de serviços e produtos da oficina</p>
        </div>
      </div>

      {/* Critical Stock Alert */}
      {criticalStockParts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Alerta de Estoque Crítico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 mb-3">
              {criticalStockParts.length} item(ns) com estoque abaixo do mínimo:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {criticalStockParts.map((part) => (
                <div key={part.id} className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="font-medium text-sm">{part.name}</span>
                  <span className="text-sm text-orange-600 font-medium">
                    {part.stock}/{part.minStock}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Serviços
          </TabsTrigger>
          <TabsTrigger value="parts" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Produtos/Peças
          </TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Card className="flex-1">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar serviços..."
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Serviço
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Lista de Serviços ({filteredServices.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Serviço</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Descrição</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Valor M.O.</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Tempo Est.</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.map((service) => (
                      <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{service.name}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-700 max-w-md">{service.description}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-green-600">R$ {service.laborCost.toFixed(2)}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-600">{service.estimatedTime}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum serviço encontrado</h3>
                  <p className="text-gray-600">Tente ajustar a busca ou cadastre um novo serviço.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parts Tab */}
        <TabsContent value="parts" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Card className="flex-1">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar produtos/peças..."
                    value={partSearch}
                    onChange={(e) => setPartSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Lista de Produtos/Peças ({filteredParts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Produto</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Código</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Preço Unit.</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Estoque</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Fornecedor</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParts.map((part) => (
                      <tr key={part.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{part.name}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-mono text-sm text-gray-600">{part.code}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-green-600">R$ {part.unitPrice.toFixed(2)}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${
                              part.stock <= part.minStock ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {part.stock}
                            </span>
                            {part.stock <= part.minStock && (
                              <AlertTriangle className="h-4 w-4 text-orange-500" />
                            )}
                            <span className="text-xs text-gray-500">
                              (mín: {part.minStock})
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-700">{part.supplier}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredParts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
                  <p className="text-gray-600">Tente ajustar a busca ou cadastre um novo produto.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
