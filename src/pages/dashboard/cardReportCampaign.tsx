import { Api } from '@/api/api'
import { LoadingOutlined } from '@ant-design/icons'
import { Nunito } from '@next/font/google'
import React, { useEffect, useState } from 'react'

const nunito = Nunito({ subsets: ['latin'] })

interface IProps {
  token: string
  getData: string
  title: string
}

const CardReportCampaign = ({ token, getData, title }: IProps) => {
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
      style={{ height: '150px', background: 'rgba(231, 76, 60, 0.2)' }}
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
                <p className="m-0">Total SME : {10}</p>
                <p className="m-0">On Going SME : {3}</p>
                <p className="m-0">Total Donation : {22}</p>
                <p className="m-0">On Going Donation : {1}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CardReportCampaign
