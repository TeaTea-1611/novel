"use client";

import {
  useChangeProfileMutation,
  UserFragment,
} from "@/apollo-client/__generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeProfileSchema } from "@workspace/schemas/user";
import { Button } from "@workspace/ui/components/button";
import { DatetimePicker } from "@workspace/ui/components/datetime-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Icons } from "@workspace/ui/components/icons";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  initialData: UserFragment;
}

export function ProfileForm({ initialData }: Props) {
  const [changeProfile, { loading }] = useChangeProfileMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: ({ changeProfile }) => {
      if (changeProfile) {
        toast.success("Đã cập nhật hồ sơ.");
      }
    },
  });

  const form = useForm<z.infer<typeof changeProfileSchema>>({
    resolver: zodResolver(changeProfileSchema),
    defaultValues: {
      nickname: initialData.nickname,
      introduce: initialData.introduce,
      urls: initialData.urls.map((value) => ({ value })),
      gender: initialData.gender,
      dob: new Date(initialData.dob),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  function onSubmit({ urls, ...values }: z.infer<typeof changeProfileSchema>) {
    changeProfile({
      variables: {
        ...values,
        urls: urls?.map((url) => url.value) || [],
      },
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input label="Tên hiển thị" disabled={loading} {...field} />
                </FormControl>
                <FormDescription>
                  Đây là tên hiển thị công khai của bạn. Nó có thể là tên thật
                  hoặc bút danh của bạn.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="introduce"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} label="Giới thiệu" disabled={loading} />
                </FormControl>
                <FormDescription>
                  Bạn có thể @mention những người dùng và tổ chức khác.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <SelectTrigger label="Giới tính">
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {[
                        { value: 1, label: "Nam" },
                        { value: 2, label: "Nữ" },
                        { value: 3, label: "Bí mật" },
                      ].map((it) => (
                        <SelectItem key={it.value} value={it.value.toString()}>
                          {it.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormControl>
                  <FormItem className="flex flex-col">
                    <DatetimePicker
                      label="Ngày sinh"
                      value={field.value}
                      onChange={(nextDate) => field.onChange(nextDate)}
                      dtOptions={{ date: field.value }}
                      format={[["days", "months", "years"], []]}
                    />
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />
          </div>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex w-full space-x-2">
                        <Input
                          {...field}
                          label="url"
                          className="flex-1"
                          disabled={loading}
                          icon={Trash2}
                          onClickIcon={() => remove(index)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormDescription>
              Thêm liên kết vào trang web, blog hoặc hồ sơ truyền thông xã hội
              của bạn.
            </FormDescription>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "https://" })}
              disabled={loading}
            >
              Thêm URL
            </Button>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Icons.spinner className="animate-spin" />
            ) : (
              "Lưu thay đổi"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
