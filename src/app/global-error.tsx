"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-accent/30 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary mb-3">
            Something Went Wrong
          </h1>
          <p className="text-foreground/70 mb-8">
            An unexpected error occurred. Our team has been notified. Please try again or return to the homepage.
          </p>
          {process.env.NODE_ENV === "development" && (
            <p className="text-xs text-destructive bg-destructive/10 rounded-xl px-4 py-3 mb-6 text-left break-all">
              {error.message}
            </p>
          )}
          <div className="flex gap-3 justify-center">
            <Button
              onClick={reset}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary-container gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="rounded-full border-primary/20 text-primary gap-2">
                <Home className="w-4 h-4" />
                Homepage
              </Button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
