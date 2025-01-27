"use client";

import {
  useChangeAvatarCoverMutation,
  useChangeAvatarMutation,
  useFullQuery,
} from "@/apollo-client/__generated";
import ContentSection from "./content-section";
import { ProfileForm } from "./profile-form";
import { toast } from "sonner";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { NotLoggedIn } from "@/components/not-logged-in";
import { EditAvatarCover } from "./edit-avatar-cover";
import { EditAvatar } from "./edit-avatar";

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
  const [changeAvatarCover] = useChangeAvatarCoverMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: ({ changeAvatarCover }) => {
      if (changeAvatarCover) {
        toast.success("Đã cập nhật ảnh đại diện.");
      }
    },
  });

  const content = loading ? (
    <div className="flex flex-col gap-8">
      <Skeleton className="w-96 h-28" />
      <Skeleton className="w-full h-11" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-11" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-40 h-9" />
    </div>
  ) : !data?.me ? (
    <NotLoggedIn />
  ) : (
    <>
      <div className="flex flex-col gap-8">
        <div className="relative max-w-96">
          <EditAvatarCover
            avatarCover={data.me.avatarCover}
            onSave={(file) => {
              changeAvatarCover({
                variables: { avatarCover: file },
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
        <ProfileForm initialData={data.me} />
      </div>
    </>
  );

  return (
    <ContentSection
      title="Hồ sơ"
      desc="Đây là cách người khác sẽ nhìn thấy bạn trên trang web."
    >
      {content}
    </ContentSection>
  );
}
