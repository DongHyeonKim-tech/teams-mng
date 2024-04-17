import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import client from "../../../api/client";
import { getEvlUserList } from "../../../graph";

const GetEvlListPopup = ({
  open,
  onClose,
  arrChoicedEmp,
  setArrChoicedEmp,
  token,
  setLoading,
}) => {
  const [evlList, setEvlList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState("");

  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    client.get("/BIMTestManage/tests").then((response) => {
      setEvlList(
        response.data.map((item, idx) => {
          return { ...item, key: idx + 1 };
        })
      );
    });
  }, []);

  const getEvlEmpList = (test_id) => {
    setSelectedRowKey(test_id);
    client.get(`/BIMTestManage/tests/${test_id}/users`).then((response) => {
      let userIdList = arrChoicedEmp.map((item) => item.mail.split("@")[0]);
      setEmpList(
        userIdList.length > 0
          ? response.data.filter((item) => !userIdList.includes(item.user_id))
          : response.data
      );
    });
  };

  const fnButtonClick = async () => {
    setLoading(true);
    empList.map((item) => {
      getEvlUserList(token, `${item.user_id}@`).then((res) => {
        if (res.value.length > 0) {
          let user = res.value[0];
          setUserCount((prev) => Number(prev) + 1);
          setArrChoicedEmp((prev) => {
            return [...prev, { ...user, canDelete: true }];
          });
        } else {
          setEmpList((prev) => {
            return prev.filter((prevItem) => prevItem.user_id !== item.user_id);
          });
        }
      });
    });
  };

  useEffect(() => {
    if (userCount > 0 && userCount === empList.length) {
      setLoading(false);
      WebSocket.close();
    }
  }, [userCount, empList]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        onClose();
        setSelectedRowKey("");
      }}
      title={"평가 목록"}
      footer={
        <button
          onClick={() => {
            fnButtonClick();
            onClose();
            setUserCount(0);
          }}
        >
          확인
        </button>
      }
    >
      <List
        className={"list"}
        dense
        sx={{
          bgcolor: "background.paper",
          padding: "0px",
        }}
      >
        {evlList.map((item) => {
          return (
            <div key={item.key}>
              <ListItem
                key={item.test_id}
                sx={{
                  backgroundColor:
                    item.test_id === selectedRowKey ? "#d4d4d4" : "#ffffff",
                }}
                disablePadding
              >
                <ListItemButton onClick={() => getEvlEmpList(item.test_id)}>
                  <ListItemText
                    primary={`${item.subject_name.split("-")[1]} - ${
                      item.test_type_nm
                    } - ${item.test_nm} `}
                    disableTypography={true}
                    className={"listItemTextName"}
                    sx={{ flex: "none" }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </Modal>
  );
};

export default GetEvlListPopup;
