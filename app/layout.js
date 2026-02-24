import "./globals.css"

export const metadata = {
  title: "Real Estate Yield Analyzer",
  description: "Institutional Real Estate Underwriting Tool"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
