import { Button } from "@workspace/ui/components/button";
import { useGenres } from "../context/genres-context";
import { PlusIcon } from "lucide-react";

export function GenresPrimaryButtons() {
  const { setOpen } = useGenres();
  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setOpen("add")}>
        <span>Thêm mới</span> <PlusIcon size={18} />
      </Button>
    </div>
  );
}
