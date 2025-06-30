
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  iconColor?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className, iconColor = "text-blue-600" }: StatCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-sm font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs. período anterior</span>
            </div>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center bg-gray-50",
          iconColor
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
