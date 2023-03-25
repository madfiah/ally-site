import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button, Space, Table } from 'antd'

const PdfCampaign = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Company Profile',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      created_at: '10 March 2023',
    },
  ]

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Action',
      dataIndex: 'url',
      key: 'url',
      render: (url: string, data: any) => (
        <Space>
          <Button icon={<EyeOutlined />} size="small">
            <a href={url} target="blank">
              &nbsp;
              {` Open`}
            </a>
          </Button>
          <Button icon={<DeleteOutlined />} size="small" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Table
      title={() => (
        <Space className="space-between">
          <h4 className="m-0">Campaign PDF Files</h4>
          <Space>
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
            ></Button>
          </Space>
        </Space>
      )}
      dataSource={dataSource}
      columns={columns}
    />
  )
}

export default PdfCampaign
