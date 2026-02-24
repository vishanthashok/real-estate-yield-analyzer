export async function GET() {
  const apiKey = process.env.NEWS_API_KEY

  const url = `https://newsapi.org/v2/everything?q=real%20estate%20OR%20housing%20market%20OR%20commercial%20real%20estate&language=en&pageSize=5&sortBy=publishedAt&apiKey=${apiKey}`

  const res = await fetch(url, { next: { revalidate: 3600 } })
  const data = await res.json()

  return Response.json({ articles: data.articles })
}
