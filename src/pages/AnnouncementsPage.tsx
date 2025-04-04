
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import { PlusCircle, Megaphone } from "lucide-react";

const AnnouncementsPage = () => {
  const { currentUser } = useUser();
  const isOrgAdmin = currentUser?.role === 'org-admin';
  
  // Mock announcements
  const [announcements] = useState([
    {
      id: "1",
      title: "Company Picnic",
      content: "Join us for the annual company picnic on Saturday, June 15th at Central Park. Families welcome!",
      date: "2023-04-05T10:00:00Z",
      author: "Jessica Admin",
      important: true
    },
    {
      id: "2",
      title: "New Health Insurance Benefits",
      content: "We're excited to announce enhanced health benefits starting next month. Check your email for details.",
      date: "2023-04-03T14:30:00Z",
      author: "Sarah HR",
      important: true
    },
    {
      id: "3",
      title: "Office Renovation Schedule",
      content: "The 3rd floor will be under renovation starting April 10th. Please plan accordingly.",
      date: "2023-04-01T09:15:00Z",
      author: "Jessica Admin",
      important: false
    },
    {
      id: "4",
      title: "Q2 Goals Released",
      content: "Department heads have released Q2 goals. Schedule a meeting with your manager to discuss.",
      date: "2023-03-28T11:45:00Z",
      author: "Robert Super",
      important: false
    }
  ]);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Announcements</h1>
          {isOrgAdmin && (
            <Button onClick={() => toast.info("Create announcement dialog would appear here")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          )}
        </div>
        
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className={announcement.important ? "border-l-4 border-l-red-500" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      {announcement.important && <Megaphone className="h-4 w-4 text-red-500 mr-2" />}
                      {announcement.title}
                    </CardTitle>
                    <CardDescription>
                      Posted by {announcement.author} • {new Date(announcement.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{announcement.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AnnouncementsPage;
