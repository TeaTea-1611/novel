import { Button } from "@workspace/ui/components/button";
import { useTagGroups } from "../context/tag-groups-context";
import { PlusIcon } from "lucide-react";

export function TagGroupsPrimaryButtons() {
  const { setOpen } = useTagGroups();
  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setOpen("add")}>
        <span>Thêm mới</span> <PlusIcon size={18} />
      </Button>
    </div>
  );
}
