"use client";

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
import {
  Gender,
  MyNovelsDocument,
  NovelStatus,
  useMutationNovelMutation,
  useNovelOptionsSuspenseQuery,
} from "@/apollo-client/__generated";
import { createNovelSchema } from "@workspace/db";

interface Props {
  id?: string;
  className?: string;
  submitButton?: boolean;
  onLoadingChange?: (loading: boolean) => void;
}

export const NovelsCreateForm = ({
  id = "novels-create-form",
  className,
  submitButton = true,
  onLoadingChange,
}: Props) => {
  const router = useRouter();
  const { data } = useNovelOptionsSuspenseQuery();

  const form = useForm<z.infer<typeof createNovelSchema>>({
    resolver: zodResolver(createNovelSchema),
    defaultValues: {
      title: "",
      gender: Gender.Male,
      genreId: data?.genres[0]?.id,
      synopsis: "",
      tagIds: [],
      status: NovelStatus.Ongoing,
    },
  });

  const [mutation, { loading, client }] = useMutationNovelMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      if (data.mutationNovel.id) {
        client.refetchQueries({
          include: [MyNovelsDocument],
        });
        router.push(`/novels/${data.mutationNovel.id}`);
      }
    },
  });

  function onSubmit(values: z.infer<typeof createNovelSchema>) {
    mutation({
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
