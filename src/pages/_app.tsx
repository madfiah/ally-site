import KbLayout from '@/layout'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@/styles/global.scss'
import { useEffect } from 'react'

import React from 'react'
React.useLayoutEffect = React.useEffect

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader')
      setTimeout(() => {
        if (loader) loader.remove()
      }, 1000)
    }
  }, [])

  return (
    <>
      <NextNProgress
        color="#0E64CB"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      {pageProps.without_layout ? (
        <Component {...pageProps} />
      ) : (
        <KbLayout session={session}>
          <Component {...pageProps} />
        </KbLayout>
      )}
    </>
  )
}
