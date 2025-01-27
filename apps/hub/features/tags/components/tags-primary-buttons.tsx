import { Button } from "@workspace/ui/components/button";
import { useTags } from "../context/tags-context";
import { PlusIcon } from "lucide-react";

export function TagsPrimaryButtons() {
  const { setOpen } = useTags();
  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setOpen("add")}>
        <span>Thêm mới</span> <PlusIcon size={18} />
      </Button>
    </div>
  );
}
