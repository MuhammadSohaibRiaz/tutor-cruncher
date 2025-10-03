import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("TutorCruncher webhook received:", body);

    // Later: save to Supabase
    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "TutorCruncher Webhook Endpoint Ready" });
}
