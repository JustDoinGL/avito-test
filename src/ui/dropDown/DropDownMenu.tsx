/* eslint-disable react-hooks/exhaustive-deps */
import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { DropDownMenuProps, EnumValue } from './DropDownMenu.type'
import { useCallback } from 'react'

const DropDownMenu = <T extends object>({ enumObj, selectedValue, onSelect }: DropDownMenuProps<T>) => {
  const onSelectRating = useCallback((value: EnumValue<T>) => {
    onSelect(value)
  }, [])

  const menu = (
    <Menu onClick={(e) => onSelectRating(enumObj[e.key as keyof T])}>
      {Object.entries(enumObj).map(([key, value]) => (
        <Menu.Item key={key}>{value}</Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <Button>
        {String(selectedValue)} <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default DropDownMenu
