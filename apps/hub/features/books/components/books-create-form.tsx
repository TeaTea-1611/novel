"use client";

import {
  CreatedBooksDocument,
  useBookOptionsSuspenseQuery,
  useCreateBookMutation,
} from "@/apollo-client/__generated";
import { createBookSchema } from "@workspace/schemas/book";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MultipleSelector from "@workspace/ui/components/multiple-selector";
import { genders } from "@/data/genders";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@workspace/ui/lib/utils";
import { useEffect } from "react";

interface Props {
  id?: string;
  className?: string;
  submitButton?: boolean;
  onLoadingChange?: (loading: boolean) => void;
}

export const BooksCreateForm = ({
  id = "books-create-form",
  className,
  submitButton = true,
  onLoadingChange,
}: Props) => {
  const router = useRouter();
  const { data } = useBookOptionsSuspenseQuery();

  const form = useForm<z.infer<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      name: "",
      gender: data?.genders[0],
      genreId: data?.genres[0]?.id,
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
      if (data.createBook.success && data.createBook.book) {
        client.refetchQueries({
          include: [CreatedBooksDocument],
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

  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading, onLoadingChange]);

  if (!data) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input label="Tên truyện" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger label="Giới tính" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.genders.map((gender) => (
                    <SelectItem key={gender} value={gender.toString()}>
                      {genders.find((g) => g.value === gender)?.label}
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
          name="synopsis"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea label="Tóm tắt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genreId"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger label="Thể loại" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.genres.map((genre) => (
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
        <FormField
          control={form.control}
          name="tagIds"
          render={({ field }) => (
            <FormItem>
              <MultipleSelector
                label="Thẻ"
                defaultOptions={data.tags.map((tag) => ({
                  value: tag.id.toString(),
                  label: tag.name,
                  group: tag.group.name,
                  badgeColor: tag.group.color,
                }))}
                groupBy="group"
                maxSelected={5}
                onChange={(options) =>
                  field.onChange(options.map((option) => option.value))
                }
              />
              <FormMessage />
            </FormItem>
          )}
        />
        {submitButton && (
          <Button type="submit" loading={loading}>
            Xác nhận
          </Button>
        )}
      </form>
    </Form>
  );
};
