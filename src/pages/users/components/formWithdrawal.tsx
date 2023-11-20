import { PlusOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Upload,
} from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { useEffect, useState } from 'react'
import type { UploadProps } from 'antd'
import { Api } from '@/api/api'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Singapore')

interface Props {
  action: string
  wallet_withdrawal: any
  modalOpen: boolean
  handleCloseModal: any
  onReloadData: any
  token: string
  user_id: any
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

const FormWithdrawal = ({
  action,
  wallet_withdrawal,
  modalOpen,
  handleCloseModal,
  onReloadData,
  token,
  user_id,
}: Props) => {
  const [modal, contextHolder] = Modal.useModal()
  const [form] = Form.useForm()
  const [proof, setProof] = useState<UploadFile[]>([])
  const [loading, setLoading] = useState(false)
  const [banks, setBanks] = useState<any>([])
  const [bankSelected, setBankSelected] = useState<any>(null)

  const initBanks = async () => {
    await Api.get(`users/${user_id}/banks/option`, token)
      .then((res: any) => {
        setBanks(res.data)
      })
      .catch((err) => {
        setBanks([])
        message.error({ content: err.data.message })
      })
  }

  useEffect(() => {
    if (!modalOpen) {
      form.resetFields()
    } else {
      initBanks()
      form.setFieldsValue(wallet_withdrawal)

      const transfer_at = wallet_withdrawal?.transfer_at
        ? dayjs(wallet_withdrawal?.transfer_at)
        : null
      form.setFieldValue('transfer_at', transfer_at)
    }
  }, [form, modalOpen, wallet_withdrawal])

  const onFinish = (values: any) => {
    setLoading(true)

    Api.post(
      `withdraw/${wallet_withdrawal?.id}?_method=put`,
      token,
      null,
      values
    )
      .then((res: any) => {
        onReloadData()
        message.success({ content: res.message })

        setTimeout(() => {
          handleCloseModal()
        }, 500)
      })
      .catch((err) => {
        console.log(err)
        message.error({ content: err.data.message })
      })
      .finally(() => setLoading(false))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    console.log('Data Wallet: ', wallet_withdrawal)
  }

  const onReset = () => {
    form.setFieldsValue(wallet_withdrawal)
  }

  const handleUpload: UploadProps['onChange'] = ({
    file,
    fileList: newFileList,
  }) => {
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        const { data } = file.response

        file.uid = Math.random().toString()
        file.name = Math.random().toString()
        file.url = data.file_path

        form.setFieldValue('proof', data.file_path)
      }
      return file
    })

    setProof(newFileList)
  }

  const config = {
    title: 'User Bank Account!',
    content: (
      <table className="mt-2">
        <tr>
          <td width={130}>Account Number</td>
          <th style={{ textAlign: 'left' }}>
            {bankSelected?.detail.account_number}
          </th>
        </tr>
        <tr>
          <td width={130}>Account Name</td>
          <th style={{ textAlign: 'left' }}>
            {bankSelected?.detail.account_name}
          </th>
        </tr>
        <tr>
          <td width={130}>Bank Name</td>
          <th style={{ textAlign: 'left' }}>
            {bankSelected?.detail.bank_name}
          </th>
        </tr>
        <tr>
          <td width={130}>Bank code</td>
          <th style={{ textAlign: 'left' }}>
            {bankSelected?.detail.bank_code}
          </th>
        </tr>
        <tr>
          <td width={130}>BIC code</td>
          <th style={{ textAlign: 'left' }}>{bankSelected?.detail.bic_code}</th>
        </tr>
        <tr>
          <td>IBAN code</td>
          <th>{bankSelected?.detail.iban_code}</th>
        </tr>
        <tr>
          <td width={130}>Country</td>
          <th style={{ textAlign: 'left' }}>{bankSelected?.detail.country}</th>
        </tr>
        <tr>
          <td width={130}>Currency</td>
          <th style={{ textAlign: 'left' }}>{bankSelected?.detail.currency}</th>
        </tr>
      </table>
    ),
  }

  const selectBank = (value: any) => {
    const selectedBank = banks.filter((bank: any) => {
      return bank?.value === value
    })

    setBankSelected(selectedBank ? selectedBank[0] : null)
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

        <Form.Item label="Bank Account">
          <Form.Item
            name="bank_account_id"
            style={{ display: 'inline-block', width: 'calc(70% - 8px)' }}
            rules={[{ required: true, message: 'Bank account is required' }]}
          >
            <Select
              placeholder="Select user bank account"
              allowClear
              options={banks}
              onChange={selectBank}
            ></Select>
          </Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              width: 'calc(30% + 0px)',
              margin: '0 0 0 8px',
            }}
          >
            <Button
              style={{ width: '100%' }}
              onClick={async () => {
                modal.info(config)
              }}
              disabled={bankSelected === null}
              icon={<SearchOutlined />}
            >
              Detail
            </Button>
          </Form.Item>
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
          label="Proof"
          name="proof"
          rules={[{ required: true, message: 'Proof of transfer is required' }]}
        >
          <Upload
            action={`${API_URL}/withdraw/upload/${wallet_withdrawal?.id}`}
            headers={{
              Authorization: `Bearer ${token}`,
            }}
            listType="picture-card"
            onChange={handleUpload}
            defaultFileList={[...proof]}
            maxCount={1}
          >
            {/* <Button icon={<UploadOutlined />}>Upload</Button> */}
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Transfer at"
          name="transfer_at"
          rules={[{ required: true, message: 'Date transfer is required' }]}
        >
          <DatePicker format={`YYYY-MM-DD`} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Space size={10}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              style={{ width: 150 }}
              loading={loading}
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

      {contextHolder}
    </Modal>
  )
}

export default FormWithdrawal
