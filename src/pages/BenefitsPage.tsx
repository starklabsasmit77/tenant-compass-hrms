
import Layout from "../components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BenefitsPage = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Benefits Management</h1>
        
        <Tabs defaultValue="health">
          <TabsList>
            <TabsTrigger value="health">Health Insurance</TabsTrigger>
            <TabsTrigger value="retirement">Retirement Plans</TabsTrigger>
            <TabsTrigger value="wellness">Wellness Programs</TabsTrigger>
            <TabsTrigger value="other">Other Benefits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="health" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Health Insurance Benefits</CardTitle>
                <CardDescription>Manage health insurance plans</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                Health insurance benefits will be displayed here
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="retirement" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Retirement Plans</CardTitle>
                <CardDescription>Manage retirement and pension plans</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                Retirement plans will be displayed here
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wellness" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Wellness Programs</CardTitle>
                <CardDescription>Manage wellness and health programs</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                Wellness programs will be displayed here
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="other" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Other Benefits</CardTitle>
                <CardDescription>Manage additional employee benefits</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                Additional benefits will be displayed here
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BenefitsPage;
