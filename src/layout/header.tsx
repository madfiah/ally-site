import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu, Space, Button, Dropdown } from 'antd'
import { signIn, signOut, useSession } from 'next-auth/react'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Button
        type="link"
        size="small"
        onClick={() =>
          signOut({
            callbackUrl: '/login',
          })
        }
      >
        <LogoutOutlined /> Logout
      </Button>
    ),
  },
]

const HeaderLayout = () => {
  return (
    <Space className="space-between">
      <h4 style={{ margin: 0 }}>{`Assalamu'alaikum`}</h4>
      <span>
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Button shape="circle" type="dashed">
            <UserOutlined />
          </Button>
        </Dropdown>
      </span>
    </Space>
  )
}

export default HeaderLayout
