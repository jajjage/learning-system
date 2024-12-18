// utils/handlePayment.ts
export const handlePayment = async ({
  tx_ref,
  amount,
  currency,
  redirect_url,
  customer,
}: {
  tx_ref: string
  amount: number | undefined
  currency: string
  redirect_url: string
  customer: { name: string; email: string }
}) => {
  const payload = { tx_ref, amount, currency, redirect_url, customer }

  try {
    const response = await fetch("/api/flutterwave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error("Failed to create payment link")
    }

    const data = await response.json()
    console.log("Payment link:", data.data.link)

    // Redirect user to the payment page
    window.location.href = data.data.link
  } catch (error) {
    console.error("Error:", error)
  }
}
