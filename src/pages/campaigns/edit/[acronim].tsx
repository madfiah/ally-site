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
import { useEffect, useRef, useState } from 'react'
import { Api } from '@/api/api'
import { getSession } from 'next-auth/react'
import dayjs from 'dayjs'
import type { UploadFile } from 'antd/es/upload/interface'
import type { UploadProps } from 'antd'

import weekday from 'dayjs/plugin/weekday'
import timezone from 'dayjs/plugin/timezone'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Singapore')

const API_URL = process.env.NEXT_PUBLIC_API_URL

const nunito = Nunito({ subsets: ['latin'] })
const { Option } = Select

interface IProps {
  user: any
}

const NewCampaign = ({ user }: IProps) => {
  const editorRef = useRef<any>(null)
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState({
    show: false,
    message: '',
  })
  const [campaign, setCampaign] = useState<any>(null)
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState<UploadFile[]>([])
  const [cover, setCover] = useState<UploadFile[]>([])

  const acronim = router.query.acronim

  const loadCampaign = (acronim: any) => {
    console.log('Load campaign data')
    setLoading(true)
    Api.get(`campaign/detail/${acronim}`, user.token)
      .then((res: any) => {
        const params = {
          ...res.data,
          release_datetime: res.data.release_datetime
            ? dayjs(res.data.release_datetime)
            : null,
          expiry_datetime: res.data.expiry_datetime
            ? dayjs(res.data.expiry_datetime)
            : null,
          logo: res.data.logo === null ? '' : res.data.logo,
        }
        form.setFieldsValue(params)
        setDescription(params.description)
        setCampaign(params)

        // set logo & cover
        if (params.logo !== null) {
          let files: any = []

          let itemLogo = {
            uid: Math.floor(1000 + Math.random() * 9000),
            name: `file-logo`,
            status: 'done',
            url: params.logo,
          }

          files.push(itemLogo)
          setLogo(files)
        }

        if (params.cover_image !== null) {
          let files: any = []

          let item = {
            uid: Math.floor(1000 + Math.random() * 9000),
            name: `file-logo`,
            status: 'done',
            url: params.cover_image,
          }

          files.push(item)
          setCover(files)
        }
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
    loadCampaign(acronim)
  }, [])

  const onFinish = (values: any) => {
    setLoading(true)

    Api.post(`campaign/update/${acronim}`, user.token, user.id, {
      ...values,
      description,
    })
      .then((res: any) => {
        notification.success({ message: 'Success to update campaign' })
        setCampaign(null)
        setTimeout(() => {
          loadCampaign(acronim)
        }, 500)
      })
      .catch((err: any) => {
        notification.error({ message: 'error' })
      })
  }

  const handleEditorChange = (content: any, editor: any) => {
    // console.log('Content was updated:', content)
    setDescription(content)
  }

  const handleChangeLogo: UploadProps['onChange'] = ({ file, fileList }) => {
    // let newFileList = [...info.fileList]
    if (file.status === 'done') {
      form.setFieldValue('logo', file.response.data.file_path)
    }
  }

  const handleChangeCover: UploadProps['onChange'] = ({ file, fileList }) => {
    // let newFileList = [...info.fileList]
    if (file.status === 'done') {
      form.setFieldValue('cover_image', file.response.data.file_path)
    }
  }

  const FormCampaign = () => {
    return (
      <>
        {loading && campaign === null ? (
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
                      name="subtype"
                      rules={[
                        { required: true, message: 'Please select subtype!' },
                      ]}
                    >
                      <Select
                        placeholder="Select SME subtype"
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
                      name="tenor"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the tenor',
                        },
                      ]}
                      getValueProps={(i) => ({ value: parseFloat(i) })}
                    >
                      <InputNumber style={{ width: '100%' }} />
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
                      getValueProps={(i) => ({ value: parseFloat(i) })}
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
                        <Option value={true}>Online</Option>
                        <Option value={false}>Offline</Option>
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
                        <Option value={true}>Active</Option>
                        <Option value={false}>Disable</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Email Requirements"
                      name="requirement_reminder"
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
                        <Option value={true}>Active</Option>
                        <Option value={false}>Disable</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={`Snippet`} name="snippet">
                      <Input.TextArea rows={5} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Upload Logo" name="logo">
                      <Upload
                        action={`${API_URL}/campaign/upload-image`}
                        headers={{
                          Authorization: `Bearer ${user.token}`,
                        }}
                        listType="picture-circle"
                        onChange={handleChangeLogo}
                        maxCount={1}
                        defaultFileList={logo}
                      >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Upload Cover" name="cover_image">
                      <Upload
                        action={`${API_URL}/campaign/upload-image`}
                        headers={{
                          Authorization: `Bearer ${user.token}`,
                        }}
                        listType="picture-card"
                        maxCount={1}
                        onChange={handleChangeCover}
                        defaultFileList={cover}
                      >
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
                    <Form.Item label="Description">
                      {!loading ? (
                        <Editor
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          ref={editorRef}
                          initialValue={description}
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
                        />
                      ) : (
                        <div
                          style={{
                            height: 400,
                            overflow: 'hidden',
                            borderRadius: '10px',
                            border: '2px solid #f1f1f1',
                            padding: '15px',
                          }}
                          dangerouslySetInnerHTML={{ __html: description }}
                        ></div>
                      )}
                    </Form.Item>
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
                        loading={loading}
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
