"use client";

import { useUpdateChaptersMutation } from "@/apollo-client/__generated";
import { Button } from "@/components/ui/button";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gql } from "@apollo/client";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  bookId: number;
  chapterIds: number[];
  children: React.ReactNode;
}

export const ChaptersUpdateDialog = ({
  bookId,
  chapterIds,
  children,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [unlockPrice, setUnlockPrice] = useState(0);
  const [publishAt, setPublishAt] = useState(new Date());

  const [updateChapters, { loading, client }] = useUpdateChaptersMutation({
    variables: {
      bookId,
      chapterIds,
      publishAt,
      unlockPrice,
    },
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.updateChapters.success ? "success" : "error"](
        data.updateChapters.message,
      );
      if (data.updateChapters.success) {
        chapterIds.forEach((chapterId) => {
          client.cache.writeFragment({
            id: `Chapter:${chapterId}`,
            fragment: gql`
              fragment UpdatedChapter on Chapter {
                publishAt
                unlockPrice
              }
            `,
            data: {
              publishAt,
              unlockPrice,
            },
          });
        });
        setOpen(false);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Cập nhật {chapterIds} chương</DialogTitle>
          <DialogDescription>
            Điền các thông tin dưới để cập nhật cho {chapterIds} các chương.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="w-full">
            <Select
              onValueChange={(value) => setUnlockPrice(parseInt(value))}
              defaultValue={unlockPrice.toString()}
            >
              <SelectTrigger label="Giá mở khóa" className="w-full">
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
            <p className="text-sm text-muted-foreground">
              Giá mở khóa chỉ áp dụng trước ngày mở khóa
            </p>
          </div>
          <div className="w-full">
            <DatetimePicker
              label="Ngày mở khóa"
              value={publishAt}
              onChange={(nextDate) => nextDate && setPublishAt(nextDate)}
              dtOptions={{ date: publishAt }}
              format={[["days", "months", "years"], []]}
            />
            <p className="text-sm text-muted-foreground">
              Sau ngày mở khóa người dùng sẽ có thể đọc chương này miễn phí
            </p>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Button
              type="button"
              variant={"outline"}
              disabled={loading}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={loading}
              onClick={(e) => {
                e.stopPropagation();
                updateChapters();
              }}
            >
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
