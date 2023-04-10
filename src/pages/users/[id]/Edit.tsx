import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
} from 'antd'

const { Option } = Select

const FormUser = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card>
      <h3 className="m-0" style={{ fontWeight: 'normal' }}>
        Data User Ahmad Ramli
      </h3>

      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="mt-2"
      >
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="First name"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: 'Please input the user first name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last name"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: 'Please input the user last name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input the user email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone No."
              name="phone_no"
              rules={[
                {
                  required: true,
                  message: 'Please input the user phone no!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: 'Please input the user country!',
                },
              ]}
            >
              <Select placeholder="Select country" allowClear>
                <Option value="INDONESIA">INDONESIA</Option>
                <Option value="SINGAPORE">SINGAPORE</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[
                {
                  required: true,
                  message: 'Please input the user nationality!',
                },
              ]}
            >
              <Select placeholder="Select country" allowClear>
                <Option value="INDONESIA">INDONESIA</Option>
                <Option value="SINGAPORE">SINGAPORE</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Residential Address"
              name="residential"
              rules={[
                {
                  required: true,
                  message: 'Please input the user residential!',
                },
              ]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left" dashed>
          Card Identity
        </Divider>

        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="IC Type"
              name="ic_type"
              rules={[
                {
                  required: true,
                  message: 'Please input the user ic type!',
                },
              ]}
            >
              <Select placeholder="Select ic type" allowClear>
                <Option value="Identity Card">Identity Card</Option>
                <Option value="FIN">FIN</Option>
                <Option value="Passport">Passport</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="IC Country"
              name="ic_country"
              rules={[
                {
                  required: true,
                  message: 'Please input the user ic country!',
                },
              ]}
            >
              <Select placeholder="Select country" allowClear>
                <Option value="INDONESIA">INDONESIA</Option>
                <Option value="SINGAPORE">SINGAPORE</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Full name in IC"
              name="ic_name"
              rules={[
                {
                  required: true,
                  message: 'Please input the user ic name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Number NRIC / Passport"
              name="ic_number"
              rules={[
                {
                  required: true,
                  message: 'Please input the user ic number!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Status verified" name="status_verified">
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item
              label="ID Card/Passport (front)"
              valuePropName="id_card_front"
            >
              <Upload listType="picture-card" maxCount={1}>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="ID Card/Passport (back)"
              valuePropName="id_card_back"
            >
              <Upload listType="picture-card" maxCount={1}>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Proof of address" valuePropName="proof_address">
              <Upload listType="picture-card" maxCount={1}>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left" dashed>
          Other
        </Divider>

        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="How you know us" name="how_you_know_us">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Status" name="status">
              <Select placeholder="Select status" allowClear>
                <Option value="New">New</Option>
                <Option value="Waiting to be Reviewed">
                  Waiting to be Reviewed
                </Option>
                <Option value="Approved">Approved</Option>
                <Option value="Rejected">Rejected</Option>
                <Option value="Blacklisted">Blacklisted</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Reset Password Link" name="reset_password_link">
              <Select placeholder="Select" allowClear>
                <Option value="Reset Password">Reset Password</Option>
                <Option value="Verification">Verification</Option>
                <Option value="Forgot Password">Forgot Password</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Reset Password Link (Web Migration, Uneditable)"
              name="preview_link"
            >
              <Input.TextArea readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left" dashed />

        <Row>
          <Col span={12}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '185px' }}
              >
                Submit
              </Button>
              <Button>Reset</Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default FormUser
