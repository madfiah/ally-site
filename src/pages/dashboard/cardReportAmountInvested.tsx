import { Api } from '@/api/api'
import { LoadingOutlined } from '@ant-design/icons'
import { Card, InputNumber, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { currency } from '@/utils/helpers'

interface IProps {
  token: string
  getData: string
  title: string
}

const CardReportAmountInvested = ({ token, getData, title }: IProps) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const initData = () => {
    Api.get('dashboard', token, {
      type: getData,
    })
      .then((res: any) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setLoading(true)
    initData()
  }, [])

  return (
    <Card style={{ height: '165px' }}>
      <Typography.Title level={4} className="m-0 mb-0-1">
        {title}
      </Typography.Title>

      {loading ? (
        <>
          <div className="text-center">
            <LoadingOutlined
              style={{ fontSize: '1.5rem', padding: '1rem 0' }}
            />
          </div>
        </>
      ) : (
        <>
          {data !== null && (
            <>
              <p className="m-0">Total : {currency(data.total)}</p>
              <p className="m-0">Paid : {currency(data.paid)}</p>
            </>
          )}
        </>
      )}
    </Card>
  )
}

export default CardReportAmountInvested
