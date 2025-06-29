"use client"

import { authClient } from "@/lib/auth-client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa6";

export const AuthForm = () => {
  const handleLogin = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider: provider,
      callbackURL: "/dashboard",
      errorCallbackURL: "/error", // TODO: add error page
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Google or Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => handleLogin("google")}
            >
              <FaGoogle />
              Login with Google
            </Button>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => handleLogin("github")}
            >
              <FaGithub />
              Login with Github
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* TODO: Add privacy and terms */}
    </div>
  )
};
