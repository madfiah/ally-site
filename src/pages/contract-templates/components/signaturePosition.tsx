import { Api } from '@/api/api'
import {
  LoadingOutlined,
  SelectOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  List,
  Modal,
  Pagination,
  Space,
  Switch,
  Tooltip,
  Typography,
  notification,
} from 'antd'
import { useEffect, useRef, useState } from 'react'

interface IProps {
  user: any
  signatureContent: string
  isModalOpen: boolean
  handleCancel: any
  investmentId?: string
}

const URL_BE = process.env.NEXT_PUBLIC_BE_URL

const SignaturePosition = ({
  user,
  signatureContent,
  isModalOpen,
  handleCancel,
  investmentId,
}: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [paperDetail, setPaperDetail] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [inEdit, setInEdit] = useState(false)
  const [signPages, setSignPages] = useState<any>([])
  const [pageActive, setPageActive] = useState(0)

  const init = () => {
    setLoading(true)

    Api.adminV1Post(
      `${URL_BE}/api/admin/contract-template-preview/prepare`,
      user?.token,
      user?.id,
      {
        content: signatureContent,
        investment_id: investmentId,
        single: true,
      }
    )
      .then((res: any) => {
        setInEdit(false)
        setPaperDetail(res)
        let images = []
        for (let index = 0; index < res.page_count; index++) {
          images.push(`${res?.url}/${index}.png`)
        }
        setSignPages(images)

        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          ctx?.strokeRect(200, 200, 40, 50)
        }
      })
      .catch((err) => {
        notification.error(err.data.message)
      })
      .finally(() => setLoading(false))
  }

  const resetPopup = () => {
    setSignPages([])
    setPageActive(0)
    setLoading(false)
  }

  useEffect(() => {
    if (isModalOpen) {
      init()
    } else {
      resetPopup()
    }
  }, [isModalOpen])

  const data = ['Racing car sprays burning fuel into crowd.']

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
    setInEdit(checked)
  }

  return (
    <>
      <Modal
        title="Signature Position"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        width={1250}
        style={{ top: 20 }}
      >
        {loading && (
          <div className="text-center my-5">
            <LoadingOutlined style={{ fontSize: '2.5rem' }} />
            <h3>Loading..</h3>
          </div>
        )}

        <div
          style={
            loading
              ? {
                  position: 'absolute',
                  zIndex: -1,
                  visibility: 'hidden',
                }
              : {}
          }
        >
          <Space align="start">
            <Card
              style={{ width: '350px', borderColor: '#d9d9d9' }}
              bodyStyle={{ padding: 0 }}
              title={
                <Space className="space-between">
                  <Typography.Title level={5} className="m-0">
                    Signers
                  </Typography.Title>
                  <Tooltip title={`Switch to edit position`}>
                    <Switch onChange={onChange} checked={inEdit} />
                  </Tooltip>
                </Space>
              }
            >
              <List className="list-signers">
                <List.Item
                  className="item"
                  actions={
                    inEdit
                      ? [
                          <a key="list-loadmore-edit">set</a>,
                          <a key="list-loadmore-more">remove</a>,
                        ]
                      : []
                  }
                >
                  <Space>
                    <SelectOutlined />
                    <span>Investor</span>
                  </Space>
                </List.Item>
                <List.Item
                  className="item"
                  actions={
                    inEdit
                      ? [
                          <a key="list-loadmore-edit">set</a>,
                          <a key="list-loadmore-more">remove</a>,
                        ]
                      : []
                  }
                >
                  <Space>
                    <SelectOutlined />
                    <span>[UKM] Director</span>
                  </Space>
                </List.Item>
                <List.Item
                  className="item active"
                  actions={
                    inEdit
                      ? [
                          <a key="list-loadmore-edit">set</a>,
                          <a key="list-loadmore-more">remove</a>,
                        ]
                      : []
                  }
                >
                  <Space>
                    <SelectOutlined />
                    <span>[UKM] Komisaris</span>
                  </Space>
                </List.Item>
                <List.Item
                  className="item"
                  actions={
                    inEdit
                      ? [
                          <a key="list-loadmore-edit">set</a>,
                          <a key="list-loadmore-more">remove</a>,
                        ]
                      : []
                  }
                >
                  <Space>
                    <SelectOutlined />
                    <span>[KB] Director</span>
                  </Space>
                </List.Item>
              </List>
            </Card>
            <div className="signature-area">
              <canvas
                ref={canvasRef}
                width="669"
                height="950"
                className="signature-canvas"
              />
              <img
                src={signPages[pageActive]}
                alt="Signature Area"
                className="signature-image"
              />
            </div>
            <div>
              {signPages.map((page: any, i: number) => (
                <Card
                  key={i}
                  className="mb-1"
                  bodyStyle={{
                    padding: 0,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <a onClick={() => setPageActive(i)}>
                    <img src={page} alt={`Signature Page`} width={'100%'} />
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        backgroundColor:
                          pageActive === i ? '#3498db' : 'rgba(0,0,0,0.2)',
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >{`Page ${i + 1}`}</span>
                  </a>
                </Card>
              ))}
            </div>
          </Space>
        </div>
      </Modal>
    </>
  )
}

export default SignaturePosition
