
import Layout from "../components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OrganizationPage = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Organization Management</h1>
        
        <Tabs defaultValue="structure">
          <TabsList>
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="structure" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Organization Structure</CardTitle>
                <CardDescription>Manage organization hierarchy</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                Organization structure will be displayed here
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="departments" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Departments</CardTitle>
                <CardDescription>Manage departments and teams</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                Department management will be displayed here
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="roles" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Roles & Positions</CardTitle>
                <CardDescription>Manage job roles and positions</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                Role management will be displayed here
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="locations" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Locations</CardTitle>
                <CardDescription>Manage office locations</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                Location management will be displayed here
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default OrganizationPage;
