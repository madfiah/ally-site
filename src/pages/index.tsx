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

  const data = [
    'Static Website',
    '1 Web Page / Landing Page',
    'Free Hosting',
    'Free Domain (.my.id, )',
    'Basic SEO',
    'Free SSL',
    'Free 1 Email Account',
    'Contact Section',
  ]
  const data2 = [
    'Static Website',
    '5 Web Page / Premium Landing Page',
    'Free 3 Email Account',
    'Blog Feature',
    'Basic SEO',
    'Free Domain (.com)',
    'Free Hosting',
    'Free Backup Monthly',
    'Free SSL',
    'Contact Section',
    'Subscribe Feature',
  ]

  const contacts = [
    {
      title: 'Email',
      description: 'contact@ally.web.id',
    },
    {
      title: 'WA',
      description: '+62 851 5686 6323',
    },
  ]

  return (
    <main style={{ maxWidth: '80vw', margin: 'auto' }}>
      <div id="header">
        <Row justify="center" align="middle" style={{ height: '30vh' }}>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Typography.Title level={1}>
              Welcome to Arlie Solution
            </Typography.Title>
            <Typography>
              Solusi mudah untuk anda memiliki website sendiri yang modern dan
              fungsional untuk mendukung bisnis online anda.
            </Typography>
          </Col>
        </Row>
      </div>

      <div id="pricing" style={{ width: '80%', margin: 'auto' }}>
        <Row gutter={50} justify="center" align="top">
          <Col span={10}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <Typography.Title level={1} style={{ marginBottom: '0px' }}>
                  Basic Plan
                </Typography.Title>
                <Space align="start">
                  <Typography.Title level={3} type="danger">
                    Rp.
                  </Typography.Title>
                  <Typography.Title type="danger" level={2}>
                    375.000
                    <Typography.Text type="secondary">/tahun</Typography.Text>
                  </Typography.Title>
                </Space>
              </div>
              <Divider />
              <List
                itemLayout="horizontal"
                dataSource={data}
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
            </Card>
          </Col>
          <Col span={10}>
            <Card style={{ border: '5px solid #008d7d' }}>
              <div style={{ textAlign: 'center' }}>
                <Typography.Title level={1} style={{ marginBottom: '0px' }}>
                  Business Plan
                </Typography.Title>
                <Space align="start">
                  <Typography.Title level={3} type="danger">
                    Rp.
                  </Typography.Title>
                  <Typography.Title type="danger" level={2}>
                    1.250.000
                    <Typography.Text type="secondary">/tahun</Typography.Text>
                  </Typography.Title>
                </Space>
              </div>
              <Divider />
              <List
                itemLayout="horizontal"
                dataSource={data2}
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
            </Card>
          </Col>
        </Row>
      </div>

      <div id="services" style={{ marginTop: '40px', padding: '50px 0' }}>
        <center>
          <Typography.Title level={1}>Our Services</Typography.Title>
          <Typography.Text>Yang anda dapatkan dari kami</Typography.Text>
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
      </div>

      <div id="templates" style={{ marginTop: '3rem', padding: '5rem 0' }}>
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

        <Row gutter={[20, 20]}>
          {filteredItems.map((item) => (
            <Col
              className="gutter-row"
              lg={6}
              md={12}
              sm={24}
              key={Math.random()}
            >
              <Card
                cover={<img alt="example" src={item.image} height={230} />}
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

      <div id="contact" style={{ padding: '50px 0' }}>
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
                            avatar={
                              <Avatar
                                icon={
                                  item.title.toLowerCase() === 'email' ? (
                                    <MailOutlined />
                                  ) : (
                                    <MobileOutlined />
                                  )
                                }
                              />
                            }
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
      </div>

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
