import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Plus, Search, Filter, TrendingUp, TrendingDown, AlertTriangle, Calendar } from "lucide-react";
import { StockMovementForm } from "@/components/forms/StockMovementForm";

const mockMovements = [
  {
    id: '1',
    date: '2024-01-15',
    partName: 'Óleo motor 5W30',
    partCode: 'OLE001',
    type: 'Saída',
    quantity: 2,
    relatedOS: 'OS #001',
    reason: 'Troca de óleo - Honda Civic'
  },
  {
    id: '2',
    date: '2024-01-15',
    partName: 'Filtro de óleo',
    partCode: 'FIL001',
    type: 'Saída',
    quantity: 1,
    relatedOS: 'OS #001',
    reason: 'Troca de óleo - Honda Civic'
  },
  {
    id: '3',
    date: '2024-01-14',
    partName: 'Pastilhas de freio dianteiras',
    partCode: 'FRE001',
    type: 'Saída',
    quantity: 1,
    relatedOS: 'OS #002',
    reason: 'Troca de pastilhas - Toyota Corolla'
  },
  {
    id: '4',
    date: '2024-01-12',
    partName: 'Óleo motor 5W30',
    partCode: 'OLE001',
    type: 'Entrada',
    quantity: 10,
    relatedOS: null,
    reason: 'Compra - Fornecedor ABC'
  },
  {
    id: '5',
    date: '2024-01-10',
    partName: 'Correia dentada',
    partCode: 'COR001',
    type: 'Saída',
    quantity: 1,
    relatedOS: 'OS #008',
    reason: 'Troca de correia - Ford Focus'
  },
  {
    id: '6',
    date: '2024-01-08',
    partName: 'Vela de ignição',
    partCode: 'VEL001',
    type: 'Entrada',
    quantity: 8,
    relatedOS: null,
    reason: 'Compra - Peças & Cia'
  }
];

const mockParts = [
  { id: '1', name: 'Óleo motor 5W30', code: 'OLE001', stock: 15, minStock: 5 },
  { id: '2', name: 'Filtro de óleo', code: 'FIL001', stock: 8, minStock: 10 },
  { id: '3', name: 'Pastilhas de freio dianteiras', code: 'FRE001', stock: 3, minStock: 5 },
  { id: '4', name: 'Correia dentada', code: 'COR001', stock: 12, minStock: 3 },
  { id: '5', name: 'Vela de ignição', code: 'VEL001', stock: 2, minStock: 8 },
  { id: '6', name: 'Amortecedor dianteiro', code: 'AMO001', stock: 6, minStock: 2 }
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showNewMovement, setShowNewMovement] = useState(false);

  const filteredMovements = mockMovements.filter(movement => {
    const matchesSearch = movement.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.partCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || movement.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const criticalStockParts = mockParts.filter(part => part.stock <= part.minStock);

  const getMovementIcon = (type: string) => {
    return type === 'Entrada' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getMovementColor = (type: string) => {
    return type === 'Entrada' ? 'text-green-600' : 'text-red-600';
  };

  const handleMovementSubmit = (data: any) => {
    console.log('Nova Movimentação:', data);
    setShowNewMovement(false);
  };

  const handleMovementCancel = () => {
    setShowNewMovement(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Controle de Estoque</h1>
          <p className="text-gray-600 mt-1">Acompanhe as movimentações e níveis de estoque</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowNewMovement(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Movimentação
        </Button>
      </div>

      {/* Critical Stock Alert */}
      {criticalStockParts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Alerta de Estoque Crítico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-3">
              {criticalStockParts.length} item(ns) com estoque abaixo do mínimo:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {criticalStockParts.map((part) => (
                <div key={part.id} className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="font-medium text-sm">{part.name}</span>
                  <span className="text-sm text-red-600 font-medium">
                    {part.stock}/{part.minStock}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Movimentações Hoje</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Entradas</p>
                <p className="text-2xl font-bold text-green-600">18</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saídas</p>
                <p className="text-2xl font-bold text-red-600">5</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Itens Críticos</p>
                <p className="text-2xl font-bold text-orange-600">{criticalStockParts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por produto, código ou motivo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="Entrada">Entrada</SelectItem>
                  <SelectItem value="Saída">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Movimentações de Estoque ({filteredMovements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Data</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Produto</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Tipo</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Quantidade</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">OS/Motivo</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovements.map((movement) => (
                  <tr key={movement.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="text-gray-600">
                        {new Date(movement.date).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{movement.partName}</div>
                        <div className="text-sm text-gray-500 font-mono">{movement.partCode}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`flex items-center gap-2 ${getMovementColor(movement.type)}`}>
                        {getMovementIcon(movement.type)}
                        <span className="font-medium">{movement.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`font-semibold ${getMovementColor(movement.type)}`}>
                        {movement.type === 'Entrada' ? '+' : '-'}{movement.quantity}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        {movement.relatedOS && (
                          <div className="font-medium text-blue-600">{movement.relatedOS}</div>
                        )}
                        <div className="text-sm text-gray-600">{movement.reason}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredMovements.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma movimentação encontrada</h3>
              <p className="text-gray-600">Tente ajustar os filtros ou registre uma nova movimentação.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form modal */}
      {showNewMovement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Nova Movimentação de Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <StockMovementForm
                onSubmit={handleMovementSubmit}
                onCancel={handleMovementCancel}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
