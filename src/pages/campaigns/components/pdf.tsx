import { Api } from '@/api/api'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Divider, message, Upload, UploadProps } from 'antd'
import { Button, Space, Table } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { useEffect, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface IProps {
  campaign: any
  user: any
}

const PdfCampaign = ({ campaign, user }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const init = () => {
    setLoading(true)
    Api.get(`campaign/pdfs/${campaign?.id}`, user?.token)
      .then((res: any) => {
        // console.log(res)
        setFileList(res.data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (campaign) {
      init()
    }
  }, [])

  const handleChange: UploadProps['onChange'] = ({
    file,
    fileList: newFileList,
  }) => {
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        const { data } = file.response

        file.uid = data.uid
        file.name = data.name
        file.url = data.url
      }
      return file
    })
    setFileList(newFileList)
  }

  const onRemove = (file: any) => {
    setLoading(true)
    Api.post(`campaign/pdf/${file.uid}/delete`, user?.token).then((res) => {
      init()
    })
  }

  const props: UploadProps = {
    name: 'file',
    fileList: fileList,
    action: `${API_URL}/campaign/pdf/${campaign?.id}/upload`,
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    beforeUpload: (file) => {
      console.log(file.type)
      const isPDF = file.type === 'application/pdf'
      if (!isPDF) {
        message.error(`${file.name} is not a pdf file`)
      }
      return isPDF || Upload.LIST_IGNORE
    },
    onChange: handleChange,
    onRemove: onRemove,
    disabled: loading,
  }

  const uploadButton = (
    <div>
      {loading ? (
        <>
          <LoadingOutlined />
          <div style={{ marginTop: 8 }}>Please wait</div>
        </>
      ) : (
        <>
          <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
        </>
      )}
    </div>
  )

  return (
    <>
      <Divider orientation="left" dashed>
        Campaign Documents
      </Divider>
      <Upload listType="picture-card" {...props}>
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
    </>
  )
}

export default PdfCampaign
