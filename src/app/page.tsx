// SESSION NOTE: Auth gates (Authenticated/Unauthenticated/AuthLoading) removed
// temporarily. When Convex + Clerk env vars are configured, restore auth wrapper
// from git history (scaffold commit) and wrap Dashboard in <Authenticated>.
import { Header } from "@/components/header";
import { Dashboard } from "@/components/dashboard";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl p-4 pt-8">
        <Dashboard />
      </main>
    </div>
  );
}
