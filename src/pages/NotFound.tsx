import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-6xl font-bold tracking-tighter sm:text-8xl">404</h1>
      <p className="mb-8 text-xl text-muted-foreground sm:text-2xl">
        Oops! Page not found
      </p>
      <Link to="/">
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Return Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
