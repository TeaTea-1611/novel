"use client";

import { useFullQuery } from "@/apollo-client/__generated";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading } = useFullQuery();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirect-to") || "/";

  useEffect(() => {
    if (!loading && data?.me) {
      router.replace(redirectTo);
    }
  }, [loading, data, router, redirectTo]);

  return children;
}
