import { useUpdateBookMutation } from "@/apollo-client/__generated";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FilePenIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  bookId: number;
  synopsis: string;
}

export const BookSynopsis = ({ bookId, synopsis }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true); // Theo dõi trạng thái hiển thị
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [updateBook, { loading }] = useUpdateBookMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.updateBook.success ? "success" : "error"](
        data.updateBook.message,
      );
      if (data.updateBook.success) {
        setIsEditing(false);
      }
    },
  });

  useEffect(() => {
    if (isEditing && containerRef.current && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
        textareaRef.current.value.length;
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;

      containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isEditing]);

  return (
    <div ref={containerRef} className="space-y-3 ">
      <div className="flex items-center justify-between border-b">
        <h3 className="pb-2 text-xl font-semibold tracking-tight transition-colors">
          Tóm tắt truyện
        </h3>
        <Button
          variant={isEditing ? "default" : "outline"}
          size={"sm"}
          onClick={() => {
            if (!isEditing) {
              setValue(synopsis);
            }
            setIsEditing((pre) => !pre);
          }}
        >
          <FilePenIcon className="mr-2 size-4" />
          Sửa tóm tắt
        </Button>
      </div>
      {!isEditing ? (
        <>
          <p
            className={cn("text-sm text-muted-foreground", {
              "line-clamp-6": isCollapsed,
            })}
            dangerouslySetInnerHTML={{
              __html: synopsis.replace(/\n/g, "<br />"),
            }}
          ></p>
          {synopsis.split(" ").length > 50 && (
            <Button
              variant="link"
              className="mt-2 text-sm"
              onClick={() => {
                setIsCollapsed(!isCollapsed);
                setTimeout(() => {
                  containerRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                  });
                }, 0);
              }}
            >
              {isCollapsed ? "Hiển thị thêm" : "Ẩn bớt"}
            </Button>
          )}
        </>
      ) : (
        <>
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="text-muted-foreground"
            rows={20}
          />
          <Button
            disabled={loading || synopsis === value}
            onClick={() => {
              updateBook({
                variables: {
                  bookId,
                  synopsis: value,
                },
              });
            }}
          >
            Lưu thay đổi
          </Button>
        </>
      )}
    </div>
  );
};
