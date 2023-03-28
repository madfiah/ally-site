import { Button, Card, Col, Divider, Form, Input, Row, Space } from 'antd'

const CampaignContractForm = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{
        contract_no: '01/0223',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Divider orientation="left" dashed>
        Automatically Generated
      </Divider>

      <Row gutter={[20, 0]}>
        <Col span={8}>
          <Form.Item label="Contract Number" name="contract_no">
            <Input readOnly />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Current Funding Amount"
            name="current_funding_amount"
          >
            <Input readOnly />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Wakalah Fee (Kapital Boost)" name="wakalah_fee">
            <Input readOnly />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Wakalah Fee (Investor)" name="return">
            <Input readOnly />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Total Payout" name="total_payout">
            <Input readOnly />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Total Payout (IDR)" name="total_payout_idr">
            <Input readOnly />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" dashed>
        Company Information
      </Divider>

      <Row gutter={[30, 0]}>
        <Col span={12}>
          <Form.Item label="Company Name" name="company_name">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[30, 0]}>
        <Col span={12}>
          <Form.Item label="Email 1" name="email_1">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email 2" name="email_2">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Signee 1" name="signee_1">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Signee 2" name="signee_2">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="ID Number 1" name="id_number_1">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="ID Number 2" name="id_number_2">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Customer Name (English)" name="customer_name">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Customer Name (Bahasa)" name="customer_name_id">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Admin Fee (%)" name="admin_fee">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Admin Fee (%)" name="admin_fee">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Exchange Rate" name="exchange_rate">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Variable Funding" name="variable_funding">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Alamat Perusahaan" name="company_address">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Bilyet Giro Information (Bahasa)"
            name="bilyet_giro"
          >
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Syarat 1" name="syarat_1">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Syarat 2" name="syarat_2">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="UKM Phone Number" name="ukm_phone_number">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Other Requirements" name="other_requirements">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" dashed>
        Asset Financing
      </Divider>

      <Row gutter={[30, 0]}>
        <Col span={12}>
          <Form.Item label="Asset to be purchased" name="asset_purchased">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Asset to be purchased ID" name="asset_purchased_id">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Campaign Country Currency"
            name="campaign_country_currency"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Purchase cost contribution date / Disburstment date"
            name="disburstment_date"
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" dashed>
        Invoice Financing
      </Divider>

      <Row gutter={[30, 0]}>
        <Col span={8}>
          <Form.Item label="Maturity Date" name="maturity_date">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Repayment Date" name="repayment_date">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Sub-Agency Fees (%)" name="agency_fees">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Receivable Amount as per invoice"
            name="receivable_amount"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Receivable Amount as per invoice (IDR)"
            name="receivable_amount_id"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Akta Number" name="akta_number">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Akta Number (ID)" name="akta_number_id">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Underlying Document" name="underlying_document">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Underlying Document (ID)"
            name="underlying_document_id"
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" dashed />

      <Row>
        <Col span={12}>
          <Space>
            <Button type="primary" htmlType="submit" style={{ width: '185px' }}>
              Submit
            </Button>
            <Button>Reset</Button>
          </Space>
        </Col>
      </Row>
    </Form>
  )
}

export default CampaignContractForm
