import {
  Badge,
  Button,
  Divider,
  Modal,
  Space,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd'
import type { TabsProps } from 'antd'
import UserInformation from './userInformation'
import ResultVeriff from './resultVeriff'
import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Api } from '@/api/api'
import { Nunito } from '@next/font/google'

interface IProps {
  isModalOpen: boolean
  handleCancel: any
  userSession: any
  userId: number
}

const nunito = Nunito({ subsets: ['latin'] })

const ModalDetailUser = ({
  isModalOpen,
  handleCancel,
  userSession,
  userId,
}: IProps) => {
  const [loading, setLoading] = useState(false)
  const [tabActive, setTabActive] = useState('1')
  const [dataUser, setDataUser] = useState<any>(null)

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `User Information`,
      children: <UserInformation user={dataUser} />,
    },
    {
      key: '2',
      label: `Verif Information`,
      children: <ResultVeriff veriff={dataUser?.veriff} />,
    },
  ]

  const initUser = () => {
    setLoading(true)

    Api.get(`users/${userId}`, userSession?.token)
      .then((res: any) => {
        setDataUser(res.data)
      })
      .catch((err: any) => {
        message.error({ content: err.message })
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (userId !== null) {
      initUser()
    } else {
      setDataUser(null)
    }
  }, [isModalOpen])

  const onChangeTab = (key: string) => {
    setTabActive(key)
  }

  return (
    <Modal
      title={
        dataUser && (
          <Space className="space-between">
            <Typography.Title level={4} className={nunito.className}>
              Detail User : {dataUser?.full_name}
            </Typography.Title>
            <Tag>{dataUser.status.toUpperCase()}</Tag>
          </Space>
        )
      }
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={1000}
      style={{ top: 20 }}
    >
      <div className="mt-2">
        {loading ? (
          <div className="text-center my-5">
            <LoadingOutlined style={{ fontSize: '2.5rem' }} />
            <h3>Loading..</h3>
          </div>
        ) : (
          <>
            <Tabs
              tabPosition="right"
              defaultActiveKey={tabActive}
              items={items}
              onChange={onChangeTab}
            />

            {tabActive === '1' && (
              <>
                <Divider orientation="left" dashed />

                <Space size={10} className="space-between">
                  <Space size={10}>
                    <Button danger icon={<CloseOutlined />}>
                      REJECT
                    </Button>
                    <Button type="primary" danger icon={<CloseOutlined />}>
                      BLACKLIST
                    </Button>
                  </Space>
                  <Tooltip title="Veriff has not been approved">
                    <Button
                      disabled
                      type="primary"
                      icon={<CheckOutlined />}
                      style={{ width: '200px' }}
                    >
                      APPROVE
                    </Button>
                  </Tooltip>
                </Space>
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  )
}

export default ModalDetailUser
