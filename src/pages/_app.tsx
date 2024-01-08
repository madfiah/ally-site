import KbLayout from '@/layout'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@/styles/global.scss'
import { useEffect } from 'react'

import React from 'react'
import { ConfigProvider } from 'antd'
import { Nunito } from '@next/font/google'

React.useLayoutEffect = React.useEffect

const nunito = Nunito({ subsets: ['latin'] })

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
    <ConfigProvider
      theme={{
        token: {
          fontFamily: nunito.style.fontFamily,
        },
      }}
    >
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
    </ConfigProvider>
  )
}
