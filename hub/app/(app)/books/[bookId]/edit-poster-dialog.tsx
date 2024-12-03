"use client";

import { useState, useCallback, useRef } from "react";
import Cropper, { Area } from "react-easy-crop";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useChangePosterMutation } from "@/apollo-client/__generated";

interface Props {
  bookId: number;
  children: React.ReactNode;
}

const MAX_FILE_SIZE = 1024 * 1024;

export const EditPosterDialog = ({ bookId, children }: Props) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [changePoster, { loading }] = useChangePosterMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      if (data.changePoster) {
        setOpen(false);
        setImage(null);
      }
    },
  });

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
    } else {
      setOpen(false);
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
          resolve(new File([blob], "poster.jpg", { type: "image/jpg" }));
      }, "image/jpg");
    });
  };

  const handleSave = async () => {
    if (!croppedAreaPixels || !image) return;
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      changePoster({
        variables: {
          bookId,
          poster: croppedImage,
        },
      });
    } catch {
      toast.warning("Có lỗi xảy ra khi xử lý ảnh");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!value) {
            setImage(null);
          }
          setOpen(value);
        }}
      >
        <input
          ref={inputRef}
          id="update-poster"
          type="file"
          accept="image/*"
          onClick={(e) => {
            e.currentTarget.addEventListener(
              "cancel",
              () => {
                setOpen(false);
              },
              { once: true },
            );
          }}
          onChange={handleFileInput}
          className="hidden"
        />
        <DialogTrigger onClick={() => inputRef.current?.click()} asChild>
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa áp phích truyện</DialogTitle>
            <DialogDescription>
              Thực hiện thay đổi áp phích truyện của bạn.
            </DialogDescription>
          </DialogHeader>
          {image ? (
            <>
              <div className="relative w-full h-80 mx-auto">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={176 / 240}
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
              <Skeleton className="w-full h-80" />
              <Skeleton className="w-full h-2" />
              <div className="flex space-x-2">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
