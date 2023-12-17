import React from "react";
import { Select } from "antd";

const { Option } = Select;
const SizeSelect = (props) => {
  function onChange(value) {
    props.setsize(value);
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log("search:", val);
  }
  function range(start, end) {
    if (start === end) return [start];
    return [start, ...range(start + 0.5, end)];
  }
  return (
    <>
      <Select
        showSearch
        //mode="tags"
        allowClear
        className="w-full select-width"
        style={{ maxWidth: "100%" }}
        placeholder="Select Size"
        // value={props.wish}
        // optionFilterProp="children"
        onChange={onChange}
        // onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {range(6, 12).map((item, ind) => (
          <Option key={ind} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SizeSelect;
