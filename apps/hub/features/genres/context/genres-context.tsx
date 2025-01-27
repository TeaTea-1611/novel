import React, { createContext, useState, useContext, ReactNode } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import { Genre } from "@/apollo-client/__generated";

const CONTEXT_ERROR = "useGenres must be used within GenresProvider" as const;

export type GenresDialogType = "add" | "edit" | "delete" | "multi-delete";

type RowSelection = Record<string, boolean>;

interface GenresContextType {
  open: GenresDialogType | null;
  setOpen: (type: GenresDialogType | null) => void;
  currentRow: Genre | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Genre | null>>;
  rowSelection: RowSelection;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelection>>;
}

interface GenresProviderProps {
  children: ReactNode;
}

// Create context with a default value that matches the type
const GenresContext = createContext<GenresContextType | null>(null);

export function GenresProvider({ children }: GenresProviderProps) {
  const [open, setOpen] = useDialogState<GenresDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Genre | null>(null);
  const [rowSelection, setRowSelection] = useState<RowSelection>({});

  return (
    <GenresContext.Provider
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
    </GenresContext.Provider>
  );
}

export function useGenres(): GenresContextType {
  const context = useContext(GenresContext);

  if (!context) {
    throw new Error(CONTEXT_ERROR);
  }

  return context;
}
