import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

/**
 * @swagger
 * /api/partners:
 *   post:
 *     summary: Register a new partner
 *     description: Creates a new partner account with the provided information
 *     tags:
 *       - Partners
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PartnerRegistration'
 *     responses:
 *       201:
 *         description: Partner created successfully
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
 *                   example: Partner registered successfully
 *                 partner:
 *                   $ref: '#/components/schemas/Partner'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Conflict - email already exists
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
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.password || !data.partnerName || !data.partnerDocument) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          message: "Name, email, password, partner name and partner document are required",
        },
        { status: 400 },
      )
    }

    // Validate password match
    if (data.password !== data.confirmPassword) {
      return NextResponse.json(
        { error: "Password mismatch", message: "Password and confirmation do not match" },
        { status: 400 },
      )
    }

    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message, message: "Failed to create partner account" },
        { status: 500 },
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "Partner creation failed", message: "Failed to create partner account" },
        { status: 500 },
      )
    }

    // Create partner profile with additional information
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      email: data.email,
      name: data.name,
      birth_date: data.birthDate,
      phone: data.phone,
      document: data.document,
      file_url: data.fileUrl,
      file_key: data.fileKey,
      gender: data.gender,
      user_role: "partner", // Set role as partner
      created_at: new Date().toISOString(),
    })

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message, message: "Failed to create partner profile" },
        { status: 500 },
      )
    }

    // Create partner business information
    const { error: partnerError } = await supabase.from("partners").insert({
      user_id: authData.user.id,
      partner_name: data.partnerName,
      partner_document: data.partnerDocument,
      address: data.partnerAddress,
      created_at: new Date().toISOString(),
    })

    if (partnerError) {
      return NextResponse.json(
        { error: partnerError.message, message: "Failed to create partner business information" },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Partner registered successfully",
        partner: {
          id: authData.user.id,
          email: data.email,
          name: data.name,
          partnerName: data.partnerName,
          // Don't return sensitive information
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error registering partner:", error)
    return NextResponse.json(
      { error: "Internal server error", message: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}

/**
 * @swagger
 * /api/partners:
 *   get:
 *     summary: Get all partners
 *     description: Retrieves a list of all partners (requires admin privileges)
 *     tags:
 *       - Partners
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of partners retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 partners:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Partner'
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

    // Get all partners
    const { data: partners, error } = await supabase
      .from("profiles")
      .select("id, name, email, phone, created_at")
      .eq("user_role", "partner")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message, message: "Failed to retrieve partners" }, { status: 500 })
    }

    // Get partner business information
    const partnerIds = partners.map((partner) => partner.id)
    const { data: partnerDetails, error: detailsError } = await supabase
      .from("partners")
      .select("*")
      .in("user_id", partnerIds)

    if (detailsError) {
      return NextResponse.json(
        { error: detailsError.message, message: "Failed to retrieve partner details" },
        { status: 500 },
      )
    }

    // Combine partner profiles with business details
    const partnersWithDetails = partners.map((partner) => {
      const details = partnerDetails?.find((detail) => detail.user_id === partner.id) || {}
      return {
        ...partner,
        partnerName: details.partner_name,
        partnerDocument: details.partner_document,
        partnerAddress: details.address,
      }
    })

    return NextResponse.json({ partners: partnersWithDetails })
  } catch (error) {
    console.error("Error retrieving partners:", error)
    return NextResponse.json(
      { error: "Internal server error", message: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}
