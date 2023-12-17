import React from "react";
import { Select } from "antd";
import shoedata from "../../modal/shoedata";
const { Option } = Select;
const WishSelect = (props) => {
  function onChange(value) {
    props.setwish(value);
  }

  function onSearch(val) {
    console.log("search:", val);
  }
  return (
    <>
      <Select
        showSearch
        //mode="tags"
        allowClear
        className="w-full select-width"
        style={{ maxWidth: "100%" }}
        placeholder="Select a SKU"
        // value={props.wish}
        // optionFilterProp="children"
        onChange={onChange}
        // onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {shoedata.map((item, ind) => (
          <Option key={ind} value={item.SKU}>
            {item.Shoe}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default WishSelect;
