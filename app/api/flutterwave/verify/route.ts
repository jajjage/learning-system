import { NextResponse } from "next/server"
import Flutterwave from "flutterwave-node-v3"

// Define types for better type safety
type FlutterwaveResponse = {
  status: "success" | "error"
  message: string
  data: {
    id: number
    tx_ref: string
    amount: number
    currency: string
    status: "successful" | "failed" | "pending"
    payment_type: string
    created_at: string
    customer: {
      email: string
      phone_number: string
      name: string
    }
  }
}

// Initialize Flutterwave with proper error handling
const initializeFlutterwave = () => {
  const publicKey = process.env.FLW_PUBLIC_KEY
  const secretKey = process.env.FLW_SECRET_KEY

  if (!publicKey || !secretKey) {
    throw new Error("Missing Flutterwave API keys")
  }

  return new Flutterwave(publicKey, secretKey)
}

export async function GET(req: Request) {
  try {
    // Initialize Flutterwave
    const flw = initializeFlutterwave()

    // Parse query parameters
    const url = new URL(req.url)
    const tx_ref = url.searchParams.get("tx_ref")
    const transaction_id = url.searchParams.get("transaction_id")
    const amount = url.searchParams.get("amount")

    // Validate required parameters
    if (!tx_ref || !transaction_id) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing required parameters: tx_ref or transaction_id",
        },
        { status: 400 },
      )
    }

    // Validate and parse amount
    const parsedAmount = amount ? parseFloat(amount) : null
    if (!parsedAmount || isNaN(parsedAmount)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid amount provided",
        },
        { status: 400 },
      )
    }

    // Verify transaction
    const response = (await flw.Transaction.verify({
      id: transaction_id,
    })) as FlutterwaveResponse

    // Validate response
    if (!response.data) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid response from Flutterwave",
        },
        { status: 500 },
      )
    }

    // Check transaction status and details
    const isValid =
      response.data.status === "successful" &&
      response.data.amount === parsedAmount &&
      response.data.currency === "NGN" &&
      response.data.tx_ref === tx_ref

    if (isValid) {
      return NextResponse.json({
        status: "success",
        message: "Payment verified successfully",
        data: {
          transactionId: response.data.id,
          amount: response.data.amount,
          currency: response.data.currency,
          paymentType: response.data.payment_type,
          customerEmail: response.data.customer.email,
          customerName: response.data.customer.name,
          createdAt: response.data.created_at,
        },
      })
    } else {
      // Determine specific failure reason
      const failureReason =
        response.data.status !== "successful"
          ? "Transaction was not successful"
          : response.data.amount !== parsedAmount
            ? "Amount mismatch"
            : response.data.currency !== "NGN"
              ? "Invalid currency"
              : response.data.tx_ref !== tx_ref
                ? "Transaction reference mismatch"
                : "Payment verification failed"

      return NextResponse.json(
        {
          status: "error",
          message: failureReason,
          data: {
            transactionStatus: response.data.status,
            expectedAmount: parsedAmount,
            receivedAmount: response.data.amount,
            currency: response.data.currency,
          },
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Payment verification error:", error)

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred"

    return NextResponse.json(
      {
        status: "error",
        message: "Payment verification failed",
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
