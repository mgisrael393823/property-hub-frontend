
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreatorsTab } from "@/components/admin-dashboard/CreatorsTab";
import { ProjectsTab } from "@/components/admin-dashboard/ProjectsTab";
import { ApplicationsTab } from "@/components/admin-dashboard/ApplicationsTab";
import { DisputesTab } from "@/components/admin-dashboard/DisputesTab";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage platform content and users</p>
      </div>

      <Tabs defaultValue="creators" className="space-y-6">
        <TabsList className="w-full justify-start border-b rounded-none p-0 h-12">
          <TabsTrigger value="creators" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-primary">
            Creators
          </TabsTrigger>
          <TabsTrigger value="projects" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-primary">
            Projects
          </TabsTrigger>
          <TabsTrigger value="applications" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-primary">
            Applications
          </TabsTrigger>
          <TabsTrigger value="disputes" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-primary">
            Disputes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creators" className="p-0">
          <CreatorsTab />
        </TabsContent>
        <TabsContent value="projects" className="p-0">
          <ProjectsTab />
        </TabsContent>
        <TabsContent value="applications" className="p-0">
          <ApplicationsTab />
        </TabsContent>
        <TabsContent value="disputes" className="p-0">
          <DisputesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
