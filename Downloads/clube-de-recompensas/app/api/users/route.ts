import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided information
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User created successfully
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
 *                   example: User registered successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
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
    if (!data.name || !data.email || !data.password) {
      return NextResponse.json(
        { error: "Missing required fields", message: "Name, email and password are required" },
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
      return NextResponse.json({ error: authError.message, message: "Failed to create user account" }, { status: 500 })
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "User creation failed", message: "Failed to create user account" },
        { status: 500 },
      )
    }

    // Create user profile with additional information
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
      address: data.address,
      social_medias: data.socialMedias,
      user_role: "user",
      created_at: new Date().toISOString(),
    })

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message, message: "Failed to create user profile" },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: authData.user.id,
          email: data.email,
          name: data.name,
          // Don't return sensitive information
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json(
      { error: "Internal server error", message: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users (requires admin privileges)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
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

    // Check if user is admin (you would need to implement this check)
    const { data: profile } = await supabase.from("profiles").select("user_role").eq("id", session.user.id).single()

    if (profile?.user_role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admin privileges required" }, { status: 403 })
    }

    // Get all users
    const { data: users, error } = await supabase.from("profiles").select("*")

    if (error) {
      return NextResponse.json({ error: error.message, message: "Failed to retrieve users" }, { status: 500 })
    }

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error retrieving users:", error)
    return NextResponse.json(
      { error: "Internal server error", message: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}
