
import { Navigate } from "react-router-dom";
import { useUser, UserRole } from "@/contexts/UserContext";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  element: React.ReactNode;
  roles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roles }) => {
  const { currentUser, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="space-y-4 w-64">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-2/3" />
        </div>
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // If roles are specified, check if user has required role
  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has required role
  return <>{element}</>;
};

export default ProtectedRoute;
