"use client";

import { useCreateGenreMutation } from "@/apollo-client/__generated";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { gql } from "@apollo/client";
import { useState } from "react";
import { toast } from "sonner";

export function CreateDialog({ children }: { children: React.ReactNode }) {
  const [createGenre, { loading, client }] = useCreateGenreMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      if (data.createGenre) {
        client.cache.modify({
          fields: {
            genres(existingGenres = []) {
              const newGenreRef = client.cache.writeFragment({
                data: data.createGenre,
                fragment: gql`
                  fragment NewGenre on Genre {
                    id
                    name
                  }
                `,
              });
              return [...existingGenres, newGenreRef];
            },
          },
        });

        toast.success(`Đã thêm thể loại: ${data.createGenre.name}`);
        setOpen(false);
        setValue("");
      }
    },
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm thể loại</DialogTitle>
          <DialogDescription>
            Điền các thông tin bên dưới để thêm thể loại mới
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createGenre({
              variables: { name: value },
            });
          }}
          className="mt-2 space-y-6"
        >
          <Input
            label="Tên thể loại"
            disabled={loading}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant={"gooeyRight"} loading={loading}>
            Xác nhận
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
