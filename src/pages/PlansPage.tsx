
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Check, Edit, Plus, Trash } from "lucide-react";
import { Plan, tenantService } from "@/services/tenant.service";

// Mock plans data
const initialPlans: Plan[] = [
  {
    id: "1",
    name: "Starter",
    description: "Perfect for small businesses just getting started with HR management.",
    price: 9.99,
    billingCycle: "monthly",
    features: [
      "Up to 10 employees",
      "Basic attendance tracking",
      "Leave management",
      "Employee profiles",
      "Basic reports"
    ],
    limits: {
      employees: 10,
      departments: 3,
      storage: 1
    },
    isActive: true
  },
  {
    id: "2",
    name: "Professional",
    description: "Ideal for growing businesses with advanced HR needs.",
    price: 19.99,
    billingCycle: "monthly",
    features: [
      "Up to 50 employees",
      "Advanced attendance with geo-fencing",
      "Complete leave management",
      "Performance reviews",
      "Advanced reporting",
      "Document management",
      "Mobile app access"
    ],
    limits: {
      employees: 50,
      departments: 10,
      storage: 5
    },
    isActive: true
  },
  {
    id: "3",
    name: "Enterprise",
    description: "Full-featured solution for large organizations with complex requirements.",
    price: 39.99,
    billingCycle: "monthly",
    features: [
      "Unlimited employees",
      "Complete HR automation",
      "Custom workflows",
      "Advanced analytics",
      "API access",
      "Dedicated support",
      "White labeling",
      "Custom integrations"
    ],
    limits: {
      employees: 1000,
      departments: 50,
      storage: 20
    },
    isActive: true
  }
];

const PlansPage = () => {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [newFeature, setNewFeature] = useState("");

  const handleCreateOrUpdatePlan = () => {
    if (!currentPlan) return;

    // Validate plan data
    if (!currentPlan.name || currentPlan.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isCreatingPlan) {
      // Create new plan
      const newPlan = {
        ...currentPlan,
        id: `plan-${Date.now()}`
      };
      setPlans([...plans, newPlan]);
      toast.success("Plan created successfully");
    } else {
      // Update existing plan
      const updatedPlans = plans.map(p => 
        p.id === currentPlan.id ? currentPlan : p
      );
      setPlans(updatedPlans);
      toast.success("Plan updated successfully");
    }

    setIsEditDialogOpen(false);
  };

  const handleAddFeature = () => {
    if (!newFeature.trim() || !currentPlan) return;
    
    setCurrentPlan({
      ...currentPlan,
      features: [...currentPlan.features, newFeature.trim()]
    });
    setNewFeature("");
  };

  const handleRemoveFeature = (index: number) => {
    if (!currentPlan) return;
    
    const updatedFeatures = [...currentPlan.features];
    updatedFeatures.splice(index, 1);
    
    setCurrentPlan({
      ...currentPlan,
      features: updatedFeatures
    });
  };

  const createNewPlan = () => {
    setIsCreatingPlan(true);
    setCurrentPlan({
      id: "",
      name: "",
      description: "",
      price: 0,
      billingCycle: "monthly",
      features: [],
      limits: {
        employees: 0,
        departments: 0,
        storage: 0
      },
      isActive: true
    });
    setIsEditDialogOpen(true);
  };

  const editPlan = (plan: Plan) => {
    setIsCreatingPlan(false);
    setCurrentPlan({...plan});
    setIsEditDialogOpen(true);
  };

  const deletePlan = (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter(p => p.id !== id));
      toast.success("Plan deleted successfully");
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Subscription Plans</h1>
          <Button onClick={createNewPlan}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => editPlan(plan)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deletePlan(plan.id)}>
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.billingCycle}</span>
                </div>
                
                <div className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t mt-4 pt-4">
                  <h4 className="font-medium mb-2">Limits:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Employees:</span>
                      <span>{plan.limits.employees === 1000 ? "Unlimited" : plan.limits.employees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Departments:</span>
                      <span>{plan.limits.departments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage:</span>
                      <span>{plan.limits.storage}GB</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isCreatingPlan ? "Create New Plan" : "Edit Plan"}</DialogTitle>
              <DialogDescription>
                {isCreatingPlan
                  ? "Add a new subscription plan to your platform."
                  : "Make changes to the existing subscription plan."}
              </DialogDescription>
            </DialogHeader>
            
            {currentPlan && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Plan Name</Label>
                  <Input
                    id="name"
                    value={currentPlan.name}
                    onChange={(e) => setCurrentPlan({...currentPlan, name: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={currentPlan.description}
                    onChange={(e) => setCurrentPlan({...currentPlan, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={currentPlan.price}
                      onChange={(e) => setCurrentPlan({...currentPlan, price: parseFloat(e.target.value)})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="cycle">Billing Cycle</Label>
                    <Select 
                      value={currentPlan.billingCycle} 
                      onValueChange={(value: "monthly" | "quarterly" | "yearly") => 
                        setCurrentPlan({...currentPlan, billingCycle: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Features</Label>
                  <div className="space-y-2">
                    {currentPlan.features.map((feature, i) => (
                      <div key={i} className="flex items-center justify-between gap-2">
                        <span className="flex-grow">{feature}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleRemoveFeature(i)}
                        >
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        placeholder="Add new feature"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                      />
                      <Button type="button" onClick={handleAddFeature} size="sm">
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Limits</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="employees">Employees</Label>
                      <Input
                        id="employees"
                        type="number"
                        min="0"
                        value={currentPlan.limits.employees}
                        onChange={(e) => setCurrentPlan({
                          ...currentPlan, 
                          limits: {
                            ...currentPlan.limits,
                            employees: parseInt(e.target.value)
                          }
                        })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="departments">Departments</Label>
                      <Input
                        id="departments"
                        type="number"
                        min="0"
                        value={currentPlan.limits.departments}
                        onChange={(e) => setCurrentPlan({
                          ...currentPlan, 
                          limits: {
                            ...currentPlan.limits,
                            departments: parseInt(e.target.value)
                          }
                        })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="storage">Storage (GB)</Label>
                      <Input
                        id="storage"
                        type="number"
                        min="0"
                        value={currentPlan.limits.storage}
                        onChange={(e) => setCurrentPlan({
                          ...currentPlan, 
                          limits: {
                            ...currentPlan.limits,
                            storage: parseInt(e.target.value)
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateOrUpdatePlan}>
                {isCreatingPlan ? "Create Plan" : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default PlansPage;
