import { Paper } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Input, notification } from "antd";
const { Search } = Input;

export const SearchEmp = ({ value, onChange, onSearch }) => {
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

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

export const Notification = (
  type = "info",
  message,
  description,
  placement = "bottomRight",
  duration = 4.5
) => {
  return notification[type]({
    message: message,
    description: description,
    placement: placement,
    duration: duration
  });
};
