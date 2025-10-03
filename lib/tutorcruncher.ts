export async function createTutorCruncherUser({
  fullName,
  email,
  role,
}: {
  fullName: string;
  email: string;
  role: "student" | "instructor";
}) {
  const apiKey = process.env.TUTORCRUNCHER_API_KEY!;
  const endpoint = process.env.TUTORCRUNCHER_BASE_URL!;

  const type = role === "student" ? "clients" : "tutors";

  const res = await fetch(`${endpoint}/${type}/`, {
    method: "POST",
    headers: {
      "Authorization": `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: fullName.split(" ")[0],
      last_name: fullName.split(" ").slice(1).join(" "),
      email,
    }),
  });

  if (!res.ok) throw new Error("TutorCruncher API failed");

  return res.json();
}
