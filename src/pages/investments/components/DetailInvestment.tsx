import { Api } from '@/api/api'
import {
  CheckOutlined,
  SaveFilled,
  SaveOutlined,
  SendOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
  Select,
  Typography,
} from 'antd'
import Link from 'next/link'
import { useState } from 'react'

interface IProps {
  investment: any
  token: string
}

const DetailInvestment = ({ investment, token }: IProps) => {
  const [submitLoading, setSubmitLoading] = useState(false)

  const onSubmit = (values: any) => {
    setSubmitLoading(true)

    Api.post(`investment/${investment?.id}`, token, null, values)
      .then((res: any) => {
        notification.success({ message: 'success to update payment data' })
      })
      .catch((err) => {
        message.error({
          content: 'Failed to update data, please check your input',
        })
      })
      .finally(() => setSubmitLoading(false))
  }

  return (
    <div>
      <Typography.Title level={4} className="m-0">
        Investment Detail of {investment?.campaign_name}
      </Typography.Title>
      <br />
      <Form layout={'vertical'}>
        <Row gutter={15}>
          <Col span={12}>
            <Form.Item label="Investor Full Name">
              <Input value={investment?.user_name} readOnly />
            </Form.Item>
            <Form.Item label="Investor Email Address">
              <Input value={investment?.user.email} readOnly />
            </Form.Item>
            <Form.Item label="Investor Country">
              <Input value={investment?.user.country} readOnly />
            </Form.Item>
            <Form.Item label="Investment Date">
              <Input value={investment?.created_at} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Campaign Name">
              <Input value={investment?.campaign_name} readOnly />
            </Form.Item>
            <Form.Item label="Project Type">
              <Input value={investment?.campaign.type} readOnly />
            </Form.Item>
            <Form.Item label="Total Funding">
              <Input value={investment?.amount} readOnly />
            </Form.Item>
            <Form.Item label="Expected Payout">
              <Input value={investment?.payout} readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Divider plain>
        <b>Payment Detail of Dummy Campaign</b>
      </Divider>

      <Row gutter={25} justify="center" align={'middle'}>
        <Col span={12}>
          <Form layout={'vertical'}>
            <Form.Item label="Payment Type">
              <Select
                placeholder="Please select type"
                value={investment?.payment_method}
              >
                <Select.Option value="bank-transfer">
                  Bank Transfer
                </Select.Option>
                <Select.Option value="kb-wallet">KB Wallet</Select.Option>
                <Select.Option value="paypal" disabled>
                  Paypal
                </Select.Option>
                <Select.Option value="xfers" disabled>
                  Xfers
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Bank Name">
              <Input
                placeholder="Bank name"
                value={investment?.bank_name}
                disabled={investment?.payment_method !== 'bank-transfer'}
              />
            </Form.Item>
            <Form.Item label="Account Name">
              <Input
                placeholder="Account name"
                value={investment?.bank_account}
                disabled={investment?.payment_method !== 'bank-transfer'}
              />
            </Form.Item>
            <Form.Item label="Account Number">
              <Input
                placeholder="Account number"
                value={investment?.bank_number}
                disabled={investment?.payment_method !== 'bank-transfer'}
              />
            </Form.Item>
            <Form.Item label="Status Payment">
              <Select
                placeholder="Please select status payment"
                value={investment?.is_paid.toString()}
              >
                <Select.Option value="1">Paid</Select.Option>
                <Select.Option value="2">Pending Approval</Select.Option>
                <Select.Option value="0">Unpaid</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<SendOutlined />}
                disabled={investment?.is_paid === 1}
              >
                Update Payment Status
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          {investment?.bank_proof ? (
            <div className="text-center">
              <Link target={`_blank`} href={investment?.bank_proof}>
                <img
                  src={investment?.bank_proof}
                  style={{ maxHeight: '450px' }}
                />
              </Link>
            </div>
          ) : (
            <img
              src="https://dummyimage.com/600x400/8c8c8c/fff&text=File+not+found"
              width={`100%`}
            />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default DetailInvestment
