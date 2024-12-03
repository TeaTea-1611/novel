"use client";

import {
  BookDocument,
  BookQuery,
  useBookOptionsQuery,
  useConvertBookMutation,
} from "@/apollo-client/__generated";
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
import { convertBookSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function ConvertBookForm() {
  const { data: bookOptions, loading: bookOptionsLoading } =
    useBookOptionsQuery();
  const router = useRouter();

  const form = useForm<z.infer<typeof convertBookSchema>>({
    resolver: zodResolver(convertBookSchema),
    defaultValues: {
      name: "",
      originalName: "",
      authorName: "",
      originalAuthorName: "",
      synopsis: "",
      tagIds: [],
    },
  });

  const [createBook, { loading, client }] = useConvertBookMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.convertBook.success ? "success" : "error"](
        data.convertBook.message,
      );
      if (data.convertBook.book) {
        client.writeQuery<BookQuery>({
          query: BookDocument,
          variables: {
            bookId: data.convertBook.book.id,
          },
          data: {
            __typename: "Query",
            book: data.convertBook.book,
          },
        });
        router.push(`/books/${data.convertBook.book.id}`);
      }
    },
  });

  function onSubmit(values: z.infer<typeof convertBookSchema>) {
    createBook({
      variables: {
        ...values,
      },
    });
  }

  if (bookOptionsLoading || !bookOptions) {
    return (
      <div className="space-y-8">
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-full h-20" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} label="Tên truyện" disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="originalName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} label="Tên truyện gốc" disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authorName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} label="Tên tác giả" disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="originalAuthorName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} label="Tên gốc tác giả" disabled={loading} />
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
                <Select onValueChange={field.onChange}>
                  <SelectTrigger label="Giới tính">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {bookOptions.genders.map((gender) => (
                      <SelectItem key={gender} value={gender.toString()}>
                        {["Truyện nam", "Truyện nữ"][gender - 1]}
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
            name="genreId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Select onValueChange={field.onChange}>
                  <SelectTrigger label="Thể loại">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {bookOptions.genres.map((genre) => (
                      <SelectItem key={genre.id} value={genre.id.toString()}>
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="synopsis"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} label="Tóm tắt" disabled={loading} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} loading={loading}>
          Tiếp theo
        </Button>
      </form>
    </Form>
  );
}
