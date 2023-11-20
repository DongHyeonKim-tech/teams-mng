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

  return (
    <Modal
      open={open}
      onCancel={() => {
        onClose();
        setArrChoicedEmp([]);
        setTeamUserList([]);
        setArrEvlUser([]);
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
                arrDeleteUser.map((item) => {
                  setTimeout(() => {
                    deleteChannelUser(
                      token,
                      channelInfo?.teamId,
                      channelInfo?.id,
                      item.membershipId
                    ).then((deleteRes) => {
                      deleteTeamUser(
                        token,
                        channelInfo?.teamId,
                        item.membershipId
                      );
                    });
                  }, 1000);
                });
              }
              if (arrInsertUser.length > 0) {
                arrInsertUser.map((item) => {
                  setTimeout(() => {
                    addTeamUser(token, channelInfo?.teamId, item.id).then(
                      () => {
                        addChannelUser(
                          token,
                          channelInfo?.teamId,
                          channelInfo?.id,
                          item.id
                        );
                      }
                    );
                  }, 1000);
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
