import { Api } from '@/api/api'
import { LoadingOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

interface IProps {
  token: string
  getData: string
  title: string
}

const CardReport = ({ token, getData, title }: IProps) => {
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
                <p className="m-0">Today : {data.today}</p>
                <p className="m-0">Last 7 Days : {data['7_days']}</p>
                <p className="m-0">Last 30 Days : {data['30_days']}</p>
                <p className="m-0">Total : {data.all}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CardReport
