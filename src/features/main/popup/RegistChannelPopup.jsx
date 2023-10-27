import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import {
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { tmpEmpData } from "../../../tmp";
import { CloseCircleOutlined } from "@ant-design/icons/lib/icons";
import { SearchEmp } from "../../common/utils";

const RegistChannelPopup = ({
  open,
  isCreate = true,
  onClose,
  channelInfo,
  tabMenu,
}) => {
  const [arrEmp, setArrEmp] = useState(tmpEmpData);
  const [arrChoicedEmp, setArrChoicedEmp] = useState([]);
  const [objChannel, setObjChannel] = useState({
    displayName: "",
    description: "",
  });
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
  };

  useEffect(() => console.log("objChannel: ", objChannel), [objChannel]);

  useEffect(() => console.log("inputValue: ", inputValue), [inputValue]);

  useEffect(() => {
    console.log("change");
    let arrChoicedEmpNo = arrChoicedEmp.map((item) => item.USER_NO);
    const empData = tmpEmpData.filter(
      (item) => !arrChoicedEmpNo.includes(item.USER_NO)
    );
    setArrEmp(empData);
  }, [arrChoicedEmp]);

  useEffect(() => console.log("channelInfo: ", channelInfo), [channelInfo]);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none",
  }));
  return (
    <Modal
      open={open}
      onCancel={() => {
        onClose();
        setArrChoicedEmp([]);
      }}
      width={1500}
      style={{ minWidth: "1200px" }}
      title={
        <>
          <div className={"modalTitle"} style={{ marginBottom: "20px" }}>
            {`채널 ${isCreate ? "추가" : "수정"}`}
          </div>
        </>
      }
      footer={
        <Button
          type="primary"
          style={{
            width: "140px",
            height: "43px",
            margin: "-12px 12px 0px 0px",
          }}
          onClick={() => console.log("신청 데이터: ", arrChoicedEmp)}
        >
          {isCreate ? "추가" : "수정"}
        </Button>
      }
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 8 }}
          display={"flex"}
        >
          <Grid item xs={2} sm={4} md={2} key={1}>
            <Item>
              <div className={"registContentTitle"}>채널정보</div>

              <div className={"channelInfo"} style={{ padding: "24px" }}>
                {/* <span className={"channelInfoTitle"}>
                  {channelInfo?.testNm}
                </span> */}
                <span className={"channelInfoLabel"} style={{ width: "80px" }}>
                  {"팀명"}
                </span>
                <span className={"channelInfoData"}>
                  {channelInfo?.teamDisplayName}
                </span>
                <span className={"channelInfoLabel"}>{"팀 설명"}</span>
                <span className={"channelInfoData"}>
                  {channelInfo?.teamDescription}
                </span>
                <span className={"channelInfoLabel"} style={{ width: "80px" }}>
                  {"채널명"}
                </span>
                <span className={"channelInfoData"}>
                  {isCreate ? (
                    <Input
                      value={objChannel?.displayName}
                      onChange={(e) =>
                        setObjChannel((prev) => {
                          return { ...prev, displayName: e.target.value };
                        })
                      }
                    />
                  ) : (
                    channelInfo?.displayName
                  )}
                </span>
                <span className={"channelInfoLabel"}>{"채널 설명"}</span>
                <span className={"channelInfoData"}>
                  {isCreate ? (
                    <Input
                      value={objChannel?.description}
                      onChange={(e) =>
                        setObjChannel((prev) => {
                          return { ...prev, description: e.target.value };
                        })
                      }
                    />
                  ) : (
                    channelInfo?.description
                  )}
                </span>
              </div>
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={3} key={2}>
            <Item>
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
                      <>
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
                      </>
                    );
                  })}
                </List>
              </div>
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={3} key={3}>
            <Item>
              <div className={"registContentTitle"}>
                선택된 직원
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
                    setArrChoicedEmp([]);
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
                    arrChoicedEmp.map((item, idx) => {
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
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default RegistChannelPopup;
