import { MainHeader } from "@/components/main-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainHeader />
      <main className="flex flex-1 flex-col gap-4 p-1 md:p-4 pt-4">
        {children}
      </main>
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <div className="absolute size-full bg-gradient-to-b from-gradient-from to-gradient-to"></div>
      </div>
    </>
  );
}
