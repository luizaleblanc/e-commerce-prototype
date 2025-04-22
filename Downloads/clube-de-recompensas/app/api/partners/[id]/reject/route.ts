import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

/**
 * @swagger
 * /api/partners/{id}/reject:
 *   post:
 *     summary: Reject partner
 *     description: Rejects a partner account (requires admin privileges)
 *     tags:
 *       - Partners
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Partner ID
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Invalid business documentation"
 *             required:
 *               - reason
 *     responses:
 *       200:
 *         description: Partner rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Partner rejected successfully
 *       400:
 *         description: Bad request - missing reason
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Partner not found
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
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()
    const partnerId = params.id
    const { reason } = await request.json()

    if (!reason) {
      return NextResponse.json(
        { error: "Missing required field", message: "Rejection reason is required" },
        { status: 400 },
      )
    }

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized", message: "Authentication required" }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase.from("profiles").select("user_role").eq("id", session.user.id).single()

    if (profile?.user_role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admin privileges required" }, { status: 403 })
    }

    // Check if partner exists
    const { data: partnerExists, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", partnerId)
      .eq("user_role", "partner")
      .single()

    if (checkError || !partnerExists) {
      return NextResponse.json({ error: "Not found", message: "Partner not found" }, { status: 404 })
    }

    // Update partner status in partners table
    const { error: updateError } = await supabase
      .from("partners")
      .update({
        status: "rejected",
        rejected_at: new Date().toISOString(),
        rejection_reason: reason,
      })
      .eq("user_id", partnerId)

    if (updateError) {
      return NextResponse.json({ error: updateError.message, message: "Failed to reject partner" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Partner rejected successfully",
    })
  } catch (error) {
    console.error("Error rejecting partner:", error)
    return NextResponse.json(
      { error: "Internal server error", message: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}
