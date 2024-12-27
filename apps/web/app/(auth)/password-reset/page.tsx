import { LayoutWrapper } from "../layout-wrapper";
import { PasswordResetForm } from "./password-reset-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
};

export default function PasswordResetPage() {
  return (
    <LayoutWrapper backButtonHref="/login" backButtonLabel="Đăng nhập">
      <div className="mx-auto my-auto flex size-full flex-col justify-center space-y-6 sm:w-96 bg-card rounded-md p-4 border">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Quên mật khẩu
          </h1>
          <p className="text-sm text-muted-foreground">
            Điền email vào ô dưới để nhận thư hướng dẫn đặt lại mật khẩu.
          </p>
        </div>
        <PasswordResetForm />
      </div>
    </LayoutWrapper>
  );
}
