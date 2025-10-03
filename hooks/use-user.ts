"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Profile = {
  id: string;
  full_name: string;
  role: "student" | "instructor";
};

export function useUser() {
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUser(null);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) setUser(profile);
    }

    loadUser();
  }, []);

  return user;
}
