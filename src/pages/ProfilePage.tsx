
import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const ProfilePage = () => {
  const { currentUser } = useUser();
  const [activeTab, setActiveTab] = useState("details");
  
  const handleSaveChanges = () => {
    toast.success("Profile updated successfully");
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="" alt={currentUser?.name || ""} />
                    <AvatarFallback className="text-2xl">
                      {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{currentUser?.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{currentUser?.position}</p>
                  <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm border-b pb-2">
                    <span className="text-muted-foreground">Department</span>
                    <span className="font-medium">{currentUser?.department || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b pb-2">
                    <span className="text-muted-foreground">Position</span>
                    <span className="font-medium">{currentUser?.position || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Role</span>
                    <span className="font-medium capitalize">{currentUser?.role.replace('-', ' ') || 'N/A'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="details">Personal Details</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details">
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                        <Input id="firstName" placeholder="First Name" defaultValue={currentUser?.name.split(' ')[0]} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                        <Input id="lastName" placeholder="Last Name" defaultValue={currentUser?.name.split(' ')[1]} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input id="email" type="email" placeholder="Email" defaultValue={currentUser?.email} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                        <Input id="phone" placeholder="Phone Number" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="address" className="text-sm font-medium">Address</label>
                        <Input id="address" placeholder="Address" />
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="password">
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="text-sm font-medium">Current Password</label>
                      <Input id="currentPassword" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
                      <Input id="newPassword" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                      <Input id="confirmPassword" type="password" placeholder="••••••••" />
                    </div>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="preferences">
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Notifications</label>
                      <div className="flex items-center">
                        <input type="checkbox" id="emailNotifications" className="mr-2" defaultChecked />
                        <label htmlFor="emailNotifications" className="text-sm">Receive email notifications</label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Language</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time Zone</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="utc">UTC</option>
                        <option value="est">Eastern Time</option>
                        <option value="cst">Central Time</option>
                        <option value="pst">Pacific Time</option>
                      </select>
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
              
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
