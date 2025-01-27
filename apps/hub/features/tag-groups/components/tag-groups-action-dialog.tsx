"use client";

import {
  BookOptionsDocument,
  TagGroup,
  useMutationTagGroupMutation,
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
  color: z.string().min(1, { message: "Bắt buộc" }),
});

type TagForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: TagGroup;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TagGroupsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const form = useForm<TagForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          ...currentRow,
        }
      : { name: "", color: "" },
  });

  const [mutation, { loading, client }] = useMutationTagGroupMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted() {
      if (!currentRow) {
        client.refetchQueries({
          include: [BookOptionsDocument],
        });
      }
      form.reset();
      onOpenChange(false);
    },
  });

  const onSubmit = ({ id, name, color }: TagForm) => {
    mutation({
      variables: {
        tagGroupId: id ?? null,
        name,
        color,
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
              id="tag-form"
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
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormControl>
                      <Input
                        label="Màu"
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
          <Button type="submit" form="tag-form" loading={loading}>
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
