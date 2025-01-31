"use client";

import {
  NovelOptionsDocument,
  Genre,
  useMutationGenreMutation,
} from "@/apollo-client/__generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Bắt buộc" }),
});
type GenreForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: Genre;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GenresActionDialog({ currentRow, open, onOpenChange }: Props) {
  const form = useForm<GenreForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ? currentRow : { name: "" },
  });

  const [mutation, { loading, client }] = useMutationGenreMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted() {
      if (!currentRow) {
        client.refetchQueries({
          include: [NovelOptionsDocument],
        });
      }
      form.reset();
      onOpenChange(false);
    },
  });

  const onSubmit = ({ id, name }: GenreForm) => {
    mutation({
      variables: {
        genreId: id ?? null,
        name,
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{currentRow ? "Chỉnh sửa" : "Thêm mới"}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mr-4 h-[26.25rem] w-full py-1 pr-4">
          <Form {...form}>
            <form
              id="genre-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormControl>
                      <Input
                        label="Tên"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="genre-form" loading={loading}>
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
