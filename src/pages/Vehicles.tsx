
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Car, History, Edit, AlertTriangle } from "lucide-react";

const mockVehicles = [
  {
    id: '1',
    plate: 'ABC-1234',
    brand: 'Honda',
    model: 'Civic',
    year: 2020,
    color: 'Prata',
    client: 'João Silva',
    mileage: 45000,
    maintenanceCount: 8,
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-04-10'
  },
  {
    id: '2',
    plate: 'XYZ-5678',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2019,
    color: 'Branco',
    client: 'Maria Santos',
    mileage: 52000,
    maintenanceCount: 12,
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-04-05'
  },
  {
    id: '3',
    plate: 'DEF-9012',
    brand: 'Ford',
    model: 'Focus',
    year: 2018,
    color: 'Azul',
    client: 'Pedro Costa',
    mileage: 68000,
    maintenanceCount: 15,
    lastMaintenance: '2023-12-20',
    nextMaintenance: '2024-03-20'
  },
];

export default function Vehicles() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = mockVehicles.filter(vehicle => 
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isMaintenanceDue = (nextMaintenance: string) => {
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenance);
    const diffTime = maintenanceDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Veículos</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os veículos cadastrados</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Cadastrar Veículo
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por placa, marca, modelo ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Car className="h-5 w-5 text-blue-600" />
                  {vehicle.plate}
                </CardTitle>
                {isMaintenanceDue(vehicle.nextMaintenance) && (
                  <div className="flex items-center gap-1 text-orange-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs font-medium">Manutenção</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Marca/Modelo:</span>
                  <span className="text-sm font-medium">{vehicle.brand} {vehicle.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ano:</span>
                  <span className="text-sm font-medium">{vehicle.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cor:</span>
                  <span className="text-sm font-medium">{vehicle.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cliente:</span>
                  <span className="text-sm font-medium text-blue-600">{vehicle.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quilometragem:</span>
                  <span className="text-sm font-medium">{vehicle.mileage.toLocaleString()} km</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Manutenções:</span>
                  <span className="text-sm font-medium">{vehicle.maintenanceCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Próxima:</span>
                  <span className={`text-sm font-medium ${
                    isMaintenanceDue(vehicle.nextMaintenance) ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {new Date(vehicle.nextMaintenance).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <History className="h-4 w-4 mr-1" />
                  Histórico
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum veículo encontrado</h3>
            <p className="text-gray-600">Tente ajustar sua busca ou cadastre um novo veículo.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
