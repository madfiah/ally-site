import { Api } from '@/api/api'
import { Input, Select } from 'antd'
import { useEffect, useState } from 'react'

interface IProps {
  inputRef: any
  selectedKeys: any
  setSelectedKeys: any
  handleSearch: any
  dataIndex: string
  token: string
  confirm: any
}

const FilterField = ({
  inputRef,
  selectedKeys,
  setSelectedKeys,
  handleSearch,
  dataIndex,
  token,
  confirm,
}: IProps) => {
  const [campaigns, setCampaigns] = useState<any>(null)
  const [filter, setFilter] = useState('')

  const init = () => {
    Api.get(`campaign/options?filter=${filter}`, token).then((res: any) => {
      setCampaigns(res.data)
    })
  }

  const campaignSearch = (newValue: string) => {
    setFilter(newValue)

    if (newValue.length > 1) {
      init()
    }
  }

  const handleChange = (newValue: string) => {
    setSelectedKeys(newValue ? [newValue] : [])
  }

  const SetField = () => {
    switch (dataIndex) {
      case 'campaign_name':
        return (
          <Select
            showSearch
            value={filter}
            style={{ display: 'block' }}
            placeholder={'Search Campaign'}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={campaignSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={campaigns}
          />
        )
        break

      default:
        return (
          <Input
            ref={inputRef}
            placeholder={`Search campaign`}
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }}
            onPressEnter={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            style={{ marginBottom: 8, display: 'block' }}
          />
        )
        break
    }
  }

  return <SetField />
}

export default FilterField
