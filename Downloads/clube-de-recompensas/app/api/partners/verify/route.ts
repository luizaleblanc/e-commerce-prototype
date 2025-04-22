import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

/**
 * @swagger
 * /api/partners/verify:
 *   post:
 *     summary: Verify partner document
 *     description: Checks if a partner document (CNPJ) is already registered
 *     tags:
 *       - Partners
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               partnerDocument:
 *                 type: string
 *                 example: "12.315.628/0001-90"
 *             required:
 *               - partnerDocument
 *     responses:
 *       200:
 *         description: Verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Partner document is available"
 *       400:
 *         description: Bad request - missing document
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { partnerDocument } = await request.json()

    if (!partnerDocument) {
      return NextResponse.json(
        { error: "Missing required field", message: "Partner document is required" },
        { status: 400 },
      )
    }

    // Check if partner document already exists
    const { data, error } = await supabase
      .from("partners")
      .select("id")
      .eq("partner_document", partnerDocument)
      .single()

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message, message: "Failed to verify partner document" }, { status: 500 })
    }

    const exists = !!data

    return NextResponse.json({
      exists,
      message: exists ? "Partner document already registered" : "Partner document is available",
    })
  } catch (error) {
    console.error("Error verifying partner document:", error)
    return NextResponse.json(
      { error: "Internal server error", message: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}
