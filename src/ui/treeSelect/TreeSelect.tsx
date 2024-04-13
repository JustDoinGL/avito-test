import { TreeSelect } from 'antd'
import { TreeSelectProps } from './TreeSelect.type'
const { TreeNode } = TreeSelect

const TreeSelectContent = ({ content, placeholder, selectedValues, handleChange }: TreeSelectProps) => {
  return (
    <TreeSelect
      showSearch={false}
      style={{ maxWidth: 300, width: '100%' }}
      value={selectedValues}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder={placeholder}
      multiple
      treeCheckable
      onChange={handleChange}
    >
      {content.map((element, index) => (
        <TreeNode value={element} title={element} key={index} />
      ))}
    </TreeSelect>
  )
}

export default TreeSelectContent
