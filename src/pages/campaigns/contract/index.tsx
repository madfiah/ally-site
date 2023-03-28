import { Button, Card, Col, Divider, Form, Input, Row, Space, Tabs } from 'antd'
import ContractEditor from './contractEditor'
import CampaignContractForm from './contractForm'
import InvestmentReport from './investmentReport'
import TeamInspector from './teamInspector'

const CampaignContract = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card>
      <h3 className="m-0">Campaign Contract PT Kapital Boost</h3>
      <br />

      <Tabs
        defaultActiveKey="1"
        tabPosition="right"
        style={{ marginBottom: 32 }}
        items={[
          {
            label: `Contract Form`,
            key: 'form',
            children: <CampaignContractForm />,
          },
          {
            label: `Contract Editor`,
            key: 'editor',
            children: <ContractEditor />,
          },
          {
            label: `Investor`,
            key: 'investor',
            children: <InvestmentReport />,
          },
          {
            label: `BD/Analyst`,
            key: 'bd_analyst',
            children: <TeamInspector />,
          },
        ]}
      />
    </Card>
  )
}

export default CampaignContract
