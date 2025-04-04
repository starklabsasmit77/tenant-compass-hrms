
import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

const SettingsPage = () => {
  const { currentUser } = useUser();
  const [activeTab, setActiveTab] = useState("account");
  
  const handleSaveChanges = (section: string) => {
    toast.success(`${section} settings updated successfully`);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            {currentUser?.role !== 'employee' && (
              <>
                <TabsTrigger value="teamMembers">Team Members</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </>
            )}
          </TabsList>
          
          <TabsContent value="account" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-sm font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="displayName" className="text-sm font-medium">Display Name</label>
                      <Input id="displayName" defaultValue={currentUser?.name} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input id="email" type="email" defaultValue={currentUser?.email} />
                    </div>
                  </div>
                </div>
                
                {/* Preferences */}
                <div>
                  <h3 className="text-sm font-semibold mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Language</span>
                        <p className="text-sm text-muted-foreground">Select your preferred language</p>
                      </div>
                      <select className="border p-2 rounded-md">
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Time Zone</span>
                        <p className="text-sm text-muted-foreground">Set your local time zone</p>
                      </div>
                      <select className="border p-2 rounded-md">
                        <option value="utc">UTC</option>
                        <option value="est">Eastern Time</option>
                        <option value="cst">Central Time</option>
                        <option value="pst">Pacific Time</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => handleSaveChanges("Account")}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Email Notifications</span>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Browser Notifications</span>
                      <p className="text-sm text-muted-foreground">Receive notifications in browser</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Leave Requests</span>
                        <p className="text-sm text-muted-foreground">Updates about leave requests</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Payroll</span>
                        <p className="text-sm text-muted-foreground">Updates about salary and payslips</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Company Announcements</span>
                        <p className="text-sm text-muted-foreground">Updates about company news</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => handleSaveChanges("Notification")}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Change */}
                <div>
                  <h3 className="text-sm font-semibold mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="text-sm font-medium">Current Password</label>
                      <Input id="currentPassword" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
                      <Input id="newPassword" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</label>
                      <Input id="confirmPassword" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                </div>
                
                {/* Two-Factor Authentication */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-semibold">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                {/* Session Management */}
                <div>
                  <h3 className="text-sm font-semibold mb-4">Active Sessions</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                          <p className="text-xs text-muted-foreground">Started: Today at 09:30 AM</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">Sign Out of All Sessions</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => handleSaveChanges("Security")}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {currentUser?.role !== 'employee' && (
            <>
              <TabsContent value="teamMembers" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Manage team members and their permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Team members management options will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>Connect with third-party services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Integration options will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
