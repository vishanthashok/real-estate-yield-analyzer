"use client"
import { useEffect, useState } from "react"

export default function NewsTicker() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch("/api/news")
      .then(res => res.json())
      .then(data => setArticles(data.articles || []))
  }, [])

  return (
    <div className="ticker">
      <div className="ticker-content">
        {articles.map((a, i) => (
          <a key={i} href={a.url} target="_blank">
            🏢 {a.title}
          </a>
        ))}
      </div>
    </div>
  )
}
