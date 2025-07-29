import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Shield, Eye, EyeOff, Sun, Moon } from "lucide-react";
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
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(email, password, role);
      setIsLoading(false);
    }, 1000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Dynamic class names
  const cardClasses = `w-full max-w-md shadow-elevated transition-colors duration-300 ${
    darkMode ? 'bg-gray-800 border-gray-700' : ''
  }`;

  const titleClasses = `text-2xl font-bold ${
    darkMode ? 'text-white' : 'bg-gradient-primary bg-clip-text text-transparent'
  }`;

  const descriptionClasses = darkMode ? "text-gray-400" : "text-muted-foreground";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-primary/5 to-accent/5'
    }`}>
      {/* Dark/Light mode toggle */}
      <div className="absolute top-4 right-4">
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
      
      <Card className={cardClasses}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
              darkMode ? 'bg-gray-700 shadow-gray-600' : 'bg-gradient-to-br from-primary to-primary-hover shadow-primary'
            }`}>
              <img src={transportLogo} alt="Transport Logo" className="w-10 h-10" />
            </div>
          </div>
          <CardTitle className={titleClasses}>
            Transport Management
          </CardTitle>
          <CardDescription className={descriptionClasses}>
            Shivpuri Transport Business Portal
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className={darkMode ? "text-gray-300" : ""}>
                Email Address
              </Label>
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
            
            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className={darkMode ? "text-gray-300" : ""}>
                Password
              </Label>
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
                  className={`absolute right-0 top-0 h-11 px-3 hover:bg-transparent ${
                    darkMode ? 'text-gray-400' : ''
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            {/* Role Selection */}
            <div className="space-y-2">
              <Label className={darkMode ? "text-gray-300" : ""}>Login As</Label>
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
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              className={`w-full h-12 text-base font-semibold ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gradient-primary'
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          {/* Demo Credentials */}
          <div className={`mt-6 text-center text-sm ${
            darkMode ? 'text-gray-400' : 'text-muted-foreground'
          }`}>
            <p>Demo Credentials:</p>
            <p>Admin: admin@transport.com / admin123</p>
            <p>Sub-Admin: subadmin@transport.com / sub123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};