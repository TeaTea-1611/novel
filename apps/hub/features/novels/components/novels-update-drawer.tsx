import {
  NovelFragment,
  useNovelOptionsSuspenseQuery,
  useUpdateNovelMutation,
} from "@/apollo-client/__generated";
import { genders } from "@/data/genders";
import { status } from "@/data/status";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateNovelSchema } from "@workspace/db";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import MultipleSelector from "@workspace/ui/components/multiple-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { Textarea } from "@workspace/ui/components/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: NovelFragment;
}

export const NovelsUpdateDrawer = ({
  open,
  onOpenChange,
  currentRow,
}: Props) => {
  const { data } = useNovelOptionsSuspenseQuery();

  const form = useForm<z.infer<typeof updateNovelSchema>>({
    resolver: zodResolver(updateNovelSchema),
    defaultValues: {
      ...currentRow,
      genreId: currentRow.genre.id,
      tagIds: currentRow.tags.map((tag) => tag.id),
    },
  });

  const [mutation, { loading }] = useUpdateNovelMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.updateNovel.success ? "success" : "error"](
        data.updateNovel.message,
      );
    },
  });

  function onSubmit(values: z.infer<typeof updateNovelSchema>) {
    mutation({
      variables: {
        bookId: currentRow.id,
        ...values,
      },
    });
  }

  if (!data) {
    return null;
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        form.reset();
      }}
    >
      <SheetContent className="flex w-full flex-col overflow-auto md:max-w-xl">
        <SheetHeader className="text-left">
          <SheetTitle>Chỉnh sửa</SheetTitle>
          <SheetDescription>Nhấp vào lưu khi bạn hoàn tất.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id="books-update-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-8"
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
                    defaultValue={currentRow.gender.toString()}
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
                    defaultValue={currentRow.genre.id.toString()}
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
                    defaultValue={currentRow.tags.map((tag) => ({
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
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={currentRow.status.toString()}
                  >
                    <FormControl>
                      <SelectTrigger label="Trạng thái" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.status.map((s) => (
                        <SelectItem key={s} value={s.toString()}>
                          {status.find((i) => i.value === s)?.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Đóng</Button>
          </SheetClose>
          <Button form="books-update-form" type="submit" loading={loading}>
            Lưu
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
