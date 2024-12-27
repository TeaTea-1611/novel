import * as React from "react";
import { Providers } from "@/components/providers";
import { inter } from "@/styles/fonts";
import "@workspace/ui/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import { ApolloWrapper } from "./apollo-wrapper";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { Toaster } from "@workspace/ui/components/sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased font-semibold`}>
        <ApolloWrapper>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
            <Providers>
              <TooltipProvider>
                {children}
                <ScrollToTopButton />
                <Toaster position="top-center"></Toaster>
              </TooltipProvider>
            </Providers>
          </GoogleOAuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
