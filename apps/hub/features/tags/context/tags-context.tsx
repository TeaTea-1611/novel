import React, { createContext, useState, useContext, ReactNode } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import { TagFragment } from "@/apollo-client/__generated";

const CONTEXT_ERROR = "useTags must be used within TagsProvider" as const;

export type TagsDialogType = "add" | "edit" | "delete" | "multi-delete";

type RowSelection = Record<string, boolean>;

interface TagsContextType {
  open: TagsDialogType | null;
  setOpen: (type: TagsDialogType | null) => void;
  currentRow: TagFragment | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<TagFragment | null>>;
  rowSelection: RowSelection;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelection>>;
}

interface TagsProviderProps {
  children: ReactNode;
}

// Create context with a default value that matches the type
const TagsContext = createContext<TagsContextType | null>(null);

export function TagsProvider({ children }: TagsProviderProps) {
  const [open, setOpen] = useDialogState<TagsDialogType>(null);
  const [currentRow, setCurrentRow] = useState<TagFragment | null>(null);
  const [rowSelection, setRowSelection] = useState<RowSelection>({});

  return (
    <TagsContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        rowSelection,
        setRowSelection,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
}

export function useTags(): TagsContextType {
  const context = useContext(TagsContext);

  if (!context) {
    throw new Error(CONTEXT_ERROR);
  }

  return context;
}
