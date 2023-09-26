import { Button, Card, Col, Divider, Form, Input, Row, Space, Tabs } from 'antd'
import ContractEditor from './contractEditor'
import CampaignContractForm from './contractForm'
import InvestmentReport from './investmentReport'
import TeamInspector from './teamInspector'

import { useRouter } from 'next/router'
import { Api } from '@/api/api'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Nunito } from '@next/font/google'
import { LoadingOutlined } from '@ant-design/icons'

const nunito = Nunito({ subsets: ['latin'] })

interface IProps {
  user: any
}

const CampaignContract = ({ user }: IProps) => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [campaign, setCampaign] = useState<any>(null)
  const [campaignContract, setCampaignContract] = useState<any>(null)

  const slug = router.query.slug

  const initData = () => {
    setLoading(true)

    Api.get(`campaign/contract/detail/${slug}`, user?.token)
      .then((res: any) => {
        console.log(res)
        setCampaign(res.data.campaign)
        setCampaignContract(res.data.contract)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    initData()
  }, [])

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card>
      <h3 className="m-0">
        Campaign Contract {campaign ? `- ${campaign.name}` : ''}
      </h3>
      <br />

      {loading ? (
        <div className="text-center my-5">
          <LoadingOutlined style={{ fontSize: '2.5rem' }} />
          <h3>Loading..</h3>
        </div>
      ) : (
        <Tabs
          defaultActiveKey="1"
          tabPosition="right"
          style={{ marginBottom: 32 }}
          items={[
            {
              label: `Contract Form`,
              key: 'form',
              children: (
                <CampaignContractForm contract={campaignContract} user={user} />
              ),
            },
            {
              label: `Contract Editor`,
              key: 'editor',
              children: (
                <ContractEditor
                  contract={campaignContract}
                  user={user}
                  slug={slug}
                />
              ),
            },
            {
              label: `UKM Contract`,
              key: 'ukm_contract',
              children: <TeamInspector user={user} slug={slug} />,
            },
            {
              label: `Investor Contract`,
              key: 'investor_contract',
              children: <InvestmentReport user={user} slug={slug} />,
            },
          ]}
        />
      )}
    </Card>
  )
}

export default CampaignContract

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return {
    props: {
      user: user,
    },
  }
}
