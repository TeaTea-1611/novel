"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  onSave: (value: string) => void;
}

export const ChangePendant = ({ onSave }: Props) => {
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    try {
      setOpen(false);
    } catch {
      toast.warning("Có lỗi xảy ra.");
    } finally {
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="rounded-2xl">
          Thay khung
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thay khung</DialogTitle>
          <DialogDescription>
            Thực hiện thay đổi khung ảnh đại diện của bạn.
          </DialogDescription>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
};
