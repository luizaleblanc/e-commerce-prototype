import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

/**
 * @swagger
 * /api/rewards:
 *   get:
 *     summary: Get all rewards
 *     description: Retrieves a list of all available rewards
 *     tags:
 *       - Rewards
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter rewards by category
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of rewards to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of rewards to skip
 *     responses:
 *       200:
 *         description: List of rewards retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rewards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       category:
 *                         type: string
 *                       points:
 *                         type: integer
 *                       image:
 *                         type: string
 *                       stock:
 *                         type: integer
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
    const url = new URL(request.url)

    // Get query parameters
    const category = url.searchParams.get("category")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const offset = Number.parseInt(url.searchParams.get("offset") || "0")

    // Build query
    let query = supabase.from("rewards").select("*")

    // Apply filters
    if (category) {
      query = query.eq("category", category)
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    // Execute query
    const { data: rewards, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message, message: "Failed to retrieve rewards" }, { status: 500 })
    }

    return NextResponse.json({ rewards })
  } catch (error) {
    console.error("Error retrieving rewards:", error)
    return NextResponse.json(
      { error: "Internal server error", message: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}

/**
 * @swagger
 * /api/rewards:
 *   post:
 *     summary: Create a new reward
 *     description: Creates a new reward (requires admin privileges)
 *     tags:
 *       - Rewards
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Camiseta Oficial"
 *               category:
 *                 type: string
 *                 example: "Vestuário"
 *               points:
 *                 type: integer
 *                 example: 1500
 *               image:
 *                 type: string
 *                 example: "/ilb-camiseta1.png"
 *               stock:
 *                 type: integer
 *                 example: 50
 *               description:
 *                 type: string
 *                 example: "Camiseta oficial do Clube de Recompensas"
 *             required:
 *               - name
 *               - category
 *               - points
 *     responses:
 *       201:
 *         description: Reward created successfully
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
 *                   example: "Reward created successfully"
 *                 reward:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     category:
 *                       type: string
 *                     points:
 *                       type: integer
 *                     image:
 *                       type: string
 *                     stock:
 *                       type: integer
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
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const data = await request.json()

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized", message: "Authentication required" }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase.from("profiles").select("user_role").eq("id", session.user.id).single()

    if (profile?.user_role !== "admin" && profile?.user_role !== "partner") {
      return NextResponse.json({ error: "Forbidden", message: "Admin or partner privileges required" }, { status: 403 })
    }

    // Validate required fields
    if (!data.name || !data.category || !data.points) {
      return NextResponse.json(
        { error: "Missing required fields", message: "Name, category, and points are required" },
        { status: 400 },
      )
    }

    // Create reward
    const { data: reward, error } = await supabase
      .from("rewards")
      .insert({
        name: data.name,
        category: data.category,
        points: data.points,
        image: data.image,
        stock: data.stock || 0,
        description: data.description,
        created_at: new Date().toISOString(),
        created_by: session.user.id,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message, message: "Failed to create reward" }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Reward created successfully",
        reward,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating reward:", error)
    return NextResponse.json(
      { error: "Internal server error", message: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}
