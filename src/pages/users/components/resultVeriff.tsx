/* eslint-disable jsx-a11y/alt-text */
import { FundProjectionScreenOutlined } from '@ant-design/icons'
import {
  Alert,
  Button,
  Col,
  Divider,
  Image,
  Row,
  Tooltip,
  Typography,
} from 'antd'

const ResultVeriff = () => {
  return (
    <>
      <Divider orientation="left" dashed>
        Veriff Information
      </Divider>
      <Row gutter={20}>
        <Col span={12}>
          <h4 className="m-0 p-0">Session ID :</h4>
          <Typography className="pb-1 fs-2">
            28f7affb-b2b4-4029-b9ba-89abac9f4520
          </Typography>
        </Col>
        <Col span={12}>
          <h4 className="m-0 p-0">Status :</h4>
          <Typography className="pb-1 fs-2">
            <Alert message="Started" type="info" />
          </Typography>
        </Col>
        <Col span={24}>
          <h4 className="m-0 p-0">Reason :</h4>
          <Typography.Text className="pb-1 fs-2" italic>
            -- There is no reason from veriff --
          </Typography.Text>
        </Col>
      </Row>
      <br />
      <Tooltip title="See the detail on veriff station">
        <Button
          type="primary"
          className="mt-2"
          icon={<FundProjectionScreenOutlined />}
          style={{ width: '230px' }}
        >
          Open Detail on Veriff
        </Button>
      </Tooltip>
    </>
  )
}

export default ResultVeriff
