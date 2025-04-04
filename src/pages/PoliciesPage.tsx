
import React from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import { FileText, Upload, Download, Search, Plus } from "lucide-react";

const PoliciesPage = () => {
  const { currentUser } = useUser();
  const isAdmin = currentUser?.role === 'org-admin' || currentUser?.role === 'hr';
  
  // Mock policies
  const policies = [
    {
      id: "1",
      title: "Employee Handbook",
      description: "Complete guide to company policies, procedures, and expectations",
      category: "General",
      updatedAt: "2023-03-15",
      fileSize: "2.4 MB"
    },
    {
      id: "2",
      title: "Code of Conduct",
      description: "Guidelines for professional behavior and ethical standards",
      category: "Compliance",
      updatedAt: "2023-02-10",
      fileSize: "1.1 MB"
    },
    {
      id: "3",
      title: "Remote Work Policy",
      description: "Rules and expectations for working remotely",
      category: "Work Arrangements",
      updatedAt: "2023-04-01",
      fileSize: "890 KB"
    },
    {
      id: "4",
      title: "Data Privacy Guidelines",
      description: "Procedures for handling sensitive customer and employee data",
      category: "Compliance",
      updatedAt: "2023-01-20",
      fileSize: "1.5 MB"
    },
    {
      id: "5",
      title: "Travel & Expense Policy",
      description: "Guidelines for business travel and expense reimbursement",
      category: "Finance",
      updatedAt: "2023-03-05",
      fileSize: "1.2 MB"
    }
  ];

  const handleDownloadPolicy = (id: string) => {
    toast.success("Policy document downloaded");
  };

  const handleUploadPolicy = () => {
    toast.info("Upload policy dialog would appear here");
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Policies & Procedures</h1>
          {isAdmin && (
            <Button onClick={handleUploadPolicy}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Policy
            </Button>
          )}
        </div>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search policies..." className="pl-10" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {policies.map((policy) => (
            <Card key={policy.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  {policy.title}
                </CardTitle>
                <CardDescription>{policy.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{policy.category}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>{new Date(policy.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">File Size:</span>
                    <span>{policy.fileSize}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleDownloadPolicy(policy.id)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {isAdmin && (
            <Card className="flex items-center justify-center min-h-[230px] border-dashed cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={handleUploadPolicy}>
              <CardContent className="flex flex-col items-center p-6">
                <Plus className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground font-medium">Add New Policy</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PoliciesPage;
