import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import { SearchEmp } from "../../../common/utils";
import { callMsGraph } from "../../../../graph";

const EmpList = ({
  originData,
  arrEmp,
  setArrEmp,
  arrChoicedEmp,
  setArrChoicedEmp,
  token,
}) => {
  console.log("arrEmp: ", arrEmp);
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSearch = (value) => {
    console.log("value: ", value);
    let arrChoicedEmpNo = arrChoicedEmp.map((item) => item.USER_NO);
    setArrEmp(
      tmpEmpData.filter(
        (item) =>
          item.USER_NM.includes(value) &&
          !arrChoicedEmpNo.includes(item.USER_NO)
      )
    );
    callMsGraph(token, "searchUser");
  };
  return (
    <>
      <div className={"registContentTitle"}>
        직원 조회
        <SearchEmp
          value={inputValue}
          onChange={onInputChange}
          onSearch={onSearch}
        />
      </div>
      <div
        className={"channelInfo"}
        style={{
          backgroundColor: "#FFFFFF",
          height: "540px",
        }}
      >
        <List
          className={"list"}
          dense
          sx={{
            bgcolor: "background.paper",
            padding: "0px",
          }}
        >
          {arrEmp.map((item, idx) => {
            return (
              <div key={idx}>
                <ListItem key={item.USER_NO} disablePadding>
                  <ListItemButton
                    onClick={() =>
                      setArrChoicedEmp((prev) => {
                        return [...prev, item];
                      })
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={`https://hub.haeahn.com/Storage/GW/ImageStorage/Employee/${item.USER_ID}.jpg`}
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50px",
                        }}
                        alt="profile"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${item.USER_NM} `}
                      disableTypography={true}
                      className={"listItemTextName"}
                      sx={{ flex: "none" }}
                    />
                    <ListItemText
                      primary={`${item.TITLE_NM}`}
                      disableTypography={true}
                      className={"listItemText"}
                      sx={{ flex: "none" }}
                    />
                    <ListItemText
                      primary={`${item.DEPT_NM}`}
                      disableTypography={true}
                      className={"listItemText"}
                      sx={{ color: "#ADAEB1" }}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    </>
  );
};

export default EmpList;
