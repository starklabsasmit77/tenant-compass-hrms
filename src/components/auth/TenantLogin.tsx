
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface Tenant {
  id: string;
  name: string;
  domain: string;
  logo?: string;
}

// Mock tenant data - in a real app, this would come from an API
const mockTenants: Tenant[] = [
  { id: "1", name: "TechCorp Inc.", domain: "techcorp.tenanthr.com", logo: "" },
  { id: "2", name: "Acme Enterprises", domain: "acme.tenanthr.com", logo: "" },
  { id: "3", name: "Global Services Ltd.", domain: "globalservices.tenanthr.com", logo: "" },
];

const TenantLogin = () => {
  const [tenantDomain, setTenantDomain] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTenantSelect = () => {
    // Find the tenant based on domain input
    const tenant = mockTenants.find(t => 
      t.domain.toLowerCase() === tenantDomain.toLowerCase() || 
      t.name.toLowerCase() === tenantDomain.toLowerCase()
    );

    if (tenant) {
      setSelectedTenant(tenant);
      setShowLogin(true);
    } else {
      toast({
        title: "Tenant Not Found",
        description: "Please enter a valid tenant domain or name.",
        variant: "destructive"
      });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }

    // Mock successful login - in a real app, this would authenticate with a backend
    toast({
      title: "Login Successful",
      description: `Welcome to ${selectedTenant?.name}!`
    });
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xl font-bold text-white">TH</span>
          </div>
          <CardTitle className="text-2xl">TenantHR</CardTitle>
          <CardDescription>
            {showLogin 
              ? `Sign in to ${selectedTenant?.name}`
              : "Enter your company domain to continue"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showLogin ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domain">Company Domain</Label>
                <Input 
                  id="domain" 
                  placeholder="yourcompany.tenanthr.com" 
                  value={tenantDomain} 
                  onChange={(e) => setTenantDomain(e.target.value)} 
                />
              </div>
              <Button className="w-full" onClick={handleTenantSelect}>
                Continue
              </Button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 border-t pt-4">
          <div className="text-xs text-center text-muted-foreground">
            By continuing, you agree to TenantHR's Terms of Service and Privacy Policy.
          </div>
          {showLogin && (
            <Button 
              variant="link" 
              onClick={() => {
                setShowLogin(false);
                setSelectedTenant(null);
                setEmail("");
                setPassword("");
              }}
            >
              Use a different tenant
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TenantLogin;
