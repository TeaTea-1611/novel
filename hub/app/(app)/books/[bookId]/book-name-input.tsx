import { useUpdateBookMutation } from "@/apollo-client/__generated";
import { useDebounce } from "@/hooks/use-debounce";
import { CloudAlertIcon, CloudIcon, LoaderIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  bookId: number;
  name: string;
}

export const BookNameInput = ({ bookId, name }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(name);
  const [error, setError] = useState(false);

  const [updateBook, { loading }] = useUpdateBookMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      setError(!data.updateBook.success);
    },
  });

  const debounced = useDebounce(value, 1000);

  useEffect(() => {
    if (debounced !== value || name === value.trim()) {
      return;
    }
    updateBook({
      variables: {
        bookId,
        name: value,
      },
    });
  }, [debounced, value, name, bookId, updateBook]);

  return (
    <div className="flex items-center space-x-2">
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim() !== name)
              updateBook({
                variables: {
                  bookId,
                  name: value,
                },
              });
          }}
          className="relative w-fit max-w-[100ch]"
        >
          <span className="invisible text-xl font-bold whitespace-pre">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 px-2 text-lg truncate bg-transparent"
          />
        </form>
      ) : (
        <h2
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-xl font-bold lg:text-left"
        >
          {name}
        </h2>
      )}
      {isEditing &&
        (error ? (
          <CloudAlertIcon className="size-6 text-destructive" />
        ) : (
          <CloudIcon className="size-6" />
        ))}
      {loading && (
        <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
      )}
    </div>
  );
};
