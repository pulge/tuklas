import { DashboardShell } from "@/components/layout";
import { PageHeaderProvider } from "@/components/ui/PageHeaderContext";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell>
      <PageHeaderProvider>
        {children}
      </PageHeaderProvider>
    </DashboardShell>
  );
}
