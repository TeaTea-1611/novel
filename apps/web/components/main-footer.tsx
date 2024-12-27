import { siteConfig } from "@/config/site";
import { Icons } from "./icons";

export default function MainFooter() {
  return (
    <footer className="mt-8 border-t bg-card">
      <div className="flex flex-col items-center justify-center max-w-screen-lg px-2 mx-auto h-14 lg:px-4">
        <div className="flex items-center mx-2 shrink-0">
          <Icons.logo className="mr-2 size-6 text-primary" />
          <span>© 2024 {siteConfig.name}.</span>
        </div>
      </div>
    </footer>
  );
}
