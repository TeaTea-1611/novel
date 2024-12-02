"use client";

import {
  ChapterFragment,
  useUpdateChapterMutation,
} from "@/apollo-client/__generated";
import { Button } from "@/components/ui/button";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createChapterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  initialData: ChapterFragment & { content: string };
}

export function UpdateChapterForm({ initialData }: Props) {
  const form = useForm<z.infer<typeof createChapterSchema>>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: initialData.title,
      content: initialData.content,
      publishAt: new Date(initialData.publishAt),
      unlockPrice: initialData.unlockPrice,
    },
  });

  const [updateChapter, { loading }] = useUpdateChapterMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.updateChapter.success ? "success" : "error"](
        data.updateChapter.message,
      );
    },
  });

  function onSubmit(values: z.infer<typeof createChapterSchema>) {
    updateChapter({
      variables: {
        bookId: initialData.bookId,
        chapterId: initialData.id,
        ...values,
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} label="Tên chương" disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  label="Nội dung"
                  disabled={loading}
                  rows={20}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="unlockPrice"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger label="Giá mở khóa">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {[
                      { value: 0, label: "0" },
                      { value: 25, label: "25" },
                      { value: 50, label: "50" },
                      { value: 75, label: "75" },
                      { value: 100, label: "100" },
                    ].map((it) => (
                      <SelectItem key={it.value} value={it.value.toString()}>
                        {it.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Giá mở khóa chỉ áp dụng trước ngày mở khóa
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publishAt"
            render={({ field }) => (
              <FormControl>
                <FormItem className="flex flex-col">
                  <DatetimePicker
                    label="Ngày mở khóa"
                    value={field.value}
                    onChange={(nextDate) => field.onChange(nextDate)}
                    dtOptions={{ date: field.value }}
                    format={[["days", "months", "years"], []]}
                  />
                  <FormDescription>
                    Sau ngày mở khóa người dùng sẽ có thể đọc chương này miễn
                    phí
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormControl>
            )}
          />
        </div>
        <Button type="submit" disabled={loading} loading={loading}>
          Xác nhận
        </Button>
      </form>
    </Form>
  );
}
