import { Api } from '@/api/api'
import {
  BlockOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  Divider,
  Input,
  List,
  message,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  Tooltip,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'
import ContractEditorForm from './editor'

interface IProps {
  user: any
  contract: any
  slug: any
}

const ContractEditor = ({ user, contract, slug }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [savePreviewLoading, setSavePreviewLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [templates, setTemplates] = useState([])
  const [mainContent, setMainContent] = useState('')
  const [signContent, setSignContent] = useState(contract?.sign_content)
  const [investmentOption, setInvestmentOption] = useState([])
  const [attachmentContent, setAttachmentContent] = useState(
    contract?.attachment_content
  )
  const [investorId, setInvestorId] = useState<any>(null)

  const initTemplate = () => {
    Api.get(`campaign/contract/templates`, user?.token)
      .then((res: any) => {
        setTemplates(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const initInvestments = () => {
    setLoading(true)

    Api.get(`campaign/investors/${slug}/option`, user?.token)
      .then((res: any) => {
        setInvestmentOption(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    initTemplate()
    initInvestments()

    if (contract) {
      setMainContent(contract.content)
    }
  }, [])

  const selectTemplate = (template: any) => {
    setLoading(true)
    Api.get(`campaign/contract/template/select/${template.id}`, user?.token)
      .then((res: any) => {
        setMainContent(res.data.content)
        setSignContent(res.data.sign_content)
        setAttachmentContent(res.data.attachment_content)
      })
      .finally(() => setLoading(false))
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onSave = () => {
    setSaveLoading(true)

    Api.post(
      `campaign/contract/content/${contract?.id}/save`,
      user?.token,
      user?.id,
      {
        main_content: mainContent,
        sign_content: signContent,
        attachment_content: attachmentContent,
      }
    )
      .then((res: any) => {
        console.log(res)
        message.success({ content: res.message })
      })
      .catch((err) => {
        message.error({ content: err.data.message })
        console.log(err)
      })
      .finally(() => setSaveLoading(false))
  }

  return (
    <>
      <Divider orientation="left" dashed />
      <Row>
        <Col span={12}>
          <Button icon={<BlockOutlined />} onClick={showModal}>
            Change Template
          </Button>
        </Col>
        <Col span={12}>
          <Space className="space-end">
            <Select
              allowClear
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              options={investmentOption}
              onChange={(v) => setInvestorId(v === undefined ? null : v)}
              onClear={() => setInvestorId(null)}
            />
            <Tooltip
              title={
                investorId
                  ? 'Save and priview the contract'
                  : 'Please select investor first'
              }
            >
              <Button
                disabled={investorId === null || saveLoading}
              >{`Save & Preview`}</Button>
            </Tooltip>
            <Button
              type="primary"
              loading={saveLoading}
              disabled={savePreviewLoading}
              onClick={onSave}
            >{`Save`}</Button>
          </Space>
        </Col>
      </Row>

      <Divider orientation="left" dashed />

      {loading ? (
        <div className="text-center my-5">
          <LoadingOutlined style={{ fontSize: '2.5rem' }} />
          <h3>Please Wait</h3>
        </div>
      ) : (
        <Tabs
          defaultActiveKey="1"
          style={{ marginBottom: 32 }}
          items={[
            {
              label: `Main Content`,
              key: 'main-content',
              children: (
                <ContractEditorForm
                  content={mainContent}
                  onChangeContent={(content: string) => setMainContent(content)}
                />
              ),
            },
            {
              label: `Sign Content`,
              key: 'sign content',
              children: (
                <ContractEditorForm
                  content={signContent}
                  onChangeContent={(content: string) => setSignContent(content)}
                />
              ),
            },
            {
              label: `Attachment Content`,
              key: 'attachment-content',
              children: (
                <ContractEditorForm
                  content={attachmentContent}
                  onChangeContent={(content: string) =>
                    setAttachmentContent(content)
                  }
                />
              ),
            },
          ]}
        />
      )}

      <Modal
        title={`Select Contract Template`}
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width={640}
      >
        <List
          dataSource={templates}
          pagination={{
            pageSize: 8,
          }}
          renderItem={(item: any) => (
            <List.Item onClick={handleOk}>
              <Button
                type="text"
                style={{ width: '100%', textAlign: 'left' }}
                onClick={() => selectTemplate(item)}
              >
                <Space className="space-between">
                  {item.name}
                  <Typography.Text>
                    <small>{item.created_at}</small>
                  </Typography.Text>
                </Space>
              </Button>
            </List.Item>
          )}
        />
      </Modal>
    </>
  )
}

export default ContractEditor
