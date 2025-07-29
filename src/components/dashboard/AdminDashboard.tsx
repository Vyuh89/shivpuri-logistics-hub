import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Truck,
  DollarSign,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Fuel,
  BarChart3,
  PieChart,
  Sun,
  Moon
} from "lucide-react";

export const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const stats = [
    {
      title: "Total Revenue",
      value: "₹2,45,000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Active Trucks",
      value: "15/19",
      change: "4 in maintenance",
      trend: "stable",
      icon: Truck,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Total Loads",
      value: "127",
      change: "+8 this week",
      trend: "up",
      icon: Package,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Total Drivers",
      value: "22",
      change: "3 on leave",
      trend: "stable",
      icon: Users,
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  const recentLoads = [
    {
      id: "L001",
      vendor: "Mahindra Industries",
      route: "Shivpuri → Mumbai",
      truck: "TN01AB1234",
      driver: "Rajesh Kumar",
      status: "delivered",
      amount: "₹25,000"
    },
    {
      id: "L002",
      vendor: "Tata Steel",
      route: "Shivpuri → Delhi",
      truck: "TN01AB5678",
      driver: "Suresh Yadav",
      status: "in-transit",
      amount: "₹32,000"
    },
    {
      id: "L003",
      vendor: "Reliance Ltd",
      route: "Shivpuri → Pune",
      truck: "TN01AB9012",
      driver: "Amit Singh",
      status: "loaded",
      amount: "₹28,000"
    }
  ];

  const alerts = [
    {
      type: "critical",
      message: "Truck TN01AB3456 overdue for maintenance",
      time: "2 hours ago"
    },
    {
      type: "warning",
      message: "Driver license expiring in 15 days - Mohan Lal",
      time: "4 hours ago"
    },
    {
      type: "info",
      message: "New load assignment from Bajaj Auto",
      time: "6 hours ago"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-success/20 text-success border-success/30">Delivered</Badge>;
      case "in-transit":
        return <Badge className="bg-primary/20 text-primary border-primary/30">In Transit</Badge>;
      case "loaded":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Loaded</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <CheckCircle className="h-4 w-4 text-primary" />;
    }
  };

  // Dynamic classes based on dark mode
  const bgClass = darkMode ? "bg-gray-900" : "bg-background";
  const textClass = darkMode ? "text-gray-100" : "text-foreground";
  const mutedTextClass = darkMode ? "text-gray-400" : "text-muted-foreground";
  const cardClass = darkMode ? "bg-gray-800 border-gray-700" : "bg-card";
  const borderClass = darkMode ? "border-gray-700" : "border-border";

  return (
    <div className={`min-h-screen p-6 space-y-6 transition-colors duration-300 ${bgClass}`}>
      {/* Header with dark mode toggle */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className={`text-3xl font-bold ${textClass}`}>Admin Dashboard</h1>
          <p className={mutedTextClass}>
            Complete overview of your transport business operations
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="rounded-full w-10 h-10 p-0"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-300" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700" />
          )}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className={`shadow-card ${cardClass} ${borderClass}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${mutedTextClass}`}>
                      {stat.title}
                    </p>
                    <p className={`text-2xl font-bold ${textClass}`}>
                      {stat.value}
                    </p>
                    <p className={`text-sm flex items-center mt-1 ${
                      stat.trend === 'up' ? 'text-success' : 
                      stat.trend === 'down' ? 'text-destructive' : mutedTextClass
                    }`}>
                      {stat.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                      {stat.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Loads */}
        <Card className={`lg:col-span-2 shadow-card ${cardClass} ${borderClass}`}>
          <CardHeader>
            <CardTitle className={`flex items-center ${textClass}`}>
              <Package className="h-5 w-5 mr-2" />
              Recent Loads
            </CardTitle>
            <CardDescription className={mutedTextClass}>
              Latest load assignments and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLoads.map((load) => (
                <div key={load.id} className={`flex items-center justify-between p-4 border rounded-lg ${borderClass}`}>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`font-semibold ${textClass}`}>{load.id}</span>
                      {getStatusBadge(load.status)}
                    </div>
                    <p className={`text-sm ${mutedTextClass} mb-1`}>
                      {load.vendor} • {load.route}
                    </p>
                    <p className={`text-sm ${mutedTextClass}`}>
                      {load.truck} • {load.driver}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${darkMode ? 'text-primary-300' : 'text-primary'}`}>{load.amount}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Loads
            </Button>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card className={`shadow-card ${cardClass} ${borderClass}`}>
          <CardHeader>
            <CardTitle className={`flex items-center ${textClass}`}>
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alerts & Notifications
            </CardTitle>
            <CardDescription className={mutedTextClass}>
              Important updates requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className={`flex items-start space-x-3 p-3 border rounded-lg ${borderClass}`}>
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className={`text-sm ${textClass}`}>{alert.message}</p>
                    <p className={`text-xs ${mutedTextClass} mt-1`}>{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className={`shadow-card ${cardClass} ${borderClass}`}>
        <CardHeader>
          <CardTitle className={textClass}>Quick Actions</CardTitle>
          <CardDescription className={mutedTextClass}>
            Frequently used administrative functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button className="h-20 flex-col space-y-2">
              <Truck className="h-6 w-6" />
              <span className="text-xs">Add Truck</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-xs">Add Driver</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Package className="h-6 w-6" />
              <span className="text-xs">New Load</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <DollarSign className="h-6 w-6" />
              <span className="text-xs">Add Payment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span className="text-xs">Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Fuel className="h-6 w-6" />
              <span className="text-xs">Fuel Entry</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};