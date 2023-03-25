import {
  EditOutlined,
  EyeOutlined,
  NotificationOutlined,
} from '@ant-design/icons'
import { Button, Col, List, Row, Space, Tooltip } from 'antd'

const DetailCampaign = () => {
  const data = [
    { title: 'Company Name', content: 'PT ABC' },
    { title: 'Industry', content: 'Fintech' },
    { title: 'Project Type', content: 'SME Crowdfunding' },
    { title: 'SME Sub Type', content: 'INVOICE FINANCING' },
    { title: 'Risk', content: 'A (Good)' },
    { title: 'Minimum Invest', content: '$200' },
    { title: 'Project Return', content: '7.40%' },
    { title: 'Project Tenor', content: '7 months' },
  ]
  return (
    <>
      <Row gutter={30}>
        <Col span={12}>
          <List
            size={`small`}
            dataSource={data}
            renderItem={(item, idx) =>
              idx % 2 === 0 && (
                <List.Item>
                  <List.Item.Meta title={item.title} />

                  <div>{item.content}</div>
                </List.Item>
              )
            }
          />
        </Col>
        <Col span={12}>
          <List
            size={`small`}
            dataSource={data}
            renderItem={(item, idx) =>
              idx % 2 === 1 && (
                <List.Item>
                  <List.Item.Meta title={<>{item.title}</>} />

                  <div>{item.content}</div>
                </List.Item>
              )
            }
          />
        </Col>
      </Row>
      <Row className="my-2">
        <Col span={24}>
          <Space>
            <Button type="primary" icon={<EditOutlined />} size={`small`}>
              Edit Campaign
            </Button>
            <Button icon={<EyeOutlined />} size={`small`}>
              Preview Campaign
            </Button>
            <Tooltip title="Notify users a new campaign has been released!">
              <Button icon={<NotificationOutlined />} size={`small`}>
                Send Mobile Notification
              </Button>
            </Tooltip>
            {/* <Tooltip title="Notification has been sent">
              <Button icon={<NotificationOutlined />} size={`small`} disabled>
                Send Mobile Notification
              </Button>
            </Tooltip> */}
          </Space>
        </Col>
      </Row>
    </>
  )
}

export default DetailCampaign
