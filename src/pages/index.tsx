import { Button, Col, Divider, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { Api } from '@/api/api'
import DataNewUsers from './dashboard/dataNewUsers'
import { Nunito } from '@next/font/google'
import CardReport from './dashboard/cardReport'
import CardReportLast3Days from './dashboard/cardReportLast3Days'
import CardReportAmountInvested from './dashboard/cardReportAmountInvested'
import CardReportKBWallet from './dashboard/cardReportKBWallet'
import CardReportDevice from './dashboard/cardReportDevice'
import CardReportCampaign from './dashboard/cardReportCampaign'
import WithdrawalRequests from './dashboard/withdrawalRequests'

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' }

interface IProps {
  token: string
}

const Dashboard = ({ token }: IProps) => {
  // const [data, setData] = useState<any>(null)

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col className="gutter-row" xs={24} md={8} xl={6}>
          <CardReport token={token} getData="user" title="Users" />
        </Col>
        <Col className="gutter-row" xs={24} md={8} xl={6}>
          <CardReport token={token} getData="investment" title="Investments" />
        </Col>
        <Col className="gutter-row" xs={24} md={8} xl={6}>
          <CardReportCampaign
            token={token}
            getData="campaigns"
            title="Campaigns"
          />
        </Col>
        <Col className="gutter-row" xs={24} md={8} xl={6}>
          <CardReportAmountInvested
            token={token}
            getData="amount invested"
            title="Amount invested"
          />
        </Col>
        <Col className="gutter-row" xs={24} md={8} xl={6}>
          <CardReportKBWallet
            token={token}
            getData="kb wallet"
            title="KB Wallet"
          />
        </Col>
        <Col className="gutter-row" xs={24} md={8} xl={6}>
          <CardReportLast3Days
            token={token}
            getData="last 3 days"
            title="Last 3 Days"
          />
        </Col>
        <Col className="gutter-row" xs={24} md={8} xl={6}>
          <CardReportDevice
            token={token}
            getData="register from"
            title="Register Device"
          />
        </Col>
        <Col className="gutter-row" xs={24} md={8} xl={6}>
          <CardReportDevice
            token={token}
            getData="investment from"
            title="Investment Device"
          />
        </Col>
      </Row>

      <Divider dashed />

      <Row gutter={[16, 16]}>
        <Col md={24} xl={12}>
          <DataNewUsers token={token} title="Users need to be reviewed" />
        </Col>
        <Col md={24} xl={12}>
          <WithdrawalRequests token={token} title="Withdrawal Requests" />
        </Col>
      </Row>
    </>
  )
}

export default Dashboard

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const token = session?.user.token

  return {
    props: {
      token,
    }, // will be passed to the page component as props
  }
}
