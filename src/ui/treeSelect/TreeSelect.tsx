import { TreeSelect } from 'antd'
import { TreeSelectProps } from './TreeSelect.type'
const { TreeNode } = TreeSelect

const TreeSelectContent = ({ content, placeholder, selectedValues, handleChange, multiple }: TreeSelectProps) => {
  return (
    <TreeSelect
      showSearch
      style={{ maxWidth: 300, width: '100%' }}
      value={selectedValues}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder={placeholder}
      multiple={multiple}
      treeCheckable
      onChange={handleChange}
    >
      {content.map((element) => (
        <TreeNode value={element} title={element} key={element} />
      ))}
    </TreeSelect>
  )
}

export default TreeSelectContent
