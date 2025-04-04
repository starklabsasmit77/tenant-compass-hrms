
import { Link } from "react-router-dom";
import DemoLoginForm from "../components/auth/DemoLoginForm";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-lg font-bold text-white">TH</span>
              </div>
              <span className="ml-3 text-xl font-bold">TenantHR</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button asChild variant="ghost">
                <a href="#features">Features</a>
              </Button>
              <Button asChild variant="ghost">
                <a href="#pricing">Pricing</a>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/dashboard">Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                  Comprehensive HR Management for Multiple Organizations
                </h1>
                <p className="text-lg text-gray-600">
                  A multi-tenant HRMS platform that streamlines employee management, attendance tracking, leave management, and payroll processing.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <a href="#features">Get Started</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#demo">Learn More</a>
                  </Button>
                </div>
                <div className="pt-6">
                  <p className="text-sm text-gray-500">
                    Trusted by 500+ organizations worldwide
                  </p>
                </div>
              </div>
              
              <div>
                <DemoLoginForm />
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="py-12 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Complete HR Solution</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage your human resources in one place
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Employee Management",
                  description: "Streamline employee onboarding, data management, and organizational structure."
                },
                {
                  title: "Attendance Tracking",
                  description: "Monitor employee attendance through various integration options and detailed reports."
                },
                {
                  title: "Leave Management",
                  description: "Simplify leave applications, approvals, and balance tracking for all employees."
                },
                {
                  title: "Payroll Processing",
                  description: "Automate salary calculations, tax deductions, and generate compliant reports."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-white">TH</span>
                </div>
                <span className="ml-2 text-lg font-bold text-white">TenantHR</span>
              </div>
              <p className="text-sm text-gray-400">
                Comprehensive HR management solution for organizations of all sizes.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-white">Employee Management</a></li>
                <li><a href="#" className="text-sm hover:text-white">Attendance Tracking</a></li>
                <li><a href="#" className="text-sm hover:text-white">Leave Management</a></li>
                <li><a href="#" className="text-sm hover:text-white">Payroll Processing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-sm">Email: info@tenanthr.com</li>
                <li className="text-sm">Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            &copy; 2025 TenantHR. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
