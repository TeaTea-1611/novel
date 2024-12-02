"use client";

import Link from "next/link";
import { LayoutWrapper } from "../layout-wrapper";
import { RegisterForm } from "./register-form";

export default function Page() {
  return (
    <LayoutWrapper backButtonHref="/login" backButtonLabel="Đăng nhập">
      <div className="mx-auto my-auto flex size-full flex-col justify-center space-y-6 sm:w-96 bg-card rounded-md p-4 border">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Đăng ký tài khoản
          </h1>
          <p className="text-sm text-muted-foreground">
            Nhanh chóng, đơn giản và miễn phí
          </p>
        </div>
        <RegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Bằng cách nhấp vào tiếp tục, bạn đồng ý với{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Điều khoản dịch vụ
          </Link>{" "}
          và{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Chính sách quyền riêng tư
          </Link>{" "}
          của chúng tôi.
        </p>
      </div>
    </LayoutWrapper>
  );
}
