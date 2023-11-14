import { Api } from '@/api/api'
import {
  CloseCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
  Select,
  Space,
  Typography,
  Upload,
} from 'antd'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const { Option } = Select

interface IProps {
  user: any
}

const FormUser = ({ user }: IProps) => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [dataUser, setDataUser] = useState<any>(null)

  const user_id = router.query.id

  const initData = () => {
    setLoading(true)

    Api.get(`users/${user_id}`, user?.token)
      .then((res: any) => {
        setDataUser(res.data)
        form.setFieldsValue(res.data)
      })
      .catch((err) => {
        console.log(err)
        setDataUser(false)
        message.error(err.message)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    initData()
  }, [])

  const onFinish = (values: any) => {
    setButtonLoading(true)
    console.log('Success:', values)
    Api.post(`users/${dataUser.id}?_method=put`, user?.token, null, values)
      .then((res: any) => {
        notification.success({ message: res.message })
        initData()
      })
      .catch((err) => {
        notification.error({ message: err.data.message })
      })
      .finally(() => setButtonLoading(false))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card>
      {loading ? (
        <div className="text-center my-5">
          <LoadingOutlined style={{ fontSize: '2.5rem' }} />
          <h3>Loading..</h3>
        </div>
      ) : (
        <>
          {dataUser === false ? (
            <div className="text-center my-5">
              <Typography.Title level={2} type={'danger'}>
                <CloseCircleOutlined style={{ fontSize: '5rem' }} />

                <span style={{ display: 'block', marginTop: '0.565rem' }}>
                  User not found
                </span>
              </Typography.Title>
              <br />
              <Link href={`/users`}>
                <Button size="middle">BACK</Button>
              </Link>
            </div>
          ) : (
            <>
              <Typography.Title level={4} className="m-0">
                Edit Data User : {dataUser?.full_name}
              </Typography.Title>
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
                      name="address"
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
                      name="nric"
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
                    <Form.Item label="Status verified" name="is_verified">
                      {/* <Input readOnly /> */}
                      <Select placeholder="Select status">
                        <Select.Option value={true}>Verified</Select.Option>
                        <Select.Option value={false}>
                          Not Verified
                        </Select.Option>
                      </Select>
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
                    <Form.Item
                      label="Proof of address"
                      valuePropName="proof_address"
                    >
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
                    <Form.Item label="How you know us" name="how_you_know">
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Status" name="status">
                      <Select placeholder="Select status" allowClear>
                        <Option value="new">New</Option>
                        <Option value="reviewing">
                          Waiting to be Reviewed
                        </Option>
                        <Option value="approved">Approved</Option>
                        <Option value="rejected">Rejected</Option>
                        <Option value="blacklisted">Blacklisted</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  {/* <Col span={12}>
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
                </Col> */}
                </Row>
                <Divider orientation="left" dashed />

                <Row>
                  <Col span={12}>
                    <Space>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '185px' }}
                        loading={buttonLoading}
                      >
                        Submit
                      </Button>
                      <Button onClick={initData}>Reset</Button>
                    </Space>
                  </Col>
                </Row>
              </Form>
            </>
          )}
        </>
      )}
    </Card>
  )
}

export default FormUser

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return {
    props: {
      user: user,
    },
  }
}
