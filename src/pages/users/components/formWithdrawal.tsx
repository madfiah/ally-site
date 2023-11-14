import { PlusOutlined, SaveOutlined } from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Upload,
} from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { useEffect } from 'react'

interface Props {
  action: string
  wallet_withdrawal: any
  modalOpen: boolean
  handleCloseModal: any
  onReloadData: any
}

const fileList: UploadFile[] = []

const FormWithdrawal = ({
  action,
  wallet_withdrawal,
  modalOpen,
  handleCloseModal,
  onReloadData,
}: Props) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (!modalOpen) {
      form.resetFields()
    } else {
      form.setFieldsValue(wallet_withdrawal)
    }
  }, [form, modalOpen, wallet_withdrawal])

  const onFinish = (values: any) => {
    console.log('Success:', values)
    console.log(wallet_withdrawal)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    console.log('Data Wallet: ', wallet_withdrawal)
  }

  const onReset = () => {
    form.setFieldsValue(wallet_withdrawal)
  }

  return (
    <Modal
      title={'Edit Withdrawal'}
      open={modalOpen}
      onCancel={handleCloseModal}
      footer={null}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mt-2"
      >
        <Form.Item label="Amount" name="amount">
          <InputNumber
            style={{ width: '100%' }}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            readOnly
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status Payment"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select status" allowClear>
            <Select.Option value={true}>Paid</Select.Option>
            <Select.Option value={false}>Pending</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Files"
          // name="content"
          // rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            defaultFileList={[...fileList]}
            maxCount={1}
          >
            {/* <Button icon={<UploadOutlined />}>Upload</Button> */}
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Space size={10}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              style={{ width: 150 }}
            >
              Save
            </Button>
            {action === 'new' ? (
              <Button htmlType="reset">Reset</Button>
            ) : (
              <Button onClick={onReset}>Reset</Button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormWithdrawal
