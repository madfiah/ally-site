import { Modal } from 'antd'

interface Iprops {
  isModalOpen: boolean
  handleClose: any
  campaign: any
}

const FRONT_SITE_URL = process.env.NEXT_PUBLIC_FRONT_SITE_URL

const PreviewCampaign = ({ isModalOpen, handleClose, campaign }: Iprops) => {
  const screenSize = window.innerHeight

  return (
    <Modal
      title={`Preview Campaign - ${campaign?.name}`}
      open={isModalOpen}
      footer={false}
      onCancel={handleClose}
      width={`98%`}
      centered
    >
      <iframe
        src={`${FRONT_SITE_URL}/campaign/${campaign?.slug}`}
        frameBorder="0"
        width={`100%`}
        height={screenSize - 100}
      ></iframe>
    </Modal>
  )
}

export default PreviewCampaign
