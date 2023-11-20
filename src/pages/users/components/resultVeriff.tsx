/* eslint-disable jsx-a11y/alt-text */
import { Api } from '@/api/api'
import {
  CloseCircleOutlined,
  DeleteFilled,
  FundProjectionScreenOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  Divider,
  notification,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import Link from 'next/link'
import { useState } from 'react'

interface IProps {
  veriff: any
  token: string
  initUser: any
}

const VERIFF_STATION = process.env.NEXT_PUBLIC_VERIFF_STATION

const ResultVeriff = ({ veriff, token, initUser }: IProps) => {
  const [loadingImport, setLoadingImport] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const importDocument = async () => {
    setLoadingImport(true)

    Api.get(`users/${veriff?.user_id}/import/document`, token)
      .then((res: any) => {
        notification.success({ message: res.data.message })
        initUser()
      })
      .catch((err) => {
        notification.error({ message: err.data.message })
      })
      .finally(() => setLoadingImport(false))
  }

  const deleteSession = async () => {
    setLoadingDelete(true)

    Api.post(`users/${veriff?.session_id}/veriff/delete`, token)
      .then((res: any) => {
        notification.success({ message: res.message })
        initUser()
      })
      .catch((err) => {
        notification.error({ message: err.data.message })
      })
      .finally(() => setLoadingDelete(false))
  }

  return (
    <>
      <Divider orientation="left" dashed>
        Veriff Information
      </Divider>
      {veriff ? (
        <>
          <Row gutter={20}>
            <Col span={12}>
              <h4 className="m-0 p-0">Session ID :</h4>
              <Typography className="pb-1 fs-2">
                {veriff?.session_id}
              </Typography>
            </Col>
            <Col span={12}>
              <h4 className="m-0 p-0">Status :</h4>
              <Typography.Text className="pb-1 fs-2" type="success">
                {veriff?.status.toUpperCase()}
              </Typography.Text>
            </Col>
            <Col span={24}>
              <h4 className="m-0 p-0">Reason :</h4>
              <Typography.Text className="pb-1 fs-2" italic>
                -- There is no reason from veriff --
              </Typography.Text>
            </Col>
          </Row>

          <Divider orientation="left" dashed />

          <Space className="space-between">
            <>
              <Tooltip title="See the detail on veriff station">
                <Link
                  href={`${VERIFF_STATION}/${veriff?.session_id}`}
                  target="_blank"
                >
                  <Button
                    type="primary"
                    icon={<FundProjectionScreenOutlined />}
                    style={{ width: '230px' }}
                  >
                    Open Detail on Veriff
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip title="Import document photo from veriff">
                <Button
                  icon={<FundProjectionScreenOutlined />}
                  style={{ width: '230px' }}
                  onClick={importDocument}
                  loading={loadingImport}
                  disabled={veriff?.code.toString() !== '9001'}
                >
                  Import Document
                </Button>
              </Tooltip>
            </>
            <>
              <Button
                type="primary"
                icon={<DeleteFilled />}
                style={{ width: '160px' }}
                onClick={deleteSession}
                disabled={veriff?.code.toString() === '9001'}
                loading={loadingDelete}
                danger
              >
                Delete Session
              </Button>
            </>
          </Space>
        </>
      ) : (
        <>
          <Typography.Title level={5} className="text-center" type="danger">
            <CloseCircleOutlined style={{ fontSize: '5rem' }} />
            <p>Data veriff not found</p>
          </Typography.Title>
        </>
      )}
    </>
  )
}

export default ResultVeriff
