"use client";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp";
import {
  FullDocument,
  useGoogleLoginMutation,
  useLoginMutation,
  useResendTwoFactorCodeMutation,
} from "@/apollo-client/__generated";
import { cn } from "@workspace/ui/lib/utils";
import { useApolloClient } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "@/schemas";
import { Input } from "@workspace/ui/components/input";
import { PasswordInput } from "@workspace/ui/components/password-input";
import { accessTokenVar } from "@/apollo-client/vars/access-token-var";
import { z } from "zod";
import * as React from "react";

export const LoginForm = () => {
  const [countdown, setCountdown] = useState(0);
  const [showTwoFactorCode, setShowTwoFactorCode] = useState(false);
  const client = useApolloClient();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const [login, { loading }] = useLoginMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: (data) => {
      toast[data.login.success ? "success" : "error"](data.login.message);
      if (data.login.twoFactor) {
        setShowTwoFactorCode(true);
        setCountdown(10);
      } else if (data.login.success && data.login.accessToken) {
        accessTokenVar(data.login.accessToken);
        client.refetchQueries({
          include: [FullDocument],
        });
      }
    },
  });

  const [googleLogin, { loading: googleLoading }] = useGoogleLoginMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.googleLogin.success ? "success" : "error"](
        data.googleLogin.message,
      );
      if (data.googleLogin.success && data.googleLogin.accessToken) {
        accessTokenVar(data.googleLogin.accessToken);
        client.refetchQueries({
          include: [FullDocument],
        });
      }
    },
  });

  const [resendTwoFactorCode, { loading: resendLoading }] =
    useResendTwoFactorCodeMutation({
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: (data) => {
        toast[data.resendTwoFactorCode.success ? "success" : "error"](
          data.resendTwoFactorCode.message,
        );
        if (data.resendTwoFactorCode) {
          setCountdown(10);
        }
      },
    });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit({ email, password, code }: z.infer<typeof loginSchema>) {
    login({
      variables: {
        email,
        password,
        code,
      },
    });
  }

  const onGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      googleLogin({
        variables: { code: codeResponse.code },
      });
    },
    flow: "auth-code",
  });

  const handleResendCode = () => {
    resendTwoFactorCode({
      variables: {
        email: form.watch("email"),
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem
              className={cn(!showTwoFactorCode ? "grid gap-2" : "hidden")}
            >
              <FormControl>
                <Input
                  {...field}
                  label="Email"
                  disabled={loading || googleLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem
              className={cn(!showTwoFactorCode ? "grid gap-2" : "hidden")}
            >
              <FormControl>
                <PasswordInput
                  {...field}
                  label="Mật khẩu"
                  disabled={loading || googleLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem
              className={cn(
                !showTwoFactorCode
                  ? "hidden"
                  : "flex flex-col items-center justify-center gap-2",
              )}
            >
              <FormLabel>Mã xác thực 2 lớp</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
              <Button
                type="button"
                variant="outline"
                onClick={handleResendCode}
                disabled={resendLoading || countdown > 0}
                className="w-full"
              >
                {resendLoading ? (
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 size-4" />
                )}
                {countdown > 0 ? `Gửi lại sau (${countdown}s)` : "Gửi lại mã"}
              </Button>
            </FormItem>
          )}
        />
        <Button
          variant={"gooeyRight"}
          type="submit"
          className="w-full"
          disabled={
            loading ||
            resendLoading ||
            googleLoading ||
            (showTwoFactorCode && (form.watch("code")?.length || 0) < 6)
          }
          loading={loading || resendLoading || googleLoading}
        >
          {!showTwoFactorCode ? "Đăng nhập" : "Xác nhận"}
        </Button>
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Hoặc tiếp tục với
            </span>
          </div>
        </div>
        <div className="w-full space-y-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => onGoogleLogin()}
            disabled={loading || googleLoading}
          >
            <Icons.google className="size-4 mr-2" />
            Google
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <Link
            href="/password-reset"
            className={buttonVariants({ variant: "link" })}
          >
            Quên mật khẩu?
          </Link>
        </div>
      </form>
    </Form>
  );
};
