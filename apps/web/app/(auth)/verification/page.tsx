"use client";

import { Icons } from "@workspace/ui/components/icons";
import { ResponseMessage } from "@/components/response-message";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { LayoutWrapper } from "../layout-wrapper";
import { useVerificationMutation } from "@/apollo-client/__generated";

export default function NewVerificationPage() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const [verification, { data, loading }] = useVerificationMutation({
    onError(error) {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!token) return;
    verification({
      variables: { token },
    });
  }, [token, verification]);

  return (
    <LayoutWrapper backButtonHref="/login" backButtonLabel="Quay lại đăng nhập">
      <div className="mx-auto my-auto flex size-full flex-col justify-center space-y-6 sm:w-96 bg-card rounded-md p-4 border">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Xác thực tài khoản
          </h1>
          <p className="text-sm text-muted-foreground">
            Xác thực tài khoản để có thể sử dụng.
          </p>
        </div>
        {loading && <Icons.spinner className="animate-spin mx-auto" />}
        <ResponseMessage
          success={data?.verification.success}
          message={data?.verification.message}
        />
      </div>
    </LayoutWrapper>
  );
}
