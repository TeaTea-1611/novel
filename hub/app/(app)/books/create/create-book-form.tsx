"use client";

import {
  BookDocument,
  BookQuery,
  useBookOptionsQuery,
  useCreateBookMutation,
} from "@/apollo-client/__generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBookSchema } from "@/schemas";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function CreateBookForm() {
  const { data: bookOptions, loading: bookOptionsLoading } =
    useBookOptionsQuery();
  const router = useRouter();

  const form = useForm<z.infer<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      name: "",
      synopsis: "",
      tagIds: [],
    },
  });

  const [createBook, { loading, client }] = useCreateBookMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.createBook.success ? "success" : "error"](
        data.createBook.message,
      );
      if (data.createBook.book) {
        client.writeQuery<BookQuery>({
          query: BookDocument,
          variables: {
            bookId: data.createBook.book.id,
          },
          data: {
            __typename: "Query",
            book: data.createBook.book,
          },
        });
        router.push(`/books/${data.createBook.book.id}`);
      }
    },
  });

  function onSubmit(values: z.infer<typeof createBookSchema>) {
    createBook({
      variables: {
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
