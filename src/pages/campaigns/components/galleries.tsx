import React, { useEffect, useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Divider, Modal, Upload } from 'antd'
import type { RcFile } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import type { UploadProps } from 'antd'
import { Api } from '@/api/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

interface Props {
  user: any
  campaign?: any
}

const CampaignGallery = ({ user, campaign }: Props) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [loading, setLoading] = useState(false)

  const initGalleries = () => {
    setLoading(true)
    Api.get(`campaign/galleries/${campaign?.id}`, user?.token)
      .then((res: any) => {
        // console.log(res)
        setFileList(res.data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (campaign) {
      initGalleries()
    }
  }, [])

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    )
  }

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
    Api.post(`campaign/gallery/${file.uid}/delete`, user?.token).then((res) => {
      initGalleries()
    })
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
        Campaign Galleries
      </Divider>
      <Upload
        action={`${API_URL}/campaign/gallery/${campaign?.id}/upload`}
        headers={{
          Authorization: `Bearer ${user?.token}`,
        }}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={onRemove}
        disabled={loading}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default CampaignGallery
