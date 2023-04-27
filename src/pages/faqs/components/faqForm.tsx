import { Button, Form, Input, InputNumber, Modal, Space, Select } from 'antd'
import { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface Props {
  isOpen: boolean
  faq: any
  handleCancel: any
}

const FaqForm = ({ isOpen, faq, handleCancel }: Props) => {
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm()

  const handleEditorChange = (content: any, editor: any) => {
    console.log('Content was updated:', content)
  }

  useEffect(() => {
    if (!isOpen) {
      form.resetFields()
    } else {
      form.setFieldsValue(faq)
    }
  }, [form, isOpen, faq])

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      title="Form Faq"
      style={{ top: 20 }}
      width={850}
    >
      <Form
        form={form}
        name="basic"
        layout="vertical"
        style={{ maxWidth: 850 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mt-2"
      >
        <Form.Item
          label="Question"
          name="question"
          rules={[{ required: true, message: 'Please input question!' }]}
        >
          <Input placeholder="Enter the question" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select category" allowClear>
            <Select.Option value="For SME">For SME</Select.Option>
            <Select.Option value="For Financiers (Member)">
              For Financiers (Member)
            </Select.Option>
            <Select.Option value="For Donation">For Donation</Select.Option>
            <Select.Option value="e-Wallet">e-Wallet</Select.Option>
          </Select>
        </Form.Item>

        {loading && <center className="mt-2">Loading..</center>}

        <div
          className="mb-1"
          style={{ visibility: `${loading ? 'hidden' : 'visible'}` }}
        >
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true }]}
          >
            <Editor
              onChange={(e, d) => console.log(e.target.value, d)}
              initialValue={faq ? faq.message : null}
              onInit={(e, editor) => {
                setLoading(false)
              }}
              init={{
                height: 300,
                width: '100%',
                plugins: [
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'code',
                  'help',
                  'wordcount',
                ],
                toolbar:
                  'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
              onEditorChange={handleEditorChange}
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FaqForm
