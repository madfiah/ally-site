import { Api } from '@/api/api'
import { LoadingOutlined, WarningOutlined } from '@ant-design/icons'
import {
  Col,
  Row,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Alert,
  notification,
  Card,
  Checkbox,
  message,
} from 'antd'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Props {
  without_layout: boolean
}

type FieldType = {
  password?: string
  password_confirmation?: string
}

const Forget = ({ without_layout }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [diclined, setDiclined] = useState(false)

  const token = router.query.token

  const checkToken = () => {
    setLoading(true)

    Api.post(`auth/validation-reset-password/${token}`, null)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        setDiclined(true)
        message.error({
          content:
            'Ops, Your request cannot be continued, please request again',
        })

        setTimeout(() => {
          router.push('/login')
        }, 3500)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    checkToken()
  }, [])

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Row
      justify={`center`}
      style={{ height: '100vh' }}
      align="middle"
      className=""
    >
      <Col span={8}>
        <Card>
          {loading ? (
            <>
              <div className="text-center my-5">
                <LoadingOutlined style={{ fontSize: '2.5rem' }} />
                <h3>Please wait..</h3>
              </div>
            </>
          ) : (
            <>
              {diclined ? (
                <>
                  <div className="text-center my-5">
                    <WarningOutlined
                      style={{ fontSize: '2.5rem' }}
                      color={'red'}
                    />
                    <h2>Request not valid</h2>
                    <h4>
                      Your request cannot be continued, please request again
                    </h4>
                  </div>
                </>
              ) : (
                <>
                  <center>
                    <h2>Reset your password</h2>
                  </center>

                  <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                  >
                    <Form.Item<FieldType>
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Password Confirmation"
                      name="password_confirmation"
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve()
                            }
                            return Promise.reject(
                              new Error(
                                'The new password that you entered do not match!'
                              )
                            )
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              )}
            </>
          )}
        </Card>
      </Col>
    </Row>
  )
}

export default Forget

export const getServerSideProps = async () => {
  return {
    props: {
      without_layout: true,
    },
  }
}
