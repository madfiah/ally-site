import { Button, Col, Divider, Row, Space } from 'antd'
import React from 'react'
import { getSession } from 'next-auth/react'
import { Api } from '@/api/api'
import DataNewUsers from './dataNewUsers'
import { Nunito } from '@next/font/google'

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' }

const nunito = Nunito({ subsets: ['latin'] })

interface IProps {
  data: any
  token: string
}

const Dashboard = ({ data, token }: IProps) => {
  return (
    <>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div className="kb-card with-radius card-shadow">
            <div className="card-body">
              <h2 className={`${nunito.className} m-0 mb-1`}>Users</h2>
              <p className="m-0">Today : 150 users</p>
              <p className="m-0">Last 7 Days : 150 users</p>
              <p className="m-0">Total : 5436 users</p>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="kb-card with-radius card-shadow">
            <div className="card-body">
              <h2 className={`${nunito.className} m-0 mb-1`}>Investments</h2>
              <p className="m-0">Today : 150 users</p>
              <p className="m-0">Last 7 Days : 150 users</p>
              <p className="m-0">Total : 5436 users</p>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="kb-card with-radius card-shadow">
            <div className="card-body">
              <h2 className={`${nunito.className} m-0 mb-1`}>Campaigns</h2>
              <p className="m-0">Today : 150 users</p>
              <p className="m-0">Last 7 Days : 150 users</p>
              <p className="m-0">Total : 5436 users</p>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="kb-card with-radius card-shadow">
            <div className="card-body">
              <h2 className={`${nunito.className} m-0 mb-1`}>
                Amount invested
              </h2>
              <p className="m-0">Total: SGD 24,272,713.24</p>
              <p className="m-0">Paid: SGD 23,787,256.24</p>
              <p className="m-0">&nbsp;</p>
            </div>
          </div>
        </Col>
      </Row>
      <Divider dashed />

      <Row gutter={16}>
        <Col span={12}>
          <div className="kb-card with-radius">
            <div className="card-title">
              <Space align={`center`} size={`small`} className="space-between">
                <p className={nunito.className}>Users need to be reviewed</p>
                <Space wrap>
                  <Button size="small" type="primary">
                    Today
                  </Button>
                  <Button size="small">3 days</Button>
                  <Button size="small">7 days</Button>
                </Space>
              </Space>
            </div>
            <div className="card-body p-0">
              <DataNewUsers />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="kb-card with-radius">
            <div className="card-title">
              <Space align={`center`} size={`small`} className="space-between">
                <p className={nunito.className}>Withdrawal request</p>
                <Space wrap>
                  <Button size="small" type="primary">
                    Today
                  </Button>
                  <Button size="small">3 days</Button>
                  <Button size="small">7 days</Button>
                </Space>
              </Space>
            </div>
            <div className="card-body p-0">
              <DataNewUsers />
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const token = session?.user
  console.log(session?.user)
  // Api.get('dashboard', token).then((res) => {
  //   console.log(res)
  // })
  const data = {
    id: 1,
  }
  return {
    props: {
      data,
      token,
    }, // will be passed to the page component as props
  }
}
