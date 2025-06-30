
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { 
  BarChart3, 
  Download, 
  Printer, 
  Calendar,
  Users,
  Car,
  Wrench,
  Package
} from "lucide-react";

// Mock data
const servicesData = [
  { name: "Troca de Óleo", count: 45, revenue: 6750 },
  { name: "Alinhamento", count: 30, revenue: 3600 },
  { name: "Balanceamento", count: 25, revenue: 2500 },
  { name: "Freios", count: 20, revenue: 4000 },
  { name: "Suspensão", count: 15, revenue: 4500 }
];

const clientsData = [
  { name: "João Silva", orders: 12, spent: 2400 },
  { name: "Maria Santos", orders: 8, spent: 1600 },
  { name: "Pedro Lima", orders: 6, spent: 1200 },
  { name: "Ana Costa", orders: 5, spent: 1000 },
  { name: "Carlos Oliveira", orders: 4, spent: 800 }
];

const revenueData = [
  { month: "Jan", revenue: 15000, expenses: 8000 },
  { month: "Fev", revenue: 18000, expenses: 9000 },
  { month: "Mar", revenue: 22000, expenses: 11000 },
  { month: "Abr", revenue: 20000, expenses: 10000 },
  { month: "Mai", revenue: 25000, expenses: 12000 },
  { month: "Jun", revenue: 28000, expenses: 14000 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const chartConfig = {
  revenue: {
    label: "Receita",
    color: "#3B82F6",
  },
  expenses: {
    label: "Despesas",
    color: "#EF4444",
  },
};

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState("services");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const reportTypes = [
    { id: "services", name: "Serviços Mais Realizados", icon: Wrench },
    { id: "clients", name: "Clientes Mais Frequentes", icon: Users },
    { id: "revenue", name: "Faturamento por Período", icon: BarChart3 },
    { id: "parts", name: "Consumo de Peças", icon: Package }
  ];

  const renderChart = () => {
    switch (selectedReport) {
      case "services":
        return (
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={servicesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ChartContainer>
        );
      
      case "revenue":
        return (
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        );
      
      default:
        return (
          <ChartContainer config={chartConfig} className="h-[300px]">
            <PieChart>
              <Pie
                data={servicesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {servicesData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        );
    }
  };

  const renderTable = () => {
    switch (selectedReport) {
      case "services":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serviço</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Faturamento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicesData.map((service, index) => (
                <TableRow key={index}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.count}</TableCell>
                  <TableCell>R$ {service.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      
      case "clients":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Ordens de Serviço</TableHead>
                <TableHead>Valor Gasto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientsData.map((client, index) => (
                <TableRow key={index}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.orders}</TableCell>
                  <TableCell>R$ {client.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      
      case "revenue":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mês</TableHead>
                <TableHead>Receita</TableHead>
                <TableHead>Despesas</TableHead>
                <TableHead>Lucro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.month}</TableCell>
                  <TableCell className="text-green-600">
                    R$ {data.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-red-600">
                    R$ {data.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-blue-600 font-medium">
                    R$ {(data.revenue - data.expenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      
      default:
        return <div className="text-center py-8 text-gray-500">Selecione um relatório para visualizar os dados</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600 mt-2">Análises e relatórios gerenciais</p>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros e Configurações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Relatório
                </label>
                <select
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {reportTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Início
                </label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Fim
                </label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              
              <div className="flex items-end gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Gerar Relatório
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {reportTypes.find(t => t.id === selectedReport)?.name}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {renderChart()}
          </CardContent>
        </Card>

        {/* Tabela de Dados */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Detalhados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {renderTable()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
