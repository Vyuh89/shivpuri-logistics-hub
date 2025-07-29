import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Menu,
  Truck,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

interface HeaderProps {
  userRole: 'admin' | 'sub-admin';
  onLogout: () => void;
  onToggleSidebar: () => void;
  title?: string;
}

export const Header = ({ userRole, onLogout, onToggleSidebar, title }: HeaderProps) => {
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Truck TN01AB1234 Maintenance Due',
      time: '2 hours ago',
      icon: AlertTriangle,
      color: 'text-warning'
    },
    {
      id: 2,
      type: 'success',
      title: 'Load #L001 Delivered Successfully',
      time: '4 hours ago',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Load Assignment Available',
      time: '6 hours ago',
      icon: Clock,
      color: 'text-primary'
    }
  ];

  return (
    <header className="bg-card border-b border-border h-[--header-height] flex items-center justify-between px-6 shadow-card">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {title && (
          <div>
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">
              {userRole === 'admin' ? 'Administrator Panel' : 'Operations Dashboard'}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trucks, loads, drivers..."
            className="pl-10 w-80"
          />
        </div>

        {/* Quick Stats */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-success/10">
            <Truck className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">15 Active</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium text-warning">2 Issues</span>
          </div>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary">3 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <DropdownMenuItem key={notification.id} className="flex items-start space-x-3 p-3">
                  <Icon className={`h-4 w-4 mt-0.5 ${notification.color}`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium">
                {userRole === 'admin' ? 'Admin' : 'Sub-Admin'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">
                  {userRole === 'admin' ? 'System Administrator' : 'Operations Manager'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {userRole}@transport.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};