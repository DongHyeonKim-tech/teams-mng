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
import { CloseCircleOutlined } from "@ant-design/icons/lib/icons";
import GetEvlListPopup from "../GetEvlListPopup";

const SelectedEmpList = ({ arrEmp, arrChoicedEmp, setArrChoicedEmp }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  return (
    <>
      <GetEvlListPopup
        open={open}
        onClose={onClose}
        arrChoicedEmp={arrChoicedEmp}
        setArrChoicedEmp={setArrChoicedEmp}
      />
      <div className={"registContentTitle"}>
        선택된 직원 ({arrChoicedEmp.length}명)
        <button
          style={{
            cursor: "pointer",
            float: "right",
          }}
          onClick={() => {
            setArrChoicedEmp([]);
          }}
        >
          전체 선택 해제
        </button>
        <button
          style={{
            cursor: "pointer",
            float: "right",
            marginRight: "10px",
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          평가 응시 인원 가져오기
        </button>
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
                <>
                  <ListItem key={item.USER_NO} disablePadding>
                    <ListItemButton
                      sx={{
                        cursor: "auto",
                      }}
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
                      <CloseCircleOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setArrChoicedEmp((prev) => {
                            return prev.filter(
                              (value) => value.USER_NO !== item.USER_NO
                            );
                          });
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
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
