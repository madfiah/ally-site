import { DownloadOutlined } from '@ant-design/icons'
import { Button, Card, InputNumber, Modal, Space, Table, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: React.Key
  name: string
  bic_code: string
  account_name: string
  account_number: string
  email: string
  payout_1: number
  payout_2: number
  payout_3: number
  payout_4: number
  payout_5: number
  payout_6: number
  payout_7: number
  payout_8: number
}

const InvestmentReport = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Fatin Nadiah Binte Masud',
      bic_code: 'DBSSSGSGXXX',
      account_name: 'Fatin Nadiah Masud',
      account_number: '0489045764',
      email: 'fatinnadiah@gmail.com',
      payout_1: '26850.00',
      payout_2: '26850.00',
      payout_3: '0',
      payout_4: '0',
      payout_5: '0',
      payout_6: '0',
      payout_7: '0',
      payout_8: '0',
    },
    {
      key: '2',
      name: 'AHMED GUIDOUCHE',
      bic_code: 'TRWIGB2L',
      account_name: 'Ahmed GUIDOUCHE',
      account_number: '76357476',
      email: 'guidahmed@gmail.com',
      payout_1: '547.74',
      payout_2: '547.74',
      payout_3: '0',
      payout_4: '0',
      payout_5: '0',
      payout_6: '0',
      payout_7: '0',
      payout_8: '0',
    },
    {
      key: '2',
      name: 'AHMED GUIDOUCHE',
      bic_code: 'TRWIGB2L',
      account_name: 'Ahmed GUIDOUCHE',
      account_number: '76357476',
      email: 'guidahmed@gmail.com',
      payout_1: '1074.00',
      payout_2: '1074.00',
      payout_3: '0',
      payout_4: '0',
      payout_5: '0',
      payout_6: '0',
      payout_7: '0',
      payout_8: '0',
    },
  ]

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      width: '70px',
      render: (key: any, data: any, idx: number) => {
        return <>{idx + 1}</>
      },
    },
    {
      title: 'Investor',
      dataIndex: 'name',
      key: 'name',
      width: '200px',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '200px',
    },
    {
      title: 'BIC Code',
      dataIndex: 'bic_code',
      key: 'bic_code',
      width: '150px',
    },
    {
      title: 'Account Name',
      dataIndex: 'account_name',
      key: 'account_name',
      width: '200px',
    },
    {
      title: 'Account Number',
      dataIndex: 'account_number',
      key: 'account_number',
      width: '150px',
    },
    {
      title: 'Payout 1',
      dataIndex: 'payout_1',
      key: 'payout_1',
      width: '130px',
      render: (payout_1: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={payout_1}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      ),
    },
    {
      title: 'Payout 2',
      dataIndex: 'payout_2',
      key: 'payout_2',
      width: '130px',
      render: (payout_2: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={payout_2}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      ),
    },
    {
      title: 'Payout 3',
      dataIndex: 'payout_3',
      key: 'payout_3',
      width: '130px',
      render: (payout_3: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={payout_3}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      ),
    },
    {
      title: 'Payout 4',
      dataIndex: 'payout_4',
      key: 'payout_4',
      width: '130px',
      render: (payout_4: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={payout_4}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      ),
    },
    {
      title: 'Payout 5',
      dataIndex: 'payout_5',
      key: 'payout_5',
      width: '130px',
      render: (payout_5: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={payout_5}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      ),
    },
    {
      title: 'Payout 6',
      dataIndex: 'payout_6',
      key: 'payout_6',
      width: '130px',
      render: (payout_6: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={payout_6}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      ),
    },
    {
      title: 'Payout 7',
      dataIndex: 'payout_7',
      key: 'payout_7',
      width: '130px',
      render: (payout_7: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={payout_7}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      ),
    },
    {
      title: 'Payout 8',
      dataIndex: 'payout_8',
      key: 'payout_8',
      width: '130px',
      render: (payout_8: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={payout_8}
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
    <Card
      title="Payout Report : Worldtrans Indopersada (40)"
      extra={
        <Button size="small" icon={<DownloadOutlined />}>
          Export to Excel
        </Button>
      }
    >
      <Table dataSource={dataSource} columns={columns} scroll={{ x: 800 }} />
    </Card>
  )
}

export default InvestmentReport
