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

const GetEvlListPopup = ({ open, onClose, arrEmp, setArrChoicedEmp }) => {
  const [evlList, setEvlList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState("");

  useEffect(() => {
    client.get("/BIMTest/manage/tests").then((response) => {
      setEvlList(
        response.data.map((item, idx) => {
          return { ...item, key: idx + 1 };
        })
      );
    });
  }, []);

  const getEvlEmpList = (seq) => {
    setSelectedRowKey(seq);
    client.get(`/BIMTest/manage/tests/${seq}/users`).then((response) => {
      console.log("response: ", response);
      //   setChannelData(
      //     response.data.map((item, idx) => {
      //       return { ...item, key: idx + 1 };
      //     })
      //   );
      let empNoList = response.data.map((item) => item.empno);
      setEmpList(arrEmp.filter((item) => empNoList.includes(item.USER_NO)));
    });
  };

  const fnButtonClick = () => {
    setArrChoicedEmp((prev) => {
      return [...prev, ...empList];
    });
  };

  useEffect(() => console.log("evlList: ", evlList), [evlList]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        onClose();
        setSelectedRowKey(null);
      }}
      title={"평가 목록"}
      footer={
        <button
          onClick={() => {
            fnButtonClick();
            onClose();
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
                key={item.seq}
                sx={{
                  backgroundColor:
                    item.seq === selectedRowKey ? "#d4d4d4" : "#ffffff",
                }}
                disablePadding
              >
                <ListItemButton onClick={() => getEvlEmpList(item.seq)}>
                  <ListItemText
                    primary={`${item.test_type} - ${item.name} `}
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
