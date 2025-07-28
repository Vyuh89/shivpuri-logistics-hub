import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Fuel,
  FileText,
  MapPin,
  Calendar
} from "lucide-react";

export const SubAdminDashboard = () => {
  const todayStats = [
    {
      title: "Today's Loads",
      value: "8",
      subtitle: "3 pending assignment",
      icon: Package,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Available Trucks",
      value: "6",
      subtitle: "9 in transit",
      icon: Truck,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Active Drivers",
      value: "18",
      subtitle: "4 on break",
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Fuel Entries",
      value: "12",
      subtitle: "Today's entries",
      icon: Fuel,
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  const pendingTasks = [
    {
      id: 1,
      task: "Assign truck to Load #L004",
      priority: "high",
      vendor: "Bajaj Auto",
      dueTime: "2 hours"
    },
    {
      id: 2,
      task: "Update fuel entry for TN01AB1234",
      priority: "medium",
      vendor: "Shell Petrol Pump",
      dueTime: "4 hours"
    },
    {
      id: 3,
      task: "Upload Billty for Load #L002",
      priority: "high",
      vendor: "Tata Steel",
      dueTime: "1 hour"
    },
    {
      id: 4,
      task: "Process driver expense - Rajesh Kumar",
      priority: "low",
      vendor: "Driver Advance",
      dueTime: "End of day"
    }
  ];

  const recentActivities = [
    {
      action: "Load #L003 marked as delivered",
      user: "You",
      time: "30 minutes ago",
      type: "success"
    },
    {
      action: "Fuel entry added for TN01AB5678",
      user: "You", 
      time: "1 hour ago",
      type: "info"
    },
    {
      action: "Driver expense approved - Amit Singh",
      user: "You",
      time: "2 hours ago",
      type: "success"
    },
    {
      action: "New load assigned from Mahindra",
      user: "System",
      time: "3 hours ago",
      type: "info"
    }
  ];

  const trucksStatus = [
    { truck: "TN01AB1234", driver: "Rajesh Kumar", status: "in-transit", route: "Shivpuri → Mumbai", eta: "6 hours" },
    { truck: "TN01AB5678", driver: "Suresh Yadav", status: "loading", route: "Shivpuri → Delhi", eta: "1 hour" },
    { truck: "TN01AB9012", driver: "Amit Singh", status: "available", route: "-", eta: "-" },
    { truck: "TN01AB3456", driver: "Mohan Lal", status: "maintenance", route: "-", eta: "2 days" }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">High</Badge>;
      case "medium":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Medium</Badge>;
      default:
        return <Badge className="bg-muted/50 text-muted-foreground border-muted">Low</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-transit":
        return <Badge className="bg-primary/20 text-primary border-primary/30">In Transit</Badge>;
      case "loading":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Loading</Badge>;
      case "available":
        return <Badge className="bg-success/20 text-success border-success/30">Available</Badge>;
      case "maintenance":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Operations Dashboard</h1>
        <p className="text-muted-foreground">
          Manage daily operations and track load assignments
        </p>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {todayStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.subtitle}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Pending Tasks
            </CardTitle>
            <CardDescription>
              Tasks requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">{task.task}</span>
                      {getPriorityBadge(task.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {task.vendor}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due in {task.dueTime}
                    </p>
                  </div>
                  <Button size="sm">
                    Action
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Tasks
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Your recent actions and system updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Truck Status Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            Truck Status Overview
          </CardTitle>
          <CardDescription>
            Current status of trucks in your fleet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trucksStatus.map((truck) => (
              <div key={truck.truck} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold">{truck.truck}</span>
                      {getStatusBadge(truck.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Driver: {truck.driver}
                    </p>
                    {truck.route !== "-" && (
                      <p className="text-sm text-muted-foreground">
                        Route: {truck.route}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {truck.eta !== "-" ? `ETA: ${truck.eta}` : truck.eta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used operational functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button className="h-20 flex-col space-y-2">
              <Package className="h-6 w-6" />
              <span className="text-xs">New Load</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Fuel className="h-6 w-6" />
              <span className="text-xs">Fuel Entry</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span className="text-xs">Upload Billty</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <MapPin className="h-6 w-6" />
              <span className="text-xs">Track Load</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span className="text-xs">Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-xs">Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};