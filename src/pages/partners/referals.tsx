import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, InputNumber, Space, Table, Tooltip } from 'antd'

interface DataType {
  key: React.Key
  investor: string
  vendor: string
  description: string
}

const Referals = () => {
  const dataSource = [
    {
      key: '1',
      referer_name: 'Fithriyyah Konzan',
      referer_email: 'fithriyyah.konzan@gmail.com',
      referal_name: 'Faria R Ahmed',
      referal_email: 'faria.r.a@hotmail.com',
      amount: 5199.87,
      campaign_name: 'Worldtrans Indopersada (35)',
      reward_referer: 20.0,
      reward_referal: 20.77,
    },
    {
      key: '2',
      referer_name: 'Muhammed Arshad Nazeerdeen',
      referer_email: 'arshad.cres@gmail.com',
      referal_name: 'KESETTY VAMSHI KRISHNA',
      referal_email: 'vamshi.kesetty@gmail.com',
      amount: 300,
      campaign_name: 'Ciremai Putera Mandiri (11)',
      reward_referer: 20.0,
      reward_referal: 20.0,
    },
  ]

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      render: (key: any, data: any, idx: number) => {
        return <>{idx + 1}</>
      },
    },
    {
      title: 'Referer name',
      dataIndex: 'referer_name',
      key: 'referer_name',
    },
    {
      title: 'Referer email',
      dataIndex: 'referer_email',
      key: 'referer_email',
    },
    {
      title: 'Referal name',
      dataIndex: 'referal_name',
      key: 'referal_name',
    },
    {
      title: 'Referal email',
      dataIndex: 'referal_email',
      key: 'referal_email',
    },
    {
      title: 'Invest amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <InputNumber
          style={{ width: '135px' }}
          defaultValue={amount}
          precision={2}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      ),
    },
    {
      title: 'Campaign name',
      dataIndex: 'campaign_name',
      key: 'campaign_name',
    },
    {
      title: 'Reward for referal',
      dataIndex: 'reward_referal',
      key: 'reward_referal',
      render: (reward_referal: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={reward_referal}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      ),
    },
    {
      title: 'Reward for referer',
      dataIndex: 'reward_referer',
      key: 'reward_referer',
      render: (reward_referer: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={reward_referer}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      ),
    },
  ]

  return (
    <Card>
      <Space className="space-between mb-1">
        <h3 className="m-0 fw-300">Referals</h3>
      </Space>

      <Table dataSource={dataSource} columns={columns} className={'mt-1'} />
    </Card>
  )
}

export default Referals
