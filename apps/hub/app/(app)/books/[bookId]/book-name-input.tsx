import { useUpdateBookMutation } from "@/apollo-client/__generated";
import { LoaderIcon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

interface Props {
  id: number;
  name: string;
}

export const BookNameInput = ({ id, name }: Props) => {
  const [value, setValue] = React.useState(name);
  const [showMessage, setShowMessage] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const [mutation, { loading, data }] = useUpdateBookMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted() {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    },
  });

  const handleBlur = () => {
    setIsEditing(false);
    const trimmedValue = value.trim();
    if (name !== trimmedValue && trimmedValue.length) {
      mutation({
        variables: {
          bookId: id,
          name: trimmedValue,
        },
      });
    }
  };

  return (
    <div className="flex w-full max-w-full flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 -mx-1.5">
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleBlur();
          }}
          className="relative w-full max-w-full"
        >
          <span className="invisible whitespace-pre px-1.5 py-0.5 text-xl border-2 border-transparent">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onBlur={handleBlur}
            className="absolute inset-0 text-xl px-1.5 py-0.5 bg-transparent truncate outline-none border-2 border-transparent focus:border-primary rounded-md"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-xl text-center sm:text-start sm:line-clamp-1"
        >
          {name}
        </span>
      )}
      {loading && (
        <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
      )}
      {!loading && showMessage && (
        <span
          className={`text-sm ${
            data?.updateBook.success
              ? "text-green-500"
              : "text-destructive-foreground"
          }`}
        >
          {data?.updateBook.message}
        </span>
      )}
    </div>
  );
};
