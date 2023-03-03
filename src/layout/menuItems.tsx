import Link from 'next/link'
import type { MenuProps } from 'antd'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  BarsOutlined,
  MoneyCollectOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ApartmentOutlined,
  RadiusSettingOutlined,
  DiffOutlined,
} from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]

type LayoutProps = {
  children: React.ReactNode
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

export const menuItems: MenuItem[] = [
  getItem(
    <Link href="/dashboard">Dashboard</Link>,
    'dashboard',
    <PieChartOutlined />
  ),
  getItem(
    <Link href="/campaigns">Campaigns</Link>,
    'campaigns',
    <BarsOutlined />
  ),
  getItem(<Link href="/users">Users</Link>, 'users', <UserOutlined />),
  getItem(
    <Link href="/get-fundes">Get Fundeds</Link>,
    'get-fundeds',
    <DiffOutlined />
  ),
  getItem(
    <Link href="/withdrawals">Withdrawals</Link>,
    'withdrawals',
    <MoneyCollectOutlined />
  ),
  getItem('Partnering', 'partner-menu', <ApartmentOutlined />, [
    getItem('Affiliations', 'affiliations'),
    getItem('Partners', 'partnets'),
    getItem('Referal', 'referal'),
  ]),
  getItem('Main Setting', 'main-setting', <RadiusSettingOutlined />, [
    getItem('Admins', 'admins'),
    getItem('Banks', 'banks'),
    getItem('Banners', 'banners'),
    getItem('Blogs', 'blogs'),
    getItem('Contract Templates', 'contract-templates'),
    getItem('Contact Form', 'contact-form'),
    getItem('FAQs', 'faqs'),
  ]),
]
