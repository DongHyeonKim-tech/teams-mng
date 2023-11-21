import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons/lib/icons";

const SelectedEmpList = ({
  arrChoicedEmp,
  setArrChoicedEmp,
  setEvlListPopupOpen,
  isManager,
}) => {
  return (
    <>
      <div className={"registContentTitle"}>
        선택된 직원 ({arrChoicedEmp.length}명)
        <Button
          style={{
            cursor: "pointer",
            float: "right",
          }}
          disabled={!isManager}
          onClick={() => {
            if (isManager) {
              setArrChoicedEmp((prev) => {
                return prev.filter((item) => !item.canDelete);
              });
            }
          }}
        >
          전체 선택 해제
        </Button>
        <Button
          style={{
            cursor: "pointer",
            float: "right",
            marginRight: "10px",
          }}
          disabled={!isManager}
          onClick={() => {
            if (isManager) {
              setEvlListPopupOpen(true);
            }
          }}
        >
          평가 응시 인원 가져오기
        </Button>
      </div>
      <div
        className={"evalInfo"}
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
          {arrChoicedEmp.length > 0 ? (
            arrChoicedEmp.map((item) => {
              return (
                <div key={item.id}>
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton
                      sx={{
                        cursor: "auto",
                      }}
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
                      {item.canDelete && (
                        <CloseCircleOutlined
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setArrChoicedEmp((prev) => {
                              return prev.filter(
                                (value) => value.id !== item.id
                              );
                            });
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </div>
              );
            })
          ) : (
            <div
              style={{
                position: "relative",
                top: "50%",
                transform: "translate(0, -50%)",
                color: "#C7C7C7",
                fontFamily: "Pretendard",
                fontSize: "15px",
              }}
            >
              좌측 영역에서 직원을 조회하여
              <br />
              응시자를 선택하세요.
            </div>
          )}
        </List>
      </div>
    </>
  );
};

export default SelectedEmpList;
