"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Slider } from "@workspace/ui/components/slider";
import { UserAvatar } from "@/components/user-avatar";
import { CameraIcon } from "lucide-react";
import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { toast } from "sonner";

interface Props {
  avatarCover: string;
  onSave: (file: File) => void;
}

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

export const EditAvatarCover = ({ avatarCover, onSave }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Kích thước file không được vượt quá 1MB");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setImage(result);
          setOpen(true);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", reject);
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
  ): Promise<File> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    ctx.drawImage(
      image,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob)
          resolve(new File([blob], "avatar.jpg", { type: "image/jpg" }));
      }, "image/jpg");
    });
  };

  const handleSave = async () => {
    if (!croppedAreaPixels || !image) return;
    try {
      setLoading(true);
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onSave(croppedImage);
      setOpen(false);
      setImage(null);
    } catch {
      toast.warning("Có lỗi xảy ra khi xử lý ảnh");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          setImage(null);
        }
        setOpen(value);
      }}
    >
      <div className="absolute inset-0 overflow-hidden shadow-md rounded-xl bg-accent group">
        <input
          id="update-avatar-cover"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        {!!avatarCover && (
          <UserAvatar avatar={avatarCover} className="size-full" />
        )}
        <label
          htmlFor="update-avatar-cover"
          className="absolute inset-0 z-10 items-center justify-center hidden rounded-lg cursor-pointer group-hover:flex backdrop-blur-sm"
        >
          <CameraIcon className="size-8 text-muted-foreground" />
        </label>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa ảnh đại diện</DialogTitle>
          <DialogDescription>
            Thực hiện thay đổi ảnh đại diện của bạn.
          </DialogDescription>
        </DialogHeader>
        {image ? (
          <>
            <div className="relative w-full mx-auto h-60">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={396 / 112}
                cropShape="rect"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <Slider
              defaultValue={[zoom]}
              value={[zoom]}
              min={1}
              max={3}
              step={0.05}
              onValueChange={([value]) => value && setZoom(value)}
            />
            <div className="flex space-x-2">
              <Button
                variant={"outline"}
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  setImage(null);
                }}
              >
                Hủy
              </Button>
              <Button className="w-full" onClick={handleSave} loading={loading}>
                Cập nhật
              </Button>
            </div>
          </>
        ) : (
          <>
            <Skeleton className="w-full h-60" />
            <Skeleton className="w-full h-2" />
            <div className="flex space-x-2">
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
