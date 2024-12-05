// "use server"
// import { NextResponse } from "next/server"

// export async function downloadFile(url: string, filename: string) {
//   try {
//     const response = await fetch(url)

//     if (!response.ok) {
//       throw new Error("Failed to fetch file")
//     }

//     const blob = await response.blob()
//     const buffer = Buffer.from(await blob.arrayBuffer())

//     // Create headers with content disposition
//     const headers = new Headers()
//     headers.set("Content-Disposition", `attachment; filename="${filename}"`)
//     headers.set(
//       "Content-Type",
//       response.headers.get("Content-Type") || "application/octet-stream",
//     )
//     headers.set("Content-Length", buffer.length.toString())

//     return new NextResponse(buffer, {
//       status: 200,
//       headers,
//     })
//   } catch (error) {
//     console.error("Download error:", error)
//     throw error
//   }
// }
