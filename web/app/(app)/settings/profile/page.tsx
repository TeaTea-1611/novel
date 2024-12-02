"use client";

import { NotLoggedIn } from "@/components/not-logged-in";
import { UserAvatar } from "@/components/user-avatar";
import { useChangeAvatarMutation, useFullQuery } from "@/generated/graphql";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { toast } from "sonner";
import { Wrapper } from "../wrapper";
import { ChangePendant } from "./change-pendant";
import { EditAvatar } from "./edit-avatar";
import { ProfileForm } from "./profile-form";

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
        <Skeleton className="size-28 rounded-full" />
        <div className="flex items-center justify-center space-x-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-16 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-72" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-72" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  ) : !data?.me ? (
    <NotLoggedIn />
  ) : (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 mb-8">
        <UserAvatar
          size={112}
          avatar={data.me.avatar}
          pendant="https://fastcdn.hoyoverse.com/static-resource-v2/2024/04/10/8c3f8f0171bce9b2571696b2202231f9_6804457412128473879.webp?x-oss-process=image/resize,m_fixed,h_318,w_318"
        />
        <div className="flex items-center justify-center space-x-2">
          <EditAvatar
            onSave={(file) => {
              changeAvatar({
                variables: { avatar: file },
              });
            }}
          />
          <ChangePendant onSave={() => {}} />
        </div>
      </div>
      <ProfileForm initialData={data.me} />
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
