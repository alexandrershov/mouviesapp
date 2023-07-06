import './SearchForm.css';
import { AutoComplete, Space } from 'antd';
import { useState } from 'react';

const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });

const SearchForm = ({onChangeSerch}) => {
    const [options, setOptions] = useState([]);
    const getPanelValue = (searchText) =>
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

    return (
        <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <AutoComplete
        placeholder='Slap me boy ...'
        options={options}
        onSearch={(text) => setOptions(getPanelValue(text))}
        style={{
          width: '90%',
          height: 40,
          color: '#FFFFFF'
        }}
        onChange={onChangeSerch}
        open={false}
      />
    </Space>
    )
}

export default SearchForm;