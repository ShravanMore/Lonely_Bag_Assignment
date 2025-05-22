"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: searchParams.get("callbackUrl") || "/",
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
    } else if (res?.ok) {
      router.push(res.url || "/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md glass-morphism p-8 rounded-xl space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-movie-primary to-movie-secondary">
            MovieExplorer
          </h1>
          <p className="text-white/60 mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" disabled={loading} className="w-full bg-movie-primary hover:bg-movie-secondary text-white">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div className="text-center text-sm text-white/60">
          Don't have an account?{' '}
          <Link href="/register" className="text-movie-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
} 