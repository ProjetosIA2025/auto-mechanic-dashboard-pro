
import { StatCard } from "@/components/ui/StatCard";
import { 
  FileText, 
  CheckCircle, 
  DollarSign, 
  AlertTriangle, 
  Car, 
  Package,
  Calendar,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

// Mock data
const revenueData = [
  { month: 'Jan', value: 12500 },
  { month: 'Fev', value: 15800 },
  { month: 'Mar', value: 18200 },
  { month: 'Abr', value: 16900 },
  { month: 'Mai', value: 21300 },
  { month: 'Jun', value: 19800 },
];

const orderStatusData = [
  { name: 'Concluídas', value: 45, color: '#10B981' },
  { name: 'Em Andamento', value: 23, color: '#3B82F6' },
  { name: 'Pendentes', value: 12, color: '#F59E0B' },
  { name: 'Atrasadas', value: 8, color: '#EF4444' },
];

const recentOrders = [
  { id: '#001', client: 'João Silva', vehicle: 'Honda Civic - ABC-1234', status: 'Em Andamento', value: 'R$ 850,00' },
  { id: '#002', client: 'Maria Santos', vehicle: 'Toyota Corolla - XYZ-5678', status: 'Concluída', value: 'R$ 1.200,00' },
  { id: '#003', client: 'Pedro Costa', vehicle: 'Ford Focus - DEF-9012', status: 'Pendente', value: 'R$ 650,00' },
  { id: '#004', client: 'Ana Oliveira', vehicle: 'Chevrolet Onix - GHI-3456', status: 'Atrasada', value: 'R$ 920,00' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Concluída': return 'bg-green-100 text-green-800';
    case 'Em Andamento': return 'bg-blue-100 text-blue-800';
    case 'Pendente': return 'bg-yellow-100 text-yellow-800';
    case 'Atrasada': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral da sua oficina mecânica</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="OS em Andamento"
          value={23}
          icon={FileText}
          trend={{ value: "12%", isPositive: true }}
          iconColor="text-blue-600"
        />
        <StatCard
          title="OS Concluídas Hoje"
          value={8}
          icon={CheckCircle}
          trend={{ value: "5%", isPositive: true }}
          iconColor="text-green-600"
        />
        <StatCard
          title="Faturamento Mensal"
          value="R$ 45.280"
          icon={DollarSign}
          trend={{ value: "18%", isPositive: true }}
          iconColor="text-emerald-600"
        />
        <StatCard
          title="OS Atrasadas"
          value={3}
          icon={AlertTriangle}
          trend={{ value: "2", isPositive: false }}
          iconColor="text-red-600"
        />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Veículos na Oficina"
          value={15}
          icon={Car}
          iconColor="text-purple-600"
        />
        <StatCard
          title="Estoque Crítico"
          value={7}
          icon={Package}
          iconColor="text-orange-600"
        />
        <StatCard
          title="Manutenções Programadas"
          value={12}
          icon={Calendar}
          iconColor="text-indigo-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Faturamento dos Últimos 6 Meses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip 
                  formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Faturamento']}
                  labelClassName="text-gray-600"
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600" />
              Status das Ordens de Serviço
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Ordens de Serviço Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">OS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Veículo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Valor</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.client}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.vehicle}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
              Ver todas as OS →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
