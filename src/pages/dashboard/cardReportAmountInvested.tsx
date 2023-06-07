import { Api } from '@/api/api'
import { LoadingOutlined } from '@ant-design/icons'
import { Nunito } from '@next/font/google'
import { InputNumber, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { currency } from '@/utils/helpers'

const nunito = Nunito({ subsets: ['latin'] })

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
    <div
      className="kb-card with-radius card-shadow"
      style={{ height: '150px' }}
    >
      <div className="card-body">
        <h2 className={`${nunito.className} m-0 mb-1`}>{title}</h2>

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
      </div>
    </div>
  )
}

export default CardReportAmountInvested
