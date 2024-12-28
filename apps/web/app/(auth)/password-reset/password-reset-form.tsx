"use client";

import { Icons } from "@workspace/ui/components/icons";
import { ResponseMessage } from "@/components/response-message";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { passwordResetSchema } from "@/schemas";
import { usePasswordResetMutation } from "@/apollo-client/__generated";
import { Input } from "@workspace/ui/components/input";
import { z } from "zod";

export const PasswordResetForm = () => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const [passwordReset, { data, loading }] = usePasswordResetMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted() {
      setCountdown(10);
    },
  });

  function onSubmit(values: z.infer<typeof passwordResetSchema>) {
    passwordReset({
      variables: { ...values },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} label="Email" disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={countdown > 0 || loading}
          type="submit"
          className="w-full"
        >
          {countdown > 0 ? (
            `Gửi lại sau (${countdown}s)`
          ) : loading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            "Gửi mail"
          )}
        </Button>
        <ResponseMessage
          success={data?.passwordReset.success}
          message={data?.passwordReset.message}
        />
      </form>
    </Form>
  );
};
