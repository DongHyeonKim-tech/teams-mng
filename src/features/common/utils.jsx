import { Input } from "antd";

const { Search } = Input;

export const SearchEmp = ({ value, onChange, onSearch }) => {
  console.log("value: ", value);
  return (
    <Search
      style={{ width: "200px", float: "right" }}
      placeholder={"직원명 검색"}
      value={value}
      onChange={onChange}
      onSearch={onSearch}
    />
  );
};
