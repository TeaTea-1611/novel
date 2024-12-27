"use client";

import { Icons } from "@/components/icons";
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
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { newPasswordSchema } from "@/schemas";
import { useNewPasswordMutation } from "@/apollo-client/__generated";
import { PasswordInput } from "@workspace/ui/components/password-input";
import { z } from "zod";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const [newPassword, { data, loading }] = useNewPasswordMutation({
    onError(error) {
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    if (!token) return;

    newPassword({
      variables: { token, ...values },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  {...field}
                  label="Mật khẩu mới"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Icons.spinner className="animate-spin" /> : "Xác nhận"}
        </Button>
        <ResponseMessage
          success={data?.newPassword.success}
          message={data?.newPassword.message}
        />
      </form>
    </Form>
  );
};
