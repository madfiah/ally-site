import { Button, Modal, Select, Space, Table } from 'antd'

interface Props {
  isOpen: boolean
  closeModal: any
  selectInvestor: any
  investmentOption: any
  onNext: any
}

const InvestorPopup = ({
  isOpen,
  closeModal,
  selectInvestor,
  investmentOption,
  onNext,
}: Props) => {
  const filterOption = (
    input: string,
    option: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <Modal
      title="Select Investor"
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      centered
      width={375}
    >
      <Space direction="vertical" size={15} style={{ marginTop: 15 }}>
        <Select
          showSearch
          allowClear
          placeholder="Select Type of Contract"
          style={{ width: 325 }}
          onChange={selectInvestor}
          filterOption={filterOption}
          options={investmentOption}
        />

        <Button type="primary" onClick={onNext}>
          Next to Preview
        </Button>
      </Space>
    </Modal>
  )
}

export default InvestorPopup
