import { listTemplates, types } from '@/utils/items'
import { our_services } from '@/utils/ourServices'
import {
  CheckCircleFilled,
  MailOutlined,
  MobileOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  List,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd'
import React, { useState } from 'react'
import ContactForm from './components/ContactForm'
import { plans } from '@/utils/plans'
import { contacts } from '@/utils/contacts'

const Dashboard = () => {
  const [typeSelected, setTypeSelected] = useState(null)
  const [filteredItems, setFilteredItems] = useState(listTemplates)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [templateSelected, setTemplateSelected] = useState<any>(null)

  const showModal = (item: any) => {
    setTemplateSelected(item)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setTemplateSelected(null)
    setIsModalOpen(false)
  }

  const onSelectCat = (cat: any) => {
    setTypeSelected(cat)

    if (cat === null) {
      setFilteredItems(listTemplates)
    } else {
      const filtered = listTemplates.filter((val) => val.type === cat)

      setFilteredItems(filtered)
    }
  }

  return (
    <main style={{ maxWidth: '100vw', margin: 'auto' }}>
      <div id="header">
        <Row justify="center" align="middle" style={{ height: '45vh' }}>
          <Col xs={24} sm={16} md={16} lg={10} style={{ textAlign: 'center' }}>
            <Typography.Title level={1}>Welcome to Arlie Site</Typography.Title>
            <Typography style={{ fontSize: '1.3rem' }}>
              Solusi mudah untuk anda memiliki website sendiri yang modern dan
              fungsional untuk mendukung bisnis online anda.
            </Typography>
          </Col>
        </Row>
      </div>

      <div id="pricing" style={{ width: '90%', margin: 'auto' }}>
        <Row gutter={[35, 30]} justify="center" align="top">
          {plans.map((plan, idx) => (
            <Col sm={12} md={12} key={idx}>
              <Card style={plan.cardStyle}>
                <div style={{ textAlign: 'center' }}>
                  <Typography.Title level={2} style={{ marginBottom: '0px' }}>
                    {plan.name}
                  </Typography.Title>
                  <Typography.Title
                    level={3}
                    delete
                    type="danger"
                    style={{ marginBottom: 0, paddingBottom: '0' }}
                  >
                    Rp. {plan.price}
                  </Typography.Title>
                  <Space align="start">
                    <Typography.Title level={3} style={{ color: '#00665aff' }}>
                      Rp.
                    </Typography.Title>
                    <Typography.Title level={2} style={{ color: '#00665aff' }}>
                      {plan.discount}
                    </Typography.Title>
                  </Space>
                  <br />
                  <Typography.Text type="secondary">
                    {` (Tahun Pertama)`}
                  </Typography.Text>

                  <Typography>{plan.desc}</Typography>
                </div>
                <Divider />
                <List
                  itemLayout="horizontal"
                  dataSource={plan.items}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <CheckCircleFilled
                            style={{ color: '#008d7d', fontSize: '1.5rem' }}
                          />
                        }
                        title={item}
                      />
                    </List.Item>
                  )}
                />
                <Divider />
                <Typography.Text>
                  Catatan : <br />
                  {plan.notes}
                </Typography.Text>
                <br />
                <br />
                <Button
                  type="primary"
                  color="#008d7d"
                  style={{
                    width: '100%',
                    fontSize: '1.25rem',
                    height: 'auto',
                    background: '#008d7d',
                  }}
                >
                  Pesan Sekarang!
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* <div
        id="services"
        style={{ marginTop: '40px', padding: '50px 50px', background: '#fff' }}
      >
        <center>
          <Typography.Title level={1}>Services</Typography.Title>
          <Typography.Text style={{ fontSize: '1.3rem' }}>
            Apa saja yang akan kamu dapatkan?
          </Typography.Text>
        </center>

        <Row gutter={[30, 20]} style={{ marginTop: '35px' }}>
          {our_services.map((item) => (
            <Col span={8} key={Math.random()}>
              <Card
                style={{
                  boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                  height: '300px',
                }}
              >
                {item.icon}
                <Typography.Title level={3}>{item.title}</Typography.Title>
                <Divider />

                <Typography.Text>{item.description}</Typography.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div> */}

      <div id="templates" style={{ marginTop: '3rem', padding: '50px 10px' }}>
        <Typography.Title
          level={2}
          style={{ margin: '45px', textAlign: 'center' }}
        >
          Pilihan Template
        </Typography.Title>

        <div style={{ margin: 'auto', marginBottom: '35px', display: 'table' }}>
          <Space>
            {types.map((i) => (
              <Button key={Math.random()} onClick={() => onSelectCat(i)}>
                {i}
              </Button>
            ))}
            {typeSelected !== null && (
              <Button danger onClick={() => onSelectCat(null)}>
                Clear
              </Button>
            )}
          </Space>
        </div>

        <Row gutter={[20, 20]} id="portfolio">
          {filteredItems.map((item) => (
            <Col
              className="gutter-row"
              xl={6}
              lg={8}
              md={12}
              sm={12}
              xs={12}
              key={Math.random()}
            >
              <Card
                cover={<img alt="example" src={item.image} width={'100%'} />}
                actions={[
                  <Button
                    key={Math.random()}
                    type="primary"
                    icon={<RocketOutlined key="preview" rotate={45} />}
                    style={{ width: '80%' }}
                    onClick={() => showModal(item)}
                  >
                    Preview
                  </Button>,
                ]}
                bodyStyle={{ padding: '0px 20px 20px' }}
              >
                <h3>{item.title}</h3>

                <Typography>{item.desc}</Typography>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* <div id="contact" style={{ padding: '50px 0' }}>
        <Row align={`middle`} justify="center">
          <Col
            span={24}
            style={{ textAlign: 'center', padding: '25px' }}
            className="mb-2"
          >
            <Typography.Title level={1}>Contact Us</Typography.Title>
            <Typography.Text>Contact Us</Typography.Text>
          </Col>
          <Col span={18}>
            <Card
              style={{ overflow: 'hidden' }}
              bodyStyle={{ padding: '0', overflow: 'hidden' }}
            >
              <Space
                align="center"
                style={{ width: '100%', background: '#008d7d' }}
              >
                <div style={{ width: '380px', padding: '15px 15px 15px 20px' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <List
                      itemLayout="horizontal"
                      dataSource={contacts}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar icon={item.icon} />}
                            title={item.title}
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />
                  </Space>
                </div>

                <div
                  style={{
                    padding: '0 20px',
                    width: '765px',
                    background: '#fff',
                  }}
                >
                  <div style={{ padding: '20px', width: '100%' }}>
                    <ContactForm />
                  </div>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </div> */}

      <Modal
        width={'100%'}
        title={templateSelected?.title}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        style={{ top: '15px' }}
        bodyStyle={{ padding: '0' }}
      >
        <iframe
          src={templateSelected?.preview_url}
          style={{
            border: 'none',
            boxShadow: 'none',
            width: '100%',
            height: '85vh',
          }}
        />
      </Modal>
    </main>
  )
}

export default Dashboard
