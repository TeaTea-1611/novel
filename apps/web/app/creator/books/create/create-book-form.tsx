"use client";

import { Genre, TagFragment } from "@/apollo-client/__generated";
import { GENDERS } from "@/constants/common";
import { createBookSchema } from "@/schemas";
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

interface Props {
  genders: number[];
  genres: Genre[];
  tags: TagFragment[];
}

export const CreateBookForm = ({ genders, genres, tags }: Props) => {
  const form = useForm<z.infer<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      name: "",
      gender: genders[0],
      genreId: genres[0]?.id,
      synopsis: "",
      tagIds: [],
    },
  });

  function onSubmit(values: z.infer<typeof createBookSchema>) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender.toString()}>
                      {GENDERS[gender]}
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
                  {genres.map((genre) => (
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
                options={tags.map((tag) => ({
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
        <Button type="submit">Tiếp tục</Button>
      </form>
    </Form>
  );
};
