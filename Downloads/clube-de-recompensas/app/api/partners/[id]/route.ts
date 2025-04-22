import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

/**
 * @swagger
 * /api/partners/{id}:
 *   get:
 *     summary: Get partner by ID
 *     description: Retrieves a partner by their ID
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
 *     responses:
 *       200:
 *         description: Partner retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 partner:
 *                   $ref: '#/components/schemas/Partner'
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
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()
    const partnerId = params.id

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized", message: "Authentication required" }, { status: 401 })
    }

    // Check if user is requesting their own profile or is an admin
    const isOwnProfile = session.user.id === partnerId

    if (!isOwnProfile) {
      // Check if user is admin
      const { data: profile } = await supabase.from("profiles").select("user_role").eq("id", session.user.id).single()

      if (profile?.user_role !== "admin") {
        return NextResponse.json(
          { error: "Forbidden", message: "You can only access your own profile" },
          { status: 403 },
        )
      }
    }

    // Get partner profile
    const { data: partnerProfile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", partnerId)
      .eq("user_role", "partner")
      .single()

    if (profileError) {
      if (profileError.code === "PGRST116") {
        return NextResponse.json({ error: "Not found", message: "Partner not found" }, { status: 404 })
      }

      return NextResponse.json({ error: profileError.message, message: "Failed to retrieve partner" }, { status: 500 })
    }

    // Get partner business information
    const { data: partnerDetails, error: detailsError } = await supabase
      .from("partners")
      .select("*")
      .eq("user_id", partnerId)
      .single()

    if (detailsError && detailsError.code !== "PGRST116") {
      return NextResponse.json(
        { error: detailsError.message, message: "Failed to retrieve partner details" },
        { status: 500 },
      )
    }

    // Combine partner profile with business details
    const partner = {
      ...partnerProfile,
      partnerName: partnerDetails?.partner_name,
      partnerDocument: partnerDetails?.partner_document,
      partnerAddress: partnerDetails?.address,
    }

    return NextResponse.json({ partner })
  } catch (error) {
    console.error("Error retrieving partner:", error)
    return NextResponse.json(
      { error: "Internal server error", message: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}

/**
 * @swagger
 * /api/partners/{id}:
 *   put:
 *     summary: Update partner
 *     description: Updates a partner's information
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
 *             $ref: '#/components/schemas/PartnerUpdate'
 *     responses:
 *       200:
 *         description: Partner updated successfully
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
 *                   example: Partner updated successfully
 *                 partner:
 *                   $ref: '#/components/schemas/Partner'
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
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()
    const partnerId = params.id
    const data = await request.json()

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized", message: "Authentication required" }, { status: 401 })
    }

    // Check if user is updating their own profile or is an admin
    const isOwnProfile = session.user.id === partnerId

    if (!isOwnProfile) {
      // Check if user is admin
      const { data: profile } = await supabase.from("profiles").select("user_role").eq("id", session.user.id).single()

      if (profile?.user_role !== "admin") {
        return NextResponse.json(
          { error: "Forbidden", message: "You can only update your own profile" },
          { status: 403 },
        )
      }
    }

    // Update partner profile
    const { data: updatedProfile, error: profileError } = await supabase
      .from("profiles")
      .update({
        name: data.name,
        birth_date: data.birthDate,
        phone: data.phone,
        document: data.document,
        file_url: data.fileUrl,
        file_key: data.fileKey,
        gender: data.gender,
        updated_at: new Date().toISOString(),
      })
      .eq("id", partnerId)
      .select()
      .single()

    if (profileError) {
      if (profileError.code === "PGRST116") {
        return NextResponse.json({ error: "Not found", message: "Partner not found" }, { status: 404 })
      }

      return NextResponse.json({ error: profileError.message, message: "Failed to update partner" }, { status: 500 })
    }

    // Update partner business information
    if (data.partnerName || data.partnerDocument || data.partnerAddress) {
      const updateData: any = {}

      if (data.partnerName) updateData.partner_name = data.partnerName
      if (data.partnerDocument) updateData.partner_document = data.partnerDocument
      if (data.partnerAddress) updateData.address = data.partnerAddress

      const { error: detailsError } = await supabase.from("partners").update(updateData).eq("user_id", partnerId)

      if (detailsError) {
        return NextResponse.json(
          { error: detailsError.message, message: "Failed to update partner details" },
          { status: 500 },
        )
      }
    }

    // Get updated partner details
    const { data: partnerDetails } = await supabase.from("partners").select("*").eq("user_id", partnerId).single()

    // Combine partner profile with business details
    const partner = {
      ...updatedProfile,
      partnerName: partnerDetails?.partner_name,
      partnerDocument: partnerDetails?.partner_document,
      partnerAddress: partnerDetails?.address,
    }

    return NextResponse.json({
      success: true,
      message: "Partner updated successfully",
      partner,
    })
  } catch (error) {
    console.error("Error updating partner:", error)
    return NextResponse.json(
      { error: "Internal server error", message: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}

/**
 * @swagger
 * /api/partners/{id}:
 *   delete:
 *     summary: Delete partner
 *     description: Deletes a partner account (requires admin privileges)
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
 *     responses:
 *       200:
 *         description: Partner deleted successfully
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
 *                   example: Partner deleted successfully
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
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()
    const partnerId = params.id

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

    // Delete partner business information first (foreign key constraint)
    await supabase.from("partners").delete().eq("user_id", partnerId)

    // Delete partner from auth
    const { error: authError } = await supabase.auth.admin.deleteUser(partnerId)

    if (authError) {
      return NextResponse.json(
        { error: authError.message, message: "Failed to delete partner account" },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Partner deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting partner:", error)
    return NextResponse.json(
      { error: "Internal server error", message: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}
