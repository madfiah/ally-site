import { Col, Divider, Row } from 'antd'
import { Typography } from 'antd'

const { Title } = Typography

const UserInformation = () => {
  return (
    <div>
      <Row gutter={20}>
        <Col span={12}>
          <h4 className="m-0 p-0">First Name :</h4>
          <Typography className="pb-1 fs-2">Ahmad</Typography>
        </Col>
        <Col span={12}>
          <h4 className="m-0 p-0">Last Name :</h4>
          <Typography className="pb-1 fs-2">Ramli</Typography>
        </Col>
        <Col span={12}>
          <h4 className="m-0 p-0">Email :</h4>
          <Typography className="pb-1 fs-2">
            ahmad@kapitalboost.co.id
          </Typography>
        </Col>
        <Col span={12}>
          <h4 className="m-0 p-0">Date of Birth :</h4>
          <Typography className="pb-1 fs-2">10 October 1997</Typography>
        </Col>
        <Col span={12}>
          <h4 className="m-0 p-0">Phone No :</h4>
          <Typography className="pb-1 fs-2">081802281721</Typography>
        </Col>
        <Col span={12}>
          <h4 className="m-0 p-0">Country :</h4>
          <Typography className="pb-1 fs-2">INDONESIA</Typography>
        </Col>
        <Col span={12}>
          <h4 className="m-0 p-0">Nationality :</h4>
          <Typography className="pb-1 fs-2">INDONESIA</Typography>
        </Col>
        <Col span={12}>
          <h4 className="m-0 p-0">Residential Address :</h4>
          <Typography className="pb-1 fs-2">
            Cipatik, Kab. Bandung Barat
          </Typography>
        </Col>
        <Col span={12}>
          <h4 className="m-0 p-0">How You Know Us :</h4>
          <Typography className="pb-1 fs-2">Search Engine</Typography>
        </Col>
      </Row>

      <Divider orientation="left" dashed>
        Card Identity
      </Divider>

      <Row gutter={20}>
        <Col span={12}>
          <h4 className="m-0 p-0">NRIC / Passport Number :</h4>
          <Typography className="pb-1 fs-2">129917378921</Typography>
        </Col>
        <Col span={12}>
          <h4 className="m-0 p-0">IC Country :</h4>
          <Typography className="pb-1 fs-2">INDONESIA</Typography>
        </Col>
        <Col span={12}>
          <h4 className="m-0 p-0">Full Name in IC :</h4>
          <Typography className="pb-1 fs-2">Ahmad Ramli</Typography>
        </Col>
        <Col span={12}>
          <h4 className="m-0 p-0">Status Verified :</h4>
          <Typography className="pb-1 fs-2">Verified</Typography>
        </Col>
        <Col span={8}>
          <h4 className="m-0 p-0">ID Card / Passport (front) :</h4>
          <a href="https://dummyimage.com/600x400/000/fff" target={`_blank`}>
            <img
              src="https://dummyimage.com/600x400/000/fff"
              width={`100%`}
              alt={`dummy image`}
            />
          </a>
        </Col>
        <Col span={8}>
          <h4 className="m-0 p-0">ID Card / Passport (back) :</h4>
          <a href="https://dummyimage.com/600x400/000/fff" target={`_blank`}>
            <img
              src="https://dummyimage.com/600x400/000/fff"
              width={`100%`}
              alt={`dummy image`}
            />
          </a>
        </Col>
        <Col span={8}>
          <h4 className="m-0 p-0">Proof of Address :</h4>
          <a href="https://dummyimage.com/600x400/000/fff" target={`_blank`}>
            <img
              src="https://dummyimage.com/600x400/000/fff"
              width={`100%`}
              alt={`dummy image`}
            />
          </a>
        </Col>
      </Row>
    </div>
  )
}

export default UserInformation
