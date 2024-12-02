"use client";

import { Icons } from "@/components/icons";
import { ResponseMessage } from "@/components/response-message";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerSchema, z } from "@repo/shared-schemas";
import { useRegisterMutation } from "@/generated/graphql";
import { Input } from "@repo/ui/components/ui/input";
import { PasswordInput } from "@repo/ui/components/ui/password-input";

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
    },
  });

  const [register, { data, loading }] = useRegisterMutation({
    onError(error) {
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    register({
      variables: { ...values },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} label="Tên hiển thị" disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput {...field} label="Mật khẩu" disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Icons.spinner className="animate-spin" /> : "Tiếp tục"}
        </Button>
        <ResponseMessage
          success={data?.register.success}
          message={data?.register.message}
        />
      </form>
    </Form>
  );
};
