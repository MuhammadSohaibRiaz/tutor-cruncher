"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function signUp(prevState: any, formData: FormData) {
  const supabase = createClient()

  const fullName = formData.get("fullName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as "student" | "instructor"

  // 1) create auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  if (!data.user) {
    return { error: "User not created" }
  }

  // 2) insert into profiles table
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: data.user.id,
      full_name: fullName,
      role: role,
    })

  if (profileError) {
    return { error: profileError.message }
  }

  return {
    success: "Your account has been created!",
    shouldRedirect: true,
  }
}
