"use client";

import { LayoutWrapper } from "../layout-wrapper";
import { LoginForm } from "./login-form";

export default function Page() {
  return (
    <LayoutWrapper backButtonHref="/register" backButtonLabel="Đăng ký">
      <div className="mx-auto my-auto flex size-full flex-col justify-center space-y-6 sm:w-96 bg-card rounded-md p-4 border">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Đăng nhập</h1>
          <p className="text-sm text-muted-foreground">
            Đăng nhập để sử dụng các tính năng hữu ích
          </p>
        </div>
        <LoginForm />
      </div>
    </LayoutWrapper>
  );
}
