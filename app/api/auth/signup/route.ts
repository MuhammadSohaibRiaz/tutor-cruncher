import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = createClient();
  const body = await req.json();

  const { email, password, fullName, role } = body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, role } },
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await supabase.from("profiles").insert({
    id: data.user?.id,
    full_name: fullName,
    role,
  });

  return NextResponse.json({ success: true });
}
