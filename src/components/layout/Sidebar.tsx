
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Car, 
  Users, 
  Package, 
  DollarSign, 
  BarChart3,
  Settings,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Ordens de Serviço", href: "/orders", icon: FileText },
  { name: "Veículos", href: "/vehicles", icon: Car },
  { name: "Clientes", href: "/clients", icon: Users },
  { name: "Serviços & Produtos", href: "/services", icon: Package },
  { name: "Estoque", href: "/inventory", icon: Package },
  { name: "Financeiro", href: "/financial", icon: DollarSign },
  { name: "Relatórios", href: "/reports", icon: BarChart3 },
];

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-gray-600" />
          ) : (
            <Menu className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AutoManager</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    isActive(item.href) ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                  )} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
                <p className="text-xs text-gray-500 truncate">admin@oficina.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
