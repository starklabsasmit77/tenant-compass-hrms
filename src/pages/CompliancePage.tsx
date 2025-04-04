
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Progress
} from "@/components/ui/progress";
import { 
  AlertCircle,
  Download,
  FileCheck,
  Shield,
  Eye,
  Server,
  Lock,
  UserCheck,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

// Mock compliance data
const complianceStatuses = [
  { 
    name: "GDPR", 
    status: "compliant", 
    lastChecked: "2023-04-02T10:30:00Z",
    progress: 100,
    items: [
      { name: "Data Processing Agreements", status: "compliant", date: "2023-03-15" },
      { name: "Data Subject Access Rights", status: "compliant", date: "2023-03-16" },
      { name: "Data Breach Notification", status: "compliant", date: "2023-03-10" },
      { name: "Privacy Policy", status: "compliant", date: "2023-03-05" }
    ]
  },
  { 
    name: "SOC 2", 
    status: "in-progress", 
    lastChecked: "2023-04-01T14:45:00Z",
    progress: 75,
    items: [
      { name: "Security Controls", status: "compliant", date: "2023-02-20" },
      { name: "Availability Monitoring", status: "compliant", date: "2023-02-25" },
      { name: "Change Management", status: "in-progress", date: "2023-03-01" },
      { name: "Vendor Management", status: "pending", date: "2023-03-30" }
    ]
  },
  { 
    name: "HIPAA", 
    status: "pending", 
    lastChecked: "2023-03-28T09:15:00Z",
    progress: 35,
    items: [
      { name: "Privacy Rule Compliance", status: "in-progress", date: "2023-03-10" },
      { name: "Security Rule Implementation", status: "in-progress", date: "2023-03-12" },
      { name: "Breach Notification", status: "pending", date: "2023-03-20" },
      { name: "Business Associate Agreements", status: "pending", date: "2023-03-25" }
    ]
  },
  { 
    name: "ISO 27001", 
    status: "non-compliant", 
    lastChecked: "2023-03-15T11:20:00Z",
    progress: 10,
    items: [
      { name: "Information Security Policy", status: "in-progress", date: "2023-03-05" },
      { name: "Risk Assessment", status: "non-compliant", date: "2023-03-07" },
      { name: "Asset Management", status: "pending", date: "2023-03-12" },
      { name: "Access Controls", status: "pending", date: "2023-03-15" }
    ]
  }
];

// Mock audit logs
const auditLogs = [
  { 
    id: "log1", 
    action: "User login", 
    user: "admin@techcorp.com", 
    ipAddress: "192.168.1.1", 
    timestamp: "2023-04-04T09:32:45Z",
    details: "Successful login from Chrome/Windows"
  },
  { 
    id: "log2", 
    action: "Profile update", 
    user: "sarah@techcorp.com", 
    ipAddress: "192.168.1.25", 
    timestamp: "2023-04-04T10:15:22Z",
    details: "Changed contact information"
  },
  { 
    id: "log3", 
    action: "File download", 
    user: "john@techcorp.com", 
    ipAddress: "192.168.1.45", 
    timestamp: "2023-04-04T11:07:13Z",
    details: "Downloaded payroll_march_2023.csv"
  },
  { 
    id: "log4", 
    action: "Failed login attempt", 
    user: "unknown", 
    ipAddress: "203.0.113.5", 
    timestamp: "2023-04-04T11:30:56Z",
    details: "Multiple failed attempts for admin@techcorp.com"
  },
  { 
    id: "log5", 
    action: "Employee record accessed", 
    user: "hr@techcorp.com", 
    ipAddress: "192.168.1.30", 
    timestamp: "2023-04-04T13:45:02Z",
    details: "Viewed sensitive employee information"
  }
];

// Mock data for tenant compliance
const tenantSpecificCompliance = [
  { 
    name: "HR Policy Acknowledgment", 
    status: "compliant", 
    lastUpdated: "2023-03-15T10:30:00Z",
    employeeCompletion: 95
  },
  { 
    name: "Security Training", 
    status: "compliant", 
    lastUpdated: "2023-02-28T14:45:00Z",
    employeeCompletion: 87
  },
  { 
    name: "Data Handling Procedures", 
    status: "in-progress", 
    lastUpdated: "2023-03-10T09:15:00Z",
    employeeCompletion: 65
  },
  { 
    name: "GDPR Training", 
    status: "non-compliant", 
    lastUpdated: "2023-01-15T11:20:00Z",
    employeeCompletion: 42
  }
];

const CompliancePage = () => {
  const { currentUser } = useUser();
  const isSuperAdmin = currentUser?.role === 'super-admin';
  
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleDownloadReport = (name: string) => {
    toast.success(`${name} compliance report downloaded`);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "compliant":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Compliant</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "non-compliant":
        return <Badge variant="destructive">Non-Compliant</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "compliant":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "pending":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "non-compliant":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Compliance Management</h1>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Full Report
          </Button>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            {isSuperAdmin && <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>}
            {!isSuperAdmin && <TabsTrigger value="employee-compliance">Employee Compliance</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <Shield className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="text-lg font-medium">Compliance Score</div>
                    <div className="text-3xl font-bold mt-1">78%</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <FileCheck className="h-8 w-8 text-blue-500" />
                  <div>
                    <div className="text-lg font-medium">Policies Up-to-date</div>
                    <div className="text-3xl font-bold mt-1">92%</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  {isSuperAdmin ? (
                    <>
                      <Server className="h-8 w-8 text-purple-500" />
                      <div>
                        <div className="text-lg font-medium">Tenant Compliance</div>
                        <div className="text-3xl font-bold mt-1">81%</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-8 w-8 text-purple-500" />
                      <div>
                        <div className="text-lg font-medium">Employee Completion</div>
                        <div className="text-3xl font-bold mt-1">85%</div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <Lock className="h-8 w-8 text-amber-500" />
                  <div>
                    <div className="text-lg font-medium">Security Score</div>
                    <div className="text-3xl font-bold mt-1">A+</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>
                  Current compliance status across key regulatory frameworks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {complianceStatuses.map((item) => (
                    <div key={item.name} className="mb-6 last:mb-0">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(item.status)}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadReport(item.name)}
                            className="ml-2 hidden sm:flex"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Report
                          </Button>
                        </div>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        Last checked: {new Date(item.lastChecked).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certifications">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Certifications</CardTitle>
                <CardDescription>
                  Detailed breakdown of compliance requirements and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="gdpr">
                  <TabsList>
                    {complianceStatuses.map((cert) => (
                      <TabsTrigger key={cert.name.toLowerCase()} value={cert.name.toLowerCase()}>
                        {cert.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {complianceStatuses.map((cert) => (
                    <TabsContent key={cert.name.toLowerCase()} value={cert.name.toLowerCase()}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(cert.status)}
                          <span className="font-medium">Overall Status: </span>
                          {getStatusBadge(cert.status)}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport(cert.name)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                      </div>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Requirement</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cert.items.map((item) => (
                            <TableRow key={item.name}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>{getStatusBadge(item.status)}</TableCell>
                              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="audit-logs">
            <Card>
              <CardHeader>
                <CardTitle>Security Audit Logs</CardTitle>
                <CardDescription>
                  System-wide audit trail of important security and compliance events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                        <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{log.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="employee-compliance">
            <Card>
              <CardHeader>
                <CardTitle>Employee Compliance Training</CardTitle>
                <CardDescription>
                  Track employee completion of required compliance training and policy acknowledgments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Requirement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tenantSpecificCompliance.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={item.employeeCompletion} className="h-2 w-24" />
                            <span>{item.employeeCompletion}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CompliancePage;
