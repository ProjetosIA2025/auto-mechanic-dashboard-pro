import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, FileText, Eye, Edit, Printer, MessageSquare } from "lucide-react";
import { ServiceOrderForm } from "@/components/forms/ServiceOrderForm";

const mockOrders = [
  {
    id: '001',
    client: 'João Silva',
    vehicle: 'Honda Civic - ABC-1234',
    openDate: '2024-01-15',
    status: 'Em Andamento',
    value: 'R$ 850,00',
    services: ['Troca de óleo', 'Alinhamento']
  },
  {
    id: '002',
    client: 'Maria Santos',
    vehicle: 'Toyota Corolla - XYZ-5678',
    openDate: '2024-01-14',
    status: 'Concluída',
    value: 'R$ 1.200,00',
    services: ['Revisão completa', 'Troca de pastilhas']
  },
  {
    id: '003',
    client: 'Pedro Costa',
    vehicle: 'Ford Focus - DEF-9012',
    openDate: '2024-01-13',
    status: 'Pendente',
    value: 'R$ 650,00',
    services: ['Diagnóstico eletrônico']
  },
  {
    id: '004',
    client: 'Ana Oliveira',
    vehicle: 'Chevrolet Onix - GHI-3456',
    openDate: '2024-01-10',
    status: 'Atrasada',
    value: 'R$ 920,00',
    services: ['Reparo transmissão', 'Troca de embreagem']
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Concluída': return 'bg-green-100 text-green-800 border-green-200';
    case 'Em Andamento': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Atrasada': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleNewOrder = () => {
    setShowNewOrderForm(true);
  };

  const handleOrderSubmit = (data: any) => {
    console.log('Nova OS:', data);
    setShowNewOrderForm(false);
    // Aqui você integraria com a API/estado global
  };

  const handleOrderCancel = () => {
    setShowNewOrderForm(false);
  };

  if (showNewOrderForm) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setShowNewOrderForm(false)}>
            ← Voltar para Lista
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nova Ordem de Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            <ServiceOrderForm
              onSubmit={handleOrderSubmit}
              onCancel={handleOrderCancel}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ordens de Serviço</h1>
          <p className="text-gray-600 mt-1">Gerencie todas as ordens de serviço da oficina</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNewOrder}>
          <Plus className="h-4 w-4 mr-2" />
          Nova OS
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por cliente, veículo ou número da OS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Concluída">Concluída</SelectItem>
                  <SelectItem value="Atrasada">Atrasada</SelectItem>
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

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Lista de Ordens de Serviço ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">OS</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Cliente</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Veículo</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Data Abertura</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Valor</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm font-semibold text-blue-600">#{order.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{order.client}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-700">{order.vehicle}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-600">{new Date(order.openDate).toLocaleDateString('pt-BR')}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{order.value}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600 hover:text-green-700">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma OS encontrada</h3>
              <p className="text-gray-600">Tente ajustar os filtros ou criar uma nova ordem de serviço.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
