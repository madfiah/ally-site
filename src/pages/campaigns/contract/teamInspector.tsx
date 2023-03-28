import { Button, Col, Divider, Form, Row, Select, Space } from 'antd'

const TeamInspector = () => {
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const bdTeams = [
    {
      id: 1,
      name: 'Dede Iskandar',
      email: 'dede@kapitalboost.co.id',
    },
  ]

  const analystTeams = [
    {
      id: 12,
      name: 'Achmad Sopfian',
      email: 'sopfian@kapitalboost.co.id',
    },
  ]

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Divider orientation="left" dashed>
        {`Select BD & Analyst`}
      </Divider>

      <Row gutter={[30, 0]}>
        <Col span={12}>
          <Form.Item
            label="Select Bussines Development"
            name="bd"
            rules={[{ required: true, message: 'Please select BD' }]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'jack',
                  label: 'Jack (jack@mail.com)',
                },
                {
                  value: 'lucy',
                  label: 'Lucy (lucky@mail.com)',
                },
                {
                  value: 'tom',
                  label: 'Tom (tom@mail.com)',
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Select Analyst"
            name="analyst"
            rules={[{ required: true, message: 'Please select Analyst' }]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'jack',
                  label: 'Jack (jack@mail.com)',
                },
                {
                  value: 'lucy',
                  label: 'Lucy (lucky@mail.com)',
                },
                {
                  value: 'tom',
                  label: 'Tom (tom@mail.com)',
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" dashed />

      <Space size={20}>
        <Button type="primary" style={{ width: 150 }}>
          Save
        </Button>
        <Button>Reset</Button>
      </Space>
    </Form>
  )
}

export default TeamInspector
