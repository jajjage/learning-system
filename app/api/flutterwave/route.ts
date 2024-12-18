import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      body,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message)
    return NextResponse.json(
      { message: "Error communicating with Flutterwave" },
      { status: error.response?.status || 500 },
    )
  }
}
