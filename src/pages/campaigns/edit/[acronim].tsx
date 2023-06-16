import {
  LoadingOutlined,
  PlusOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { Nunito } from '@next/font/google'

import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  Upload,
  notification,
} from 'antd'
import CampaignGallery from '../components/galleries'
import PdfCampaign from '../components/pdf'
import { Editor } from '@tinymce/tinymce-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Api } from '@/api/api'
import { getSession } from 'next-auth/react'
import dayjs from 'dayjs'

import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(weekday)
dayjs.extend(localeData)

const nunito = Nunito({ subsets: ['latin'] })
const { Option } = Select

interface IProps {
  user: any
}

const NewCampaign = ({ user }: IProps) => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState({
    show: false,
    message: '',
  })
  const [campaign, setCampaign] = useState<any>({})

  const initData = (acronim: any) => {
    Api.get(`campaign/detail/${acronim}`, user.token)
      .then((res: any) => {
        console.log(res)
        const params = {
          ...res.data,
          release_datetime: res.data.release_datetime
            ? dayjs(res.data.release_datetime)
            : null,
          expiry_datetime: res.data.expiry_datetime
            ? dayjs(res.data.expiry_datetime)
            : null,
        }
        form.setFieldsValue(params)
      })
      .catch((err) => {
        console.log(err)
        setFetchError({
          show: true,
          message: err.data.message,
        })
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setLoading(true)
    // console.log(router.query.acronim)
    initData(router.query.acronim)
  }, [])

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleEditorChange = (content: any, editor: any) => {
    console.log('Content was updated:', content)
  }

  const FormCampaign = () => {
    return (
      <>
        {loading ? (
          <div className="text-center my-5">
            <LoadingOutlined style={{ fontSize: '2.5rem' }} />
            <h3>Loading..</h3>
          </div>
        ) : (
          <>
            {fetchError.show ? (
              <div className="text-center my-5">
                <WarningOutlined style={{ fontSize: '4rem' }} />
                <h4>{fetchError.message}</h4>
              </div>
            ) : (
              <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Divider orientation="left" dashed>
                  Company Information
                </Divider>

                <Row gutter={[20, 0]}>
                  <Col span={8}>
                    <Form.Item
                      label="Company Name"
                      name="company_name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter company name!',
                        },
                      ]}
                    >
                      <Input placeholder="Enter company name" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Country"
                      name="country"
                      rules={[
                        {
                          required: true,
                          message: 'Please select country',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select country"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="INDONESIA">INDONESIA</Option>
                        <Option value="SINGAPORE">SINGAPORE</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Industry"
                      name="industry"
                      rules={[
                        { required: true, message: 'Please enter industry!' },
                      ]}
                    >
                      <Input placeholder="Enter industry" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Company Director"
                      name="company_director"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the director!',
                        },
                      ]}
                    >
                      <Input placeholder="Enter the director" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Company Director's Email"
                      name="company_director_email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the director's email!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter the director's email" />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider orientation="left" dashed>
                  Campaign Details
                </Divider>

                <Row gutter={[20, 0]}>
                  <Col span={12}>
                    <Form.Item
                      label="Campaign Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter campaign name!',
                        },
                      ]}
                    >
                      <Input placeholder="Enter campaign name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Acronim"
                      name="acronim"
                      tooltip="Acronim is generated by system"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Project Type"
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: 'Please select project type!',
                        },
                      ]}
                    >
                      <Select placeholder="Select project type" allowClear>
                        <Option value="sme">SME Crowdfunding</Option>
                        <Option value="donation">Donation</Option>
                        <Option value="private">Private Crowdfunding</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="SME Sub Type"
                      name="sub_type"
                      rules={[
                        { required: true, message: 'Please select sub type!' },
                      ]}
                    >
                      <Select
                        placeholder="Select SME sub type"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="">-</Option>
                        <Option value="ASSET PURCHASE FINANCING">
                          ASSET PURCHASE FINANCING
                        </Option>
                        <Option value="INVOICE FINANCING">
                          INVOICE FINANCING
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Divider dashed />
                  <Col span={6}>
                    <Form.Item
                      label="Tenor"
                      name="return"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the tenor',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        defaultValue={0}
                        stringMode
                      />
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item
                      label="Project Return"
                      name="return"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter project return',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        defaultValue={0}
                        stringMode
                      />
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item
                      label="Risk"
                      name="risk"
                      rules={[
                        {
                          required: true,
                          message: 'Please select risk of campaign!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select risk of campaign"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="N/A">N/A</Option>
                        <Option value="A">A</Option>
                        <Option value="A-">A-</Option>
                        <Option value="B+">B+</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Minimum Investment Amount"
                      name="minimum_invest_amount"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the minimum invest amount',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        defaultValue={200}
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item
                      label="Total Funding Amount"
                      name="total_invest_amount"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter funding amount',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        defaultValue={100000}
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item label="Funded" name="funded">
                      <InputNumber
                        style={{ width: '100%' }}
                        defaultValue={0}
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={`Release Date & Time`}
                      name="release_datetime"
                    >
                      <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={`Close Date & Time`}
                      name="expiry_datetime"
                    >
                      <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Status"
                      name="is_enable"
                      rules={[
                        {
                          required: true,
                          message: 'Please select campaign status!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select campaign status"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="true">Online</Option>
                        <Option value="false">Offline</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Email Payout Reminder"
                      name="send_payout_reminder"
                      rules={[
                        {
                          required: true,
                          message: 'Please select status payout reminder!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select status payout reminder"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="true">Active</Option>
                        <Option value="false">Disable</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Email Requirements"
                      name="email_requirement"
                      rules={[
                        {
                          required: true,
                          message: 'Please select status email requirement!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select status email requirement"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="true">Active</Option>
                        <Option value="false">Disable</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={`Snippet`} name="snippet">
                      <Input.TextArea rows={5} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Upload Logo" valuePropName="fileList">
                      <Upload listType="picture-circle" maxCount={1}>
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Upload Cover" valuePropName="fileList">
                      <Upload listType="picture-card" maxCount={1}>
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="mt-1 mb-1">
                  <Col span={24}>
                    <Editor
                      onChange={(e, d) => console.log(e.target.value, d)}
                      initialValue="<p>This is the initial content of the editor.</p>"
                      init={{
                        height: 500,
                        width: '100%',
                        plugins: [
                          'advlist',
                          'autolink',
                          'lists',
                          'link',
                          'image',
                          'charmap',
                          'preview',
                          'anchor',
                          'searchreplace',
                          'visualblocks',
                          'code',
                          'fullscreen',
                          'insertdatetime',
                          'media',
                          'table',
                          'code',
                          'help',
                          'wordcount',
                        ],
                        toolbar:
                          'undo redo | blocks | ' +
                          'bold italic forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style:
                          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      }}
                      onEditorChange={handleEditorChange}
                    />
                  </Col>
                </Row>

                <Divider orientation="left" dashed>
                  Related Campaigns
                </Divider>

                <Row className="mt-1" gutter={20}>
                  <Col span={8}>
                    <Form.Item
                      label="Campaign 1"
                      name="related_campaign_1"
                      rules={[
                        {
                          required: true,
                          message: 'Please select campaign!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select campaign"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="true">Produsen Butik 1</Option>
                        <Option value="false">Laskar Pelangi 1</Option>
                        <Option value="false1">Laskar Pelangi 2</Option>
                        <Option value="false2">Cari Jodoh Sana-sini 1</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Campaign 2"
                      name="related_campaign_2"
                      rules={[
                        {
                          required: true,
                          message: 'Please select campaign!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select campaign"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="true">Produsen Butik 1</Option>
                        <Option value="false">Laskar Pelangi 1</Option>
                        <Option value="false1">Laskar Pelangi 2</Option>
                        <Option value="false2">Cari Jodoh Sana-sini 1</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Campaign 3"
                      name="related_campaign_3"
                      rules={[
                        {
                          required: true,
                          message: 'Please select campaign!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select campaign"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="true">Produsen Butik 1</Option>
                        <Option value="false">Laskar Pelangi 1</Option>
                        <Option value="false1">Laskar Pelangi 2</Option>
                        <Option value="false2">Cari Jodoh Sana-sini 1</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Divider orientation="left" dashed></Divider>

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
            )}
          </>
        )}
      </>
    )
  }

  return (
    <>
      <div className="kb-card card-shadow">
        <div className="card-title">
          <Space className="space-between">
            <p className={nunito.className}>Create New Campaign</p>
          </Space>
        </div>
        <div className="card-body">
          <Tabs
            tabPosition={'right'}
            // items={new Array(3).fill(null).map((_, i) => {
            //   const id = String(i + 1)
            //   return {
            //     label: `Tab ${id}`,
            //     key: id,
            //     children: `Content of Tab ${id}`,
            //   }
            // })}

            items={[
              {
                label: `Campaign Form`,
                key: '123',
                children: <FormCampaign />,
              },
              {
                label: `Galleries`,
                key: '1234',
                children: <CampaignGallery />,
                disabled: fetchError.show,
              },
              {
                label: `PDFs`,
                key: '1235',
                children: <PdfCampaign />,
                disabled: fetchError.show,
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default NewCampaign

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return {
    props: {
      user: user,
    },
  }
}
