
import Layout from "../../components/layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Download, Search, Upload, FileText, File, FileCheck, FilePlus } from "lucide-react";
import { toast } from "sonner";

// Mock documents data
const personalDocuments = [
  {
    id: "1",
    name: "ID Proof",
    type: "Identity",
    uploadDate: "Jan 15, 2025",
    status: "Verified",
    size: "2.1 MB",
  },
  {
    id: "2",
    name: "Address Proof",
    type: "Address",
    uploadDate: "Jan 15, 2025",
    status: "Verified",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Educational Certificate",
    type: "Education",
    uploadDate: "Jan 16, 2025",
    status: "Pending",
    size: "3.5 MB",
  }
];

const companyDocuments = [
  {
    id: "1",
    name: "Employment Contract",
    type: "Contract",
    issueDate: "Dec 20, 2024",
    category: "HR",
    size: "1.2 MB",
  },
  {
    id: "2",
    name: "Code of Conduct",
    type: "Policy",
    issueDate: "Dec 20, 2024",
    category: "HR",
    size: "0.8 MB",
  },
  {
    id: "3",
    name: "Employee Handbook",
    type: "Handbook",
    issueDate: "Dec 20, 2024",
    category: "HR",
    size: "4.5 MB",
  },
  {
    id: "4",
    name: "Health Insurance Policy",
    type: "Insurance",
    issueDate: "Jan 05, 2025",
    category: "Benefits",
    size: "2.3 MB",
  }
];

const DocumentsPage = () => {
  const handleDownload = (id: string, name: string) => {
    toast.success("Document Downloaded", {
      description: `${name} has been downloaded.`
    });
  };
  
  const handleUpload = () => {
    toast.success("Upload Initiated", {
      description: "Please select a file to upload."
    });
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">My Documents</h1>
          <Button onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList>
            <TabsTrigger value="personal">My Documents</TabsTrigger>
            <TabsTrigger value="company">Company Documents</TabsTrigger>
            <TabsTrigger value="requested">Requested Documents</TabsTrigger>
          </TabsList>
          
          {/* Personal Documents Tab */}
          <TabsContent value="personal" className="space-y-4 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-primary/10 rounded-lg p-4 flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                  <p className="font-semibold text-lg">{personalDocuments.length}</p>
                </div>
              </div>
              
              <div className="bg-green-100 rounded-lg p-4 flex items-center gap-3">
                <div className="bg-green-200 p-2 rounded-full">
                  <FileCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <p className="font-semibold text-lg">
                    {personalDocuments.filter(doc => doc.status === 'Verified').length}
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-100 rounded-lg p-4 flex items-center gap-3">
                <div className="bg-yellow-200 p-2 rounded-full">
                  <FilePlus className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="font-semibold text-lg">
                    {personalDocuments.filter(doc => doc.status === 'Pending').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personalDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4 text-muted-foreground" />
                          <span>{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={doc.status === "Verified" ? "outline" : "secondary"}
                          className={doc.status === "Verified" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                        >
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDownload(doc.id, doc.name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Company Documents Tab */}
          <TabsContent value="company" className="space-y-4 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search company documents..." className="pl-10" />
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companyDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4 text-muted-foreground" />
                          <span>{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.issueDate}</TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDownload(doc.id, doc.name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Requested Documents Tab */}
          <TabsContent value="requested" className="space-y-4 pt-4">
            <div className="flex items-center justify-center p-8 border rounded-md bg-gray-50">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-1">No Document Requests</h3>
                <p className="text-muted-foreground">There are no document requests at this time.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
