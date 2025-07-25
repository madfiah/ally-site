import React from 'react'
import { Layout, theme } from 'antd'
import Head from 'next/head'

const { Content, Footer } = Layout

type LayoutProps = {
  children: React.ReactNode
  session: any
  themeMode: any
  onChangeMode: any
}

const AppLayout = ({ children, onChangeMode }: LayoutProps) => {
  const {
    token: { colorBgLayout },
  } = theme.useToken()

  return (
    <>
      <Head>
        <title>Arlie Web Solution</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout style={{ minHeight: '100vh', background: colorBgLayout }}>
        <Content style={{ margin: '0 16px', background: colorBgLayout }}>
          <div
            style={{
              padding: '0px',
              marginTop: 16,
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          &copy; Arlie &#183; {new Date().getFullYear()} <br />{' '}
          {`Developed by Rams`}
        </Footer>
      </Layout>
    </>
  )
}

export default AppLayout
