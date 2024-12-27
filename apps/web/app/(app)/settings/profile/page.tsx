"use client";

import {
  useChangeAvatarMutation,
  useFullQuery,
} from "@/apollo-client/__generated";
import { NotLoggedIn } from "@/components/not-logged-in";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { toast } from "sonner";
import { Wrapper } from "../wrapper";
import { EditAvatar } from "./edit-avatar";
import { ProfileForm } from "./profile-form";
import { EditCoverAvatar } from "./edit-cover-avatar";

export default function Page() {
  const { data, loading } = useFullQuery();
  const [changeAvatar] = useChangeAvatarMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: ({ changeAvatar }) => {
      if (changeAvatar) {
        toast.success("Đã cập nhật ảnh đại diện.");
      }
    },
  });

  const content = loading ? (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center space-y-3">
        <Skeleton className="rounded-full size-28" />
        <div className="flex items-center justify-center space-x-2">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-20 h-6" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-full h-10" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-full h-16" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="h-10 w-72" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="h-10 w-72" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="w-20 h-10" />
      </div>
    </div>
  ) : !data?.me ? (
    <NotLoggedIn />
  ) : (
    <>
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Ảnh hồ sơ</h2>
        <p className="text-sm text-muted-foreground">
          Tải ảnh lên để làm nổi bật hồ sơ của bạn và để mọi người dễ dàng nhận
          ra nhận xét và đóng góp của bạn!
        </p>
        <div className="relative mb-8 max-w-96">
          <EditCoverAvatar
            coverAvatar={data.me.avatarCover}
            onSave={(file) => {
              changeAvatar({
                variables: { avatar: file },
              });
            }}
          />
          <EditAvatar
            avatar={data.me.avatar}
            onSave={(file) => {
              changeAvatar({
                variables: { avatar: file },
              });
            }}
          />
        </div>
        <h2 className="text-lg font-bold">Thông tin tài khoản</h2>
        <ProfileForm initialData={data.me} />
      </div>
    </>
  );

  return (
    <Wrapper
      title="Hồ sơ"
      description={"Đây là cách người khác sẽ nhìn thấy bạn trên trang web."}
    >
      {content}
    </Wrapper>
  );
}
