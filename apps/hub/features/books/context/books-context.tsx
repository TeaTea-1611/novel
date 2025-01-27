import React, { useState } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import { BookFragment } from "@/apollo-client/__generated";

type BooksDialogType = "create" | "update" | "delete" | "import";

interface BooksContextType {
  open: BooksDialogType | null;
  setOpen: (str: BooksDialogType | null) => void;
  currentRow: BookFragment | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<BookFragment | null>>;
}

const BooksContext = React.createContext<BooksContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function BooksProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<BooksDialogType>(null);
  const [currentRow, setCurrentRow] = useState<BookFragment | null>(null);
  return (
    <BooksContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </BooksContext>
  );
}

export const useBooks = () => {
  const context = React.useContext(BooksContext);

  if (!context) {
    throw new Error("useBooks has to be used within <BooksContext>");
  }

  return context;
};
