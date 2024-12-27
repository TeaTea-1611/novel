"use client";

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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerSchema } from "@/schemas";
import { useRegisterMutation } from "@/apollo-client/__generated";
import { Input } from "@workspace/ui/components/input";
import { PasswordInput } from "@workspace/ui/components/password-input";
import { z } from "zod";

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
        <Button
          disabled={loading}
          type="submit"
          variant={"gooeyRight"}
          className="w-full"
          loading={loading}
        >
          Tiếp tục
        </Button>
        <ResponseMessage
          success={data?.register.success}
          message={data?.register.message}
        />
      </form>
    </Form>
  );
};
