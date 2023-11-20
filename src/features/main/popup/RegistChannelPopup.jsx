import React, { useState, useEffect } from "react";
import { Modal, Button, Spin } from "antd";
import { Box, Grid } from "@mui/material";
import { Item } from "../../common/utils";
import Info from "./comp/Info";
import EmpList from "./comp/EmpList";
import SelectedEmpList from "./comp/SelectedEmpList";
import {
  getUserList,
  getTeamUserList,
  getEvlUserList,
  addTeamUser,
  addChannelUser,
  deleteChannelUser,
  deleteTeamUser,
} from "../../../graph";
import GetEvlListPopup from "./GetEvlListPopup";
import { Notification } from "../../common/utils";

const RegistChannelPopup = ({
  open,
  isCreate = true,
  onClose,
  channelInfo,
  tabMenu,
  token,
}) => {
  // 직원 조회 명단
  const [arrEmp, setArrEmp] = useState([]);
  // 선택된 직원 명단
  const [arrChoicedEmp, setArrChoicedEmp] = useState([]);
  // 채널 정보
  const [objChannel, setObjChannel] = useState({
    displayName: "",
    description: "",
  });

  useEffect(() => {
    if (token) {
      // 초기 직원 명단 조회
      getUserList(token).then((res) => {
        let data = res.value.map((item) => {
          return {
            ...item,
            user_id: item.mail.split("@")[0],
          };
        });
        setArrEmp(data);
      });
    }
  }, [token]);

  // teams channel user 명단
  const [teamUserList, setTeamUserList] = useState([]);
  // teams channel user -> user 조회 명단
  const [arrEvlUser, setArrEvlUser] = useState([]);

  useEffect(() => {
    if (!isCreate && channelInfo?.id) {
      setArrChoicedEmp([]);
      setTeamUserList([]);
      setArrEvlUser([]);
      setRegistPopupLoading(true);
      getTeamUserList(token, channelInfo?.teamId, channelInfo?.id).then(
        (teamUserListRes) => {
          if (teamUserListRes.value.length > 0) {
            setTeamUserList(teamUserListRes.value);
            teamUserListRes.value.map((item) => {
              getEvlUserList(token, item.email).then((evlUserListRes) => {
                // Teams API에 결과 값이 있을 시
                if (evlUserListRes.value.length > 0) {
                  let evlUser = evlUserListRes.value[0];
                  setArrEvlUser((prev) => {
                    return [...prev, { ...evlUser, membershipId: item.id }];
                  });

                  setArrChoicedEmp((prev) => {
                    const arrPrevUserMail = prev.map((item) => item.mail);
                    let returnValue = arrPrevUserMail.includes(evlUser.mail)
                      ? prev
                      : [
                          ...prev,
                          {
                            ...evlUser,
                            // owner면 삭제 불가
                            canDelete: !item.roles.includes("owner"),
                          },
                        ];

                    return returnValue;
                  });
                } else {
                  // Teams API에 결과값이 없을 시
                  setTeamUserList((prev) => {
                    return prev.filter(
                      (prevItem) => prevItem.user_id === item.user_id
                    );
                  });
                }
              });
            });
          }
        }
      );
    }
  }, [isCreate, channelInfo]);
  const [registPopupLoading, setRegistPopupLoading] = useState(true);
  useEffect(() => {
    if (teamUserList.length > 0 && teamUserList.length === arrEvlUser.length) {
      setRegistPopupLoading(false);
    }
  }, [teamUserList, arrEvlUser]);

  const [evlListPopupOpen, setEvlListPopupOpen] = useState(false);
  const onEvlListPopuClose = () => setEvlListPopupOpen(false);
  const [loading, setLoading] = useState(false);

  const [cnt, setCnt] = useState(0);
  const [maxCnt, setMaxCnt] = useState(0);

  const onCloseModal = () => {
    setMaxCnt(0);
    setCnt(0);
    onClose();
    setArrChoicedEmp([]);
    setTeamUserList([]);
    setArrEvlUser([]);
  };

  useEffect(() => {
    if (cnt > 0 && maxCnt > 0) {
      if (cnt === maxCnt) {
        Notification(
          "success",
          "채널 인원 작업 완료",
          "채널 인원 추가 및 삭제 작업이 완료되었습니다."
        );
        onCloseModal();
      }
    }
  }, [cnt, maxCnt]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        onCloseModal();
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
          onClick={() => {
            // 수정
            if (!isCreate) {
              const arrEvlUserMail = arrEvlUser.map((item) => item.mail);
              const arrChoicedEmpMail = arrChoicedEmp.map((item) => item.mail);
              let arrDeleteUser = arrEvlUser.filter(
                (item) => !arrChoicedEmpMail.includes(item.mail)
              );
              let arrInsertUser = arrChoicedEmp.filter(
                (item) => !arrEvlUserMail.includes(item.mail)
              );
              if (arrDeleteUser.length > 0) {
                setMaxCnt((prev) => {
                  return Number(prev) + Number(arrDeleteUser.length);
                });
                arrDeleteUser.map((item) => {
                  deleteChannelUser(
                    token,
                    channelInfo?.teamId,
                    channelInfo?.id,
                    item.membershipId
                  )
                    .then(() => {
                      setTimeout(() => {
                        deleteTeamUser(
                          token,
                          channelInfo?.teamId,
                          item.membershipId
                        ).catch((err) => {
                          console.log("유저 팀 삭제: ", err);
                        });
                      }, 3000);
                    })
                    .catch((err) => {
                      console.log("유저 채널 삭제: ", err);
                    });
                  setCnt((prev) => Number(prev) + 1);
                });
              }
              if (arrInsertUser.length > 0) {
                setMaxCnt((prev) => {
                  return Number(prev) + Number(arrInsertUser.length);
                });
                arrInsertUser.map((item) => {
                  addTeamUser(token, channelInfo?.teamId, item.id)
                    .then(() => {
                      setTimeout(() => {
                        addChannelUser(
                          token,
                          channelInfo?.teamId,
                          channelInfo?.id,
                          item.id
                        ).catch((err) => {
                          console.log("유저 채널 추가: ", err);
                        });
                      }, 3000);
                    })
                    .catch((err) => {
                      console.log("유저 팀 추가: ", err);
                    });
                  setCnt((prev) => Number(prev) + 1);
                });
              }
            }
          }}
        >
          {isCreate ? "추가" : "수정"}
        </Button>
      }
    >
      <Spin spinning={loading | registPopupLoading}>
        <GetEvlListPopup
          open={evlListPopupOpen}
          onClose={onEvlListPopuClose}
          arrChoicedEmp={arrChoicedEmp}
          setArrChoicedEmp={setArrChoicedEmp}
          token={token}
          setLoading={setLoading}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 8 }}
            display={"flex"}
          >
            <Grid item xs={2} sm={4} md={2} key={1}>
              <Item>
                <Info
                  title={"채널 정보"}
                  data={channelInfo}
                  isCreate={isCreate}
                  obj={objChannel}
                  setObj={setObjChannel}
                />
              </Item>
            </Grid>
            <Grid item xs={2} sm={4} md={3} key={2}>
              <Item>
                <EmpList
                  arrEmp={arrEmp}
                  setArrEmp={setArrEmp}
                  arrChoicedEmp={arrChoicedEmp}
                  setArrChoicedEmp={setArrChoicedEmp}
                  token={token}
                />
              </Item>
            </Grid>
            <Grid item xs={2} sm={4} md={3} key={3}>
              <Item>
                <SelectedEmpList
                  arrEmp={arrEmp}
                  arrChoicedEmp={arrChoicedEmp}
                  setArrChoicedEmp={setArrChoicedEmp}
                  setEvlListPopupOpen={setEvlListPopupOpen}
                />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Spin>
    </Modal>
  );
};

export default RegistChannelPopup;
