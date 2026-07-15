import AuthGuard from "@/components/admin/AuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-bg text-fg">
        <AdminSidebar />
        <div className="flex-1 min-w-0 p-8 md:p-12">{children}</div>
      </div>
    </AuthGuard>
  );
}
