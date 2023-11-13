import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { Box, Grid } from "@mui/material";
import { Item } from "../../common/utils";
import Info from "./comp/Info";
import EmpList from "./comp/EmpList";
import SelectedEmpList from "./comp/SelectedEmpList";
import { callMsGraph } from "../../../graph";

const RegistChannelPopup = ({
  open,
  isCreate = true,
  onClose,
  channelInfo,
  tabMenu,
  token,
}) => {
  const [arrEmp, setArrEmp] = useState([]);
  const [arrChoicedEmp, setArrChoicedEmp] = useState([]);
  const [objChannel, setObjChannel] = useState({
    displayName: "",
    description: "",
  });

  const [originData, setOriginData] = useState([]);

  useEffect(() => {
    if (token) {
      callMsGraph(token, "user").then((res) => {
        console.log("user: ", res);
        setOriginData(res.value);
        setArrEmp(res.value);
      });
    }
  }, [token]);

  useEffect(() => console.log("originData: ", originData), [originData]);

  useEffect(() => {
    let arrChoicedEmpNo = arrChoicedEmp.map((item) => item.USER_NO);
    const empData = originData.filter(
      (item) => !arrChoicedEmpNo.includes(item.USER_NO)
    );
    setArrEmp(empData);
  }, [arrChoicedEmp]);

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
                originData={originData}
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
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default RegistChannelPopup;
