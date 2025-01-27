import React, { createContext, useState, useContext, ReactNode } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import { TagGroup } from "@/apollo-client/__generated";

const CONTEXT_ERROR =
  "useTagGroups must be used within TagGroupsProvider" as const;

export type TagGroupsDialogType = "add" | "edit" | "delete" | "multi-delete";

type RowSelection = Record<string, boolean>;

interface TagGroupsContextType {
  open: TagGroupsDialogType | null;
  setOpen: (type: TagGroupsDialogType | null) => void;
  currentRow: TagGroup | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<TagGroup | null>>;
  rowSelection: RowSelection;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelection>>;
}

interface TagGroupsProviderProps {
  children: ReactNode;
}

// Create context with a default value that matches the type
const TagGroupsContext = createContext<TagGroupsContextType | null>(null);

export function TagGroupsProvider({ children }: TagGroupsProviderProps) {
  const [open, setOpen] = useDialogState<TagGroupsDialogType>(null);
  const [currentRow, setCurrentRow] = useState<TagGroup | null>(null);
  const [rowSelection, setRowSelection] = useState<RowSelection>({});

  return (
    <TagGroupsContext.Provider
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
    </TagGroupsContext.Provider>
  );
}

export function useTagGroups(): TagGroupsContextType {
  const context = useContext(TagGroupsContext);

  if (!context) {
    throw new Error(CONTEXT_ERROR);
  }

  return context;
}
