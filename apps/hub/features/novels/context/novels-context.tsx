import React, { useState } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import { NovelFragment } from "@/apollo-client/__generated";

type NovelsDialogType = "create" | "update" | "delete" | "import";

interface NovelsContextType {
  open: NovelsDialogType | null;
  setOpen: (str: NovelsDialogType | null) => void;
  currentRow: NovelFragment | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<NovelFragment | null>>;
}

const NovelsContext = React.createContext<NovelsContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function NovelsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<NovelsDialogType>(null);
  const [currentRow, setCurrentRow] = useState<NovelFragment | null>(null);
  return (
    <NovelsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </NovelsContext>
  );
}

export const useNovels = () => {
  const context = React.useContext(NovelsContext);

  if (!context) {
    throw new Error("useNovels has to be used within <NovelsContext>");
  }

  return context;
};
