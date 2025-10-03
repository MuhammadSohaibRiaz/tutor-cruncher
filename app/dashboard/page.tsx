import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login"); // instead of showing "not signed in"
  }

  const user = session.user;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">
        Welcome, <span className="font-semibold">{profile?.full_name}</span> 🎉
      </p>
      <p className="mt-2 text-gray-600">Your role: {profile?.role}</p>
    </div>
  );
}
