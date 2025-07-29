import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { SubAdminDashboard } from "@/components/dashboard/SubAdminDashboard";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'sub-admin'>('admin');
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();

  const handleLogin = (email: string, password: string, role: 'admin' | 'sub-admin') => {
    // Demo authentication logic
    const validCredentials = {
      admin: { email: 'admin@transport.com', password: 'admin123' },
      'sub-admin': { email: 'subadmin@transport.com', password: 'sub123' }
    };

    if (email === validCredentials[role].email && password === validCredentials[role].password) {
      setIsAuthenticated(true);
      setUserRole(role);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${role === 'admin' ? 'Administrator' : 'Operations Manager'}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please check your email and password.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('admin');
    setActiveMenuItem('dashboard');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
    // For now, we'll just show different content based on menu selection
    // In a real app, this would involve routing
  };

  const getPageTitle = () => {
    switch (activeMenuItem) {
      case 'dashboard':
        return userRole === 'admin' ? 'Admin Dashboard' : 'Operations Dashboard';
      case 'trucks':
        return 'Truck Management';
      case 'vendors':
        return 'Vendor Management';
      case 'drivers':
        return 'Driver Management';
      case 'loads':
        return 'Load Management';
      case 'finances':
        return 'Financial Reports';
      case 'analytics':
        return 'Analytics & Reports';
      case 'users':
        return 'User Management';
      case 'fuel':
        return 'Fuel Management';
      case 'billty':
        return 'Billty Management';
      case 'expenses':
        return 'Expense Tracking';
      case 'reports':
        return 'Basic Reports';
      case 'settings':
        return 'System Settings';
      default:
        return 'Dashboard';
    }
  };

  const renderMainContent = () => {
    if (activeMenuItem === 'dashboard') {
      return userRole === 'admin' ? <AdminDashboard /> : <SubAdminDashboard />;
    }
    
    // For other menu items, show a placeholder for now
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {getPageTitle()}
          </h2>
          <p className="text-muted-foreground mb-6">
            This module is under development. The complete functionality will be implemented in the next phase.
          </p>
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              This section will include comprehensive features for {getPageTitle().toLowerCase()} 
              with forms, tables, reports, and real-time updates.
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen flex bg-background">
      <Sidebar
        userRole={userRole}
        activeItem={activeMenuItem}
        onItemClick={handleMenuItemClick}
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          userRole={userRole}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={getPageTitle()}
        />
        
        <main className="flex-1 overflow-y-auto bg-background">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}