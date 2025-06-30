import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, Car, FileText, Phone, Mail, MessageSquare, Edit, Eye, Trash2 } from "lucide-react";
import { ClientForm } from "@/components/forms/ClientForm";

const mockClients = [
  {
    id: '1',
    name: 'João Silva',
    document: '123.456.789-00',
    phone: '(11) 99999-1234',
    email: 'joao.silva@email.com',
    vehicleCount: 2,
    serviceCount: 15,
    lastService: '2024-01-10',
    address: 'Rua das Flores, 123 - São Paulo/SP'
  },
  {
    id: '2',
    name: 'Maria Santos',
    document: '987.654.321-00',
    phone: '(11) 88888-5678',
    email: 'maria.santos@email.com',
    vehicleCount: 1,
    serviceCount: 8,
    lastService: '2024-01-05',
    address: 'Av. Paulista, 456 - São Paulo/SP'
  },
  {
    id: '3',
    name: 'Pedro Costa',
    document: '456.789.123-00',
    phone: '(11) 77777-9012',
    email: 'pedro.costa@email.com',
    vehicleCount: 3,
    serviceCount: 22,
    lastService: '2023-12-20',
    address: 'Rua da Liberdade, 789 - São Paulo/SP'
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    document: '12.345.678/0001-90',
    phone: '(11) 66666-3456',
    email: 'ana@empresa.com.br',
    vehicleCount: 5,
    serviceCount: 35,
    lastService: '2024-01-12',
    address: 'Rua do Comércio, 321 - São Paulo/SP'
  }
];

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showNewClientForm, setShowNewClientForm] = useState(false);

  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.includes(searchTerm) ||
    client.phone.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClient = (client: any) => {
    setSelectedClient(client);
  };

  const closeClientView = () => {
    setSelectedClient(null);
  };

  const handleNewClient = () => {
    setShowNewClientForm(true);
  };

  const handleClientSubmit = (data: any) => {
    console.log('Novo Cliente:', data);
    setShowNewClientForm(false);
    // Aqui você integraria com a API/estado global
  };

  const handleClientCancel = () => {
    setShowNewClientForm(false);
  };

  if (showNewClientForm) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setShowNewClientForm(false)}>
            ← Voltar para Lista
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar Novo Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <ClientForm
              onSubmit={handleClientSubmit}
              onCancel={handleClientCancel}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedClient) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={closeClientView}>
              ← Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedClient.name}</h1>
              <p className="text-gray-600">{selectedClient.document}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              E-mail
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-blue-600" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Telefone:</span>
                <p className="font-medium">{selectedClient.phone}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">E-mail:</span>
                <p className="font-medium">{selectedClient.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Endereço:</span>
                <p className="font-medium">{selectedClient.address}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="h-5 w-5 text-green-600" />
                Veículos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{selectedClient.vehicleCount}</div>
                <p className="text-sm text-gray-600">Veículos cadastrados</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-orange-600" />
                Serviços
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{selectedClient.serviceCount}</div>
                <p className="text-sm text-gray-600">OS realizadas</p>
                <p className="text-xs text-gray-500 mt-2">
                  Último: {new Date(selectedClient.lastService).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Veículos do Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Honda Civic - ABC-1234</h4>
                    <p className="text-sm text-gray-600">2020 • Prata • 45.000 km</p>
                  </div>
                  <Button size="sm" variant="outline">Ver</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Toyota Corolla - XYZ-5678</h4>
                    <p className="text-sm text-gray-600">2019 • Branco • 52.000 km</p>
                  </div>
                  <Button size="sm" variant="outline">Ver</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Serviços</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">OS #001 - Honda Civic</h4>
                    <p className="text-sm text-gray-600">10/01/2024 • R$ 850,00 • Concluída</p>
                  </div>
                  <Button size="sm" variant="outline">Ver</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">OS #015 - Toyota Corolla</h4>
                    <p className="text-sm text-gray-600">05/01/2024 • R$ 1.200,00 • Concluída</p>
                  </div>
                  <Button size="sm" variant="outline">Ver</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">OS #008 - Honda Civic</h4>
                    <p className="text-sm text-gray-600">20/12/2023 • R$ 650,00 • Concluída</p>
                  </div>
                  <Button size="sm" variant="outline">Ver</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os clientes da oficina</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNewClient}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, CPF/CNPJ, telefone ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  {client.name}
                </CardTitle>
              </div>
              <p className="text-sm text-gray-600">{client.document}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{client.email}</span>
                </div>
              </div>

              <div className="flex justify-between text-center border-t pt-3">
                <div>
                  <div className="text-lg font-bold text-blue-600">{client.vehicleCount}</div>
                  <div className="text-xs text-gray-600">Veículos</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{client.serviceCount}</div>
                  <div className="text-xs text-gray-600">OS</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    {new Date(client.lastService).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="text-xs text-gray-600">Último serviço</div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewClient(client)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente encontrado</h3>
            <p className="text-gray-600">Tente ajustar sua busca ou cadastre um novo cliente.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
