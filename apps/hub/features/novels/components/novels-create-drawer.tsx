import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import React, { useState } from "react";
import { NovelsCreateForm } from "./novels-create-form";

interface Props {
  children: React.ReactNode;
}

export const NovelsCreateDrawer = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col overflow-auto md:max-w-xl">
        <SheetHeader className="text-left">
          <SheetTitle> Thêm truyện</SheetTitle>
          <SheetDescription>
            Thêm truyện mới bằng cách cung cấp thông tin cần thiết. Nhấp vào lưu
            khi bạn hoàn tất.
          </SheetDescription>
        </SheetHeader>
        <NovelsCreateForm
          className="flex-1"
          submitButton={false}
          onLoadingChange={setLoading}
        />
        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Đóng</Button>
          </SheetClose>
          <Button form="novels-create-form" type="submit" loading={loading}>
            Lưu
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
