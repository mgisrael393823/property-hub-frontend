import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { FileQuestion, Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { AppError, ErrorType } from "@/lib/error/errorHandler";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log the 404 error for analytics
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // This could be sent to an error tracking service in production
    const error = AppError.notFound(`Page not found: ${location.pathname}`);
    
    // For demonstration purposes, just log it
    console.error("Structured error:", error);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="h-10 w-10 text-gray-500" />
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-medium text-gray-800 mb-4">Page Not Found</h2>
        
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Link to={ROUTES.HOME}>
            <Button className="flex items-center gap-2 w-full">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-400 mb-4">Looking for something specific?</p>
          <Link to={ROUTES.SEARCH}>
            <Button 
              variant="ghost" 
              className="text-sm text-gray-500 flex items-center gap-2"
            >
              <Search className="h-3 w-3" />
              Search Creators
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
