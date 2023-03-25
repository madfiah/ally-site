import { Tabs, TabsProps } from 'antd'
import CampaignUpdates from './expanded_components/campaignUpdates'
import DetailCampaign from './expanded_components/detailCampaign'
import MasterPayout from './expanded_components/masterPayout'

interface CProps {
  campaign?: any
}

const ExpandedCampaign = ({ campaign }: CProps) => {
  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Detail Campaign`,
      children: <DetailCampaign />,
    },
    {
      key: '2',
      label: `Master Payout`,
      children: <MasterPayout />,
    },
    {
      key: '3',
      label: `Campaign Updates`,
      children: <CampaignUpdates />,
    },
  ]

  return (
    <div>
      {campaign ? (
        <>
          <Tabs
            tabPosition="left"
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </>
      ) : (
        <>Data Not Found</>
      )}
    </div>
  )
}

export default ExpandedCampaign
