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
import { getUserList, getSearchUserList } from "../../../../graph";
import { notification } from "antd";

const EmpList = ({
  arrEmp,
  setArrEmp,
  arrChoicedEmp,
  setArrChoicedEmp,
  token,
}) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSearch = (value) => {
    if (value) {
      getSearchUserList(token, value).then((res) => {
        setArrEmp(res.value);
      });
    } else {
      getUserList(token).then((res) => {
        setArrEmp(res.value);
      });
    }
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
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    onClick={() =>
                      setArrChoicedEmp((prev) => {
                        let arrChoicedUserId = prev.map(
                          (item) => item.mail.split("@")[0]
                        );
                        let user_id = item.mail.split("@")[0];
                        if (arrChoicedUserId.includes(user_id)) {
                          notification.warning({
                            message: "이미 추가된 직원입니다.",
                          });
                          return prev;
                        } else {
                          setArrEmp((prev) => {
                            return prev.filter(
                              (prevItem) => prevItem.id !== item.id
                            );
                          });
                          return [...prev, { ...item, canDelete: true }];
                        }
                      })
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={`https://hub.haeahn.com/Storage/GW/ImageStorage/Employee/${
                          item.mail.split("@")[0]
                        }.jpg`}
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50px",
                        }}
                        alt="profile"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${item.displayName} `}
                      disableTypography={true}
                      className={"listItemTextName"}
                      sx={{ flex: "none" }}
                    />
                    <ListItemText
                      primary={`${item.jobTitle}`}
                      disableTypography={true}
                      className={"listItemText"}
                      sx={{ flex: "none" }}
                    />
                    {/* <ListItemText
                      primary={`${item.DEPT_NM}`}
                      disableTypography={true}
                      className={"listItemText"}
                      sx={{ color: "#ADAEB1" }}
                    /> */}
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
