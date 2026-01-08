'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()  

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined" || !(window.gtag)) return;

  const query = searchParams.toString();
  const url = pathname + (query ? `?${query}` : "");

    window.gtag('config', GA_ID, {
      page_path: url,
    })
  }, [pathname, searchParams])

  return null
}
