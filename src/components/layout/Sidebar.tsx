import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Truck,
  Package,
  Users,
  DollarSign,
  MapPin,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  TrendingUp,
  Fuel,
  Receipt,
  Building,
  UserCheck,
  BarChart3,
  Shield,
  Calendar
} from "lucide-react";
import transportLogo from "@/assets/transport-logo.png";

interface SidebarProps {
  userRole: 'admin' | 'sub-admin';
  activeItem: string;
  onItemClick: (item: string) => void;
  onLogout: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar = ({ 
  userRole, 
  activeItem, 
  onItemClick, 
  onLogout,
  collapsed = false,
  onToggleCollapse 
}: SidebarProps) => {
  
  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'trucks', label: 'Truck Management', icon: Truck },
    { id: 'vendors', label: 'Vendor Management', icon: Building },
    { id: 'drivers', label: 'Driver Management', icon: UserCheck },
    { id: 'loads', label: 'Load Management', icon: Package },
    { id: 'finances', label: 'Financial Reports', icon: DollarSign },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'locations', label: 'Location Management', icon: MapPin },
    { id: 'rates', label: 'Rate Management', icon: TrendingUp },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const subAdminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'loads', label: 'Load Management', icon: Package },
    { id: 'trucks', label: 'Truck & Fuel', icon: Truck },
    { id: 'drivers', label: 'Driver Management', icon: UserCheck },
    { id: 'vendors', label: 'Vendor Management', icon: Building },
    { id: 'fuel', label: 'Fuel Management', icon: Fuel },
    { id: 'billty', label: 'Billty Management', icon: FileText },
    { id: 'expenses', label: 'Expense Tracking', icon: Receipt },
    { id: 'reports', label: 'Basic Reports', icon: BarChart3 },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : subAdminMenuItems;

  return (
    <div className={cn(
      "bg-card border-r border-border h-screen flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-72"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-primary">
                <img src={transportLogo} alt="Logo" className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">Transport</h1>
                <p className="text-xs text-muted-foreground">Management System</p>
              </div>
            </div>
          )}
          
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180"
              )} />
            </Button>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 py-3 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {userRole === 'admin' ? 'System Admin' : 'Operations Manager'}
              </p>
              <Badge variant={userRole === 'admin' ? 'default' : 'secondary'} className="text-xs">
                {userRole === 'admin' ? 'Administrator' : 'Sub-Admin'}
              </Badge>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-11 text-left",
                collapsed ? "px-2" : "px-3",
                isActive && "bg-gradient-primary shadow-primary"
              )}
              onClick={() => onItemClick(item.id)}
            >
              <Icon className={cn("h-5 w-5 shrink-0", !collapsed && "mr-3")} />
              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-11 text-destructive hover:text-destructive hover:bg-destructive/10",
            collapsed ? "px-2" : "px-3"
          )}
          onClick={onLogout}
        >
          <LogOut className={cn("h-5 w-5 shrink-0", !collapsed && "mr-3")} />
          {!collapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  );
};