/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createClient } from "@/lib/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginStatus, setLoginStatus] = useState<boolean | null>(null);
  const [loginMessage, setLoginMessage] = useState<string>("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Helper function to validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // HANDLING LOGIN
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMsg("Invalid email format! Enter correct email.");
      toast.error("Invalid email format");
      return;
    }

    try {
      // Check for existing login attempts
      const { data: loginAttempt } = await supabase
        .from("login_attempts")
        .select("*")
        .eq("email", email)
        .single();

      // Check if the account is locked
      if (
        loginAttempt &&
        loginAttempt.blocked_until &&
        new Date(loginAttempt.blocked_until) > new Date()
      ) {
        const remainingTime = Math.ceil(
          (new Date(loginAttempt.blocked_until).getTime() -
            new Date().getTime()) /
            60000
        );

        if (remainingTime > 0) {
          setErrorMsg(`Account is locked. Try again in ${remainingTime} minute(s).`);
          toast.error(`Account is locked. Try again in ${remainingTime} minute(s).`);
          return;
        } else {
          // Reset attempts if remaining time is over
          await supabase
            .from("login_attempts")
            .update({ attempts: 0, blocked_until: null })
            .eq("email", email);
          toast.success("Your account is now unlocked. Please try again.");
        }
      }

      // Attempt to sign in the user
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Increment the failed attempt counter
        let newAttempts = 1;
        if (loginAttempt) {
          newAttempts = loginAttempt.attempts + 1;
          let blocked_until = null;

          if (newAttempts >= 3) {
            blocked_until = new Date(new Date().getTime() + 15 * 60000); // Block for 15 minutes
          }

          await supabase
            .from("login_attempts")
            .update({
              attempts: newAttempts,
              last_attempt: new Date(),
              blocked_until,
            })
            .eq("email", email);
        } else {
          await supabase.from("login_attempts").insert({
            email,
            attempts: 1,
          });
        }

        setErrorMsg("Invalid username or password! Please try again.");
        toast.error("Invalid username or password!");
        return;
      }

      // Successful login - Reset login attempts
      if (loginAttempt) {
        await supabase
          .from("login_attempts")
          .update({ attempts: 0, blocked_until: null })
          .eq("email", email);
      }

      // Redirect based on user type
      const userType = data?.user?.user_metadata?.userType;
      const userEmail = data?.user?.user_metadata?.email;
      const userId = userEmail ? userEmail.split("@")[0] : null;

      if (userType === "tea_supplier") {
        router.push(`/my_dashboard/${userId}`);
      } else {
        router.push(`/dashboard/${userId}`);
      }

      toast.success("Logged in successfully!");
    } catch (error) {
      setErrorMsg("Unexpected error during sign-in. Please try again!");
      toast.error("Unexpected error during sign-in");
      console.error("Unexpected error:", error);
    }
  };

  // HANDLING GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        setLoginStatus(false);
        setLoginMessage("Google login failed: " + error.message);
        toast.error("Google login failed");
      } else {
        setLoginStatus(true);
        setLoginMessage("Google login successful!");
        toast.success("Google login successful");
        router.push("/");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Unexpected error during Google sign-in");
    }
  };

  return (
    <main className=" min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg p-8 bg-[#380f2a55] shadow-lg rounded-lg">
        <Link href="/">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">
            TRAVELGENIUS
          </h1>
        </Link>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <div className="flex justify-between text-sm mb-4">
            <Link href="/forget" className="text-purple-600 hover:underline">
              Forgot Password?
            </Link>
            <Link href="/Register" className="text-purple-600 hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Or</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full px-4 py-2 mt-2 font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign in with Google
          </button>
        </div>

        {loginStatus !== null && (
          <div className={`mt-4 text-sm text-center ${loginStatus ? "text-green-600" : "text-red-600"}`}>
            {loginMessage}
          </div>
        )}

        {errorMsg && <div className="mt-4 text-sm text-center text-red-600">{errorMsg}</div>}
      </div>
    </main>
  );
}
