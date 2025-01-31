"use client";

import {
  NovelOptionsDocument,
  Genre,
  useDeleteGenresMutation,
} from "@/apollo-client/__generated";
import { ConfirmDialog } from "@/components/confirm-dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { Input } from "@workspace/ui/components/input";
import { TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BaseDeleteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SingleGenreDeleteProps extends BaseDeleteProps {
  type: "single";
  currentRow: Genre;
}

interface MultiGenreDeleteProps extends BaseDeleteProps {
  type: "multi";
  rowSelection: Record<string, boolean>;
}

type DeleteProps = SingleGenreDeleteProps | MultiGenreDeleteProps;

const CONFIRM_TEXT = "Xác nhận";

export function GenresDeleteDialog(props: DeleteProps) {
  const [value, setValue] = useState("");
  const { open, onOpenChange } = props;

  const [mutation, { loading, client }] = useDeleteGenresMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.deleteGenres.success ? "success" : "error"](
        data.deleteGenres.message,
      );
      if (data.deleteGenres.success) {
        client.refetchQueries({
          include: [NovelOptionsDocument],
        });
        onOpenChange(false);
        setValue("");
      }
    },
  });

  const handleDelete = () => {
    const genreIds =
      props.type === "single"
        ? [props.currentRow.id]
        : Object.keys(props.rowSelection)
            .filter((key) => props.rowSelection[key])
            .map((id) => parseInt(id));

    mutation({
      variables: {
        genreIds,
      },
    });
  };

  const getConfirmationText = () => {
    if (props.type === "single") {
      return props.currentRow.name;
    }
    return CONFIRM_TEXT;
  };

  const getDescription = () => {
    if (props.type === "single") {
      return (
        <>
          Bạn có chắc chắn muốn xóa thể loại{" "}
          <span className="font-bold">{props.currentRow.name}</span>?
        </>
      );
    }
    return (
      <>
        Bạn có chắc chắn muốn xóa?
        <br />
        Nhập <span className="font-bold">&quot;{CONFIRM_TEXT}&quot;</span> để
        xóa.
      </>
    );
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== getConfirmationText() || loading}
      title={
        <span className="text-destructive">
          <TriangleAlertIcon
            className="stroke-destructive mr-1 inline-block"
            size={18}
          />{" "}
          Xóa
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            {getDescription()}
            <br />
            Hành động này sẽ xóa vĩnh viễn dữ liệu này khỏi hệ thống. Điều này
            không thể hoàn tác được.
          </p>

          <Input
            label={props.type === "single" ? "Thể loại" : "Xác nhận xóa"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter username to confirm deletion."
          />

          <Alert variant="destructive">
            <AlertTitle>Cảnh báo!</AlertTitle>
            <AlertDescription>
              Hãy cẩn thận, thao tác này không thể được khôi phục.
            </AlertDescription>
          </Alert>
        </div>
      }
      destructive
    />
  );
}
