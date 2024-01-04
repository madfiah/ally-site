import { Api } from '@/api/api'
import { LoadingOutlined } from '@ant-design/icons'
import { InputNumber, Space } from 'antd'
import React, { useEffect, useState } from 'react'

interface IProps {
  token: string
  getData: string
  title: string
}

const CardReportDevice = ({ token, getData, title }: IProps) => {
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
        <h2 className={`m-0 mb-1`}>{title}</h2>

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
                <p className="m-0">From Website : {data.website}</p>
                <p className="m-0">From Android : {data.android}</p>
                <p className="m-0">From IOS : {data.ios}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CardReportDevice
