interface CProps {
  campaign?: any
}

const ExpandedCampaign = ({ campaign }: CProps) => {
  return (
    <div>
      {campaign ? (
        <p style={{ margin: 0 }}>{campaign.name}</p>
      ) : (
        <>Data Not Found</>
      )}
    </div>
  )
}

export default ExpandedCampaign
