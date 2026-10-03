import { NextResponse, type NextRequest } from "next/server";
import { listEnquiries } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const required = process.env.ADMIN_KEY;
  if (!required) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_KEY env var not configured" },
      { status: 503 }
    );
  }

  const url = new URL(req.url);
  const supplied =
    url.searchParams.get("key") ||
    req.headers.get("x-admin-key") ||
    (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");

  if (supplied !== required) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const limitParam = Number(url.searchParams.get("limit") || "100");
  const limit = Math.max(1, Math.min(500, Number.isFinite(limitParam) ? limitParam : 100));
  const rows = listEnquiries(limit);

  return NextResponse.json({
    ok: true,
    count: rows.length,
    note:
      rows.length === 0
        ? "No enquiries stored. On Render's free plan the SQLite file resets whenever the service spins down. Check 'Logs' in the Render dashboard for [ENQUIRY] entries — they always survive."
        : undefined,
    enquiries: rows,
  });
}
