import { Col, Divider, Row } from 'antd'
import React from 'react'

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' }

const index = () => {
  return (
    <>
      {/* <Divider orientation="left">Overview</Divider> */}
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div className="kb-card card-shadow">
            <div className="card-body">
              <h2 className="m-0 mb-1">Users</h2>
              <p className="m-0">Today : 150 users</p>
              <p className="m-0">Last 7 Days : 150 users</p>
              <p className="m-0">Total : 5436 users</p>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="kb-card card-shadow">
            <div className="card-body">
              <h2 className="m-0 mb-1">Investments</h2>
              <p className="m-0">Today : 150 users</p>
              <p className="m-0">Last 7 Days : 150 users</p>
              <p className="m-0">Total : 5436 users</p>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="kb-card card-shadow">
            <div className="card-body">
              <h2 className="m-0 mb-1">Campaigns</h2>
              <p className="m-0">Today : 150 users</p>
              <p className="m-0">Last 7 Days : 150 users</p>
              <p className="m-0">Total : 5436 users</p>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="kb-card card-shadow">
            <div className="card-body">
              <h2 className="m-0 mb-1">Users</h2>
              <p className="m-0">Today : 150 users</p>
              <p className="m-0">Last 7 Days : 150 users</p>
              <p className="m-0">Total : 5436 users</p>
            </div>
          </div>
        </Col>
      </Row>
      <Divider dashed />
      <div className="kb-card">
        <div className="card-body">list data</div>
      </div>
    </>
  )
}

export default index
