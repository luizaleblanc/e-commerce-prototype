import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

/**
 * @swagger
 * /api/partners/stats:
 *   get:
 *     summary: Get partner statistics
 *     description: Retrieves statistics about partners (requires admin privileges)
 *     tags:
 *       - Partners
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Partner statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPartners:
 *                   type: integer
 *                   example: 25
 *                 activePartners:
 *                   type: integer
 *                   example: 20
 *                 newPartnersThisMonth:
 *                   type: integer
 *                   example: 5
 *                 partnersByRegion:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                   example: {"SP": 10, "RJ": 5, "MG": 3}
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
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

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

    // Get total partners
    const { count: totalPartners, error: countError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("user_role", "partner")

    if (countError) {
      return NextResponse.json(
        { error: countError.message, message: "Failed to retrieve partner statistics" },
        { status: 500 },
      )
    }

    // Get new partners this month
    const firstDayOfMonth = new Date()
    firstDayOfMonth.setDate(1)
    firstDayOfMonth.setHours(0, 0, 0, 0)

    const { count: newPartnersThisMonth, error: newError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("user_role", "partner")
      .gte("created_at", firstDayOfMonth.toISOString())

    if (newError) {
      return NextResponse.json(
        { error: newError.message, message: "Failed to retrieve new partner statistics" },
        { status: 500 },
      )
    }

    // Get partners by region
    const { data: partners, error: partnersError } = await supabase
      .from("partners")
      .select("address")
      .not("address", "is", null)

    if (partnersError) {
      return NextResponse.json(
        { error: partnersError.message, message: "Failed to retrieve partner regions" },
        { status: 500 },
      )
    }

    // Count partners by state
    const partnersByRegion: Record<string, number> = {}
    partners?.forEach((partner) => {
      if (partner.address && partner.address.state) {
        const state = partner.address.state
        partnersByRegion[state] = (partnersByRegion[state] || 0) + 1
      }
    })

    // Assume 80% of partners are active (this would be replaced with actual data in a real system)
    const activePartners = Math.floor((totalPartners || 0) * 0.8)

    return NextResponse.json({
      totalPartners: totalPartners || 0,
      activePartners,
      newPartnersThisMonth: newPartnersThisMonth || 0,
      partnersByRegion,
    })
  } catch (error) {
    console.error("Error retrieving partner statistics:", error)
    return NextResponse.json(
      { error: "Internal server error", message: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}
