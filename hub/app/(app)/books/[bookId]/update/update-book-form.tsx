"use client";

import {
  BookFragment,
  useBookOptionsQuery,
  useUpdateBookMutation,
} from "@/apollo-client/__generated";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { updateBookSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  initialData: BookFragment;
}

export function UpdateBookForm({ initialData }: Props) {
  const { data: bookOptions, loading: bookOptionsLoading } =
    useBookOptionsQuery();

  const router = useRouter();

  const form = useForm<z.infer<typeof updateBookSchema>>({
    resolver: zodResolver(updateBookSchema),
    defaultValues: {
      name: initialData.name,
      synopsis: initialData.synopsis,
      gender: initialData.gender,
      status: initialData.status,
      genreId: initialData.genre.id,
      tagIds: initialData.tags.map((tag) => tag.id),
    },
  });

  const [update, { loading }] = useUpdateBookMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.updateBook.success ? "success" : "error"](
        data.updateBook.message,
      );
      if (data.updateBook.book) {
        router.push(`/books/${data.updateBook.book.id}`);
      }
    },
  });

  async function onSubmit(values: z.infer<typeof updateBookSchema>) {
    update({
      variables: {
        bookId: initialData.id,
        ...values,
      },
    });
  }

  if (bookOptionsLoading || !bookOptions) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-96" />
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input label="Tên truyện" {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-8">
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
                      <SelectValue placeholder="Vui lòng chọn" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {bookOptions.genders.map((gender) => {
                        return (
                          <SelectItem key={gender} value={gender.toString()}>
                            {["Truyện nam", "Truyện nữ"][gender - 1]}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genreId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <SelectTrigger label="Thể loại">
                      <SelectValue placeholder="Chọn" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {bookOptions.genres.map((genre) => (
                        <SelectItem
                          key={genre.name}
                          value={genre.id.toString()}
                        >
                          {genre.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="tagIds"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormControl>
                  <MultiSelect
                    defaultValue={initialData.tags.map((tag) => ({
                      value: tag.id.toString(),
                      label: tag.name,
                      badgeColor: tag.group.color,
                      badgeBackground: tag.group.bgColor,
                      group: tag.group.name,
                    }))}
                    label="Nhãn"
                    defaultOptions={bookOptions.tags.map((tag) => ({
                      value: tag.id.toString(),
                      label: tag.name,
                      badgeColor: tag.group.color,
                      badgeBackground: tag.group.bgColor,
                      group: tag.group.name,
                    }))}
                    groupBy="group"
                    placeholder="Chọn"
                    onChange={(options) =>
                      field.onChange(options.map((option) => option.value))
                    }
                    maxSelected={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-8 ">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <SelectTrigger label="Trạng thái">
                      <SelectValue placeholder="Vui lòng chọn" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {bookOptions.status.map((status) => {
                        return (
                          <SelectItem key={status} value={status.toString()}>
                            {["Còn tiếp", "Hoàn thành", "Tạm dừng"][status - 1]}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="synopsis"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    label="Giới thiệu truyện"
                    disabled={loading}
                    rows={20}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Icons.spinner className="animate-spin" /> : "Cập nhật"}
          </Button>
        </form>
      </Form>
    </>
  );
}
