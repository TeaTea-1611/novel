"use client";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Slider } from "@repo/ui/components/ui/slider";
import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { toast } from "sonner";

interface Props {
  onSave: (file: File) => void;
}

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

export const EditAvatar = ({ onSave }: Props) => {
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
      <div>
        <input
          id="update-avatar"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        <label
          htmlFor="update-avatar"
          className={cn(
            buttonVariants({ size: "sm" }),
            "cursor-pointer rounded-2xl",
          )}
        >
          Thay ảnh đại diện
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
            <div className="relative w-full h-60 mx-auto">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                classes={{
                  containerClassName: "size-full bg-transparent",
                  cropAreaClassName: "!size-60",
                  mediaClassName: "max-h-full",
                }}
              />
            </div>
            <Slider
              defaultValue={[zoom]}
              value={[zoom]}
              min={1}
              max={3}
              step={0.05}
              onValueChange={([value]) => setZoom(value)}
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
              <Button className="w-full" onClick={handleSave}>
                {loading ? (
                  <Icons.spinner className="animate-spin" />
                ) : (
                  "Cập nhật"
                )}
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
