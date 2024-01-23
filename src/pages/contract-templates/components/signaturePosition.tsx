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
import useMousePosition from './useMousePosition'

/**
 * Position details
 * Color for signers :
 *  investor : orange
 *  company director : green
 *  company commissioner : chartreuse
 *  KB director : blue
 */

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
  const [coords, handleCoords] = useMousePosition(true)
  const [signerActive, setSignerActive] = useState<any>(null)

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

        // if (canvasRef.current) {
        //   const ctx = canvasRef.current.getContext('2d')
        //   ctx?.strokeRect(200, 200, 40, 50)
        // }
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
        style={{ top: 20, paddingTop: 30 }}
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
            <div>
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
                    className={`item ${
                      signerActive === 'investor' && 'active'
                    }`}
                    actions={
                      inEdit
                        ? [
                            <a
                              key="list-loadmore-edit"
                              onClick={() => setSignerActive('investor')}
                            >
                              set
                            </a>,
                            <a key="list-loadmore-more">remove</a>,
                          ]
                        : []
                    }
                  >
                    <Space>
                      <SelectOutlined style={{ color: 'orange' }} />
                      <span>INVESTOR</span>
                    </Space>
                  </List.Item>
                  <List.Item
                    className={`item ${
                      signerActive === 'ukm_director' && 'active'
                    }`}
                    actions={
                      inEdit
                        ? [
                            <a
                              key="list-loadmore-edit"
                              onClick={() => setSignerActive('ukm_director')}
                            >
                              set
                            </a>,
                            <a key="list-loadmore-more">remove</a>,
                          ]
                        : []
                    }
                  >
                    <Space>
                      <SelectOutlined style={{ color: 'green' }} />
                      <span>[UKM] Director</span>
                    </Space>
                  </List.Item>
                  <List.Item
                    className={`item ${
                      signerActive === 'ukm_commissioner' && 'active'
                    }`}
                    actions={
                      inEdit
                        ? [
                            <a
                              key="list-loadmore-edit"
                              onClick={() =>
                                setSignerActive('ukm_commissioner')
                              }
                            >
                              set
                            </a>,
                            <a key="list-loadmore-more">remove</a>,
                          ]
                        : []
                    }
                  >
                    <Space>
                      <SelectOutlined style={{ color: 'chartreuse' }} />
                      <span>[UKM] Commissioner</span>
                    </Space>
                  </List.Item>
                  <List.Item
                    className={`item ${
                      signerActive === 'kb_director' && 'active'
                    }`}
                    actions={
                      inEdit
                        ? [
                            <a
                              key="list-loadmore-edit"
                              onClick={() => setSignerActive('kb_director')}
                            >
                              set
                            </a>,
                            <a key="list-loadmore-more">remove</a>,
                          ]
                        : []
                    }
                  >
                    <Space>
                      <SelectOutlined style={{ color: 'blue' }} />
                      <span>[KB] Director</span>
                    </Space>
                  </List.Item>
                </List>
              </Card>
              <button
                onClick={() => {
                  if (canvasRef.current) {
                    const ctx = canvasRef.current.getContext('2d')
                    ctx?.clearRect(0, 0, 669, 950)
                  }
                }}
              >
                CLEAR
              </button>
            </div>
            <div className="signature-area">
              <canvas
                ref={canvasRef}
                width="669"
                height="950"
                className="signature-canvas"
                onClick={(e) => {
                  if (inEdit) {
                    handleCoords(e as unknown as MouseEvent)
                    if (canvasRef.current) {
                      const ctx = canvasRef.current.getContext('2d')
                      // clear current stroke
                      ctx?.clearRect(0, 0, 669, 950)

                      if (ctx) {
                        ctx.strokeStyle = 'purple'
                        ctx?.strokeRect(coords.x, coords.y, 200, 80)
                      }
                    }
                  }
                }}
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
