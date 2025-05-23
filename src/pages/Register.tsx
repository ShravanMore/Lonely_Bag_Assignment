import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login: authLogin } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const user = register({ name, email, password });
      authLogin(user);
      toast({
        title: "Registration successful",
        description: "Welcome to MovieExplorer!",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md glass-morphism p-8 rounded-xl space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-movie-primary to-movie-secondary">
            MovieExplorer
          </h1>
          <p className="text-white/60 mt-2">Create your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-white/80">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-white/80">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-white/80">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-movie-primary hover:bg-movie-secondary text-white"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
        
        <div className="text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link href="/login" className="text-movie-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
