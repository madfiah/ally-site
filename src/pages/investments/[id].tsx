import React, { useEffect, useState } from 'react'
import { Api } from '@/api/api'
import { getSession } from 'next-auth/react'
import { Card, message, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import DetailInvestment from './components/DetailInvestment'
import InvestmentPayouts from './components/InvestmentPayouts'
import { useRouter } from 'next/router'

interface IProps {
  user: any
}

const Detail = ({ user }: IProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [dataInvestment, setDataInvestment] = useState<any>(null)

  const id = router.query.id

  const init = () => {
    setLoading(true)

    Api.get(`investments/${id}`, user?.token)
      .then((res: any) => {
        setDataInvestment(res.data)
      })
      .catch((err) => {
        message.error(err.data.message)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Card>
      <Tabs
        tabPosition={'right'}
        items={[
          {
            label: `Detail`,
            key: '1',
            children: (
              <DetailInvestment
                investment={dataInvestment}
                token={user?.token}
              />
            ),
          },
          {
            label: `Payouts`,
            key: '2',
            children: <InvestmentPayouts />,
          },
        ]}
      />
    </Card>
  )
}

export default Detail

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return {
    props: {
      user: user,
    },
  }
}
