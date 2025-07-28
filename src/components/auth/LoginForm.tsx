import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Shield, Eye, EyeOff } from "lucide-react";
import transportLogo from "@/assets/transport-logo.png";

interface LoginFormProps {
  onLogin: (email: string, password: string, role: 'admin' | 'sub-admin') => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'admin' | 'sub-admin'>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(email, password, role);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center shadow-primary">
              <img src={transportLogo} alt="Transport Logo" className="w-10 h-10" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Transport Management
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Shivpuri Transport Business Portal
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Login As</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={role === 'admin' ? 'default' : 'outline'}
                  onClick={() => setRole('admin')}
                  className="h-11"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Button>
                <Button
                  type="button"
                  variant={role === 'sub-admin' ? 'default' : 'outline'}
                  onClick={() => setRole('sub-admin')}
                  className="h-11"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Sub-Admin
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-gradient-primary shadow-primary"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo Credentials:</p>
            <p>Admin: admin@transport.com / admin123</p>
            <p>Sub-Admin: subadmin@transport.com / sub123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};