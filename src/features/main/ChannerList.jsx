import React from "react";
import { Table, Button } from "antd";

const ChannelList = ({
  dataSource = [],
  tabMenu,
  setOpen,
  setSelectedChannel,
  setIsCreate,
}) => {
  const channelColumns = [
    {
      title: "No",
      dataIndex: "key",
      width: "10%",
      align: "center",
    },
    {
      title: "채널명",
      dataIndex: "displayName",
      width: "30%",
      align: "center",
    },
    {
      title: "채널 설명",
      dataIndex: "description",
      width: "60%",
      align: "center",
    },
  ];

  const userColumns = [
    { title: "No", dataIndex: "key", align: "center" },
    { title: "이름", dataIndex: "name", align: "center" },
    { title: "사번", dataIndex: "empno", align: "center" },
    { title: "사내전화", dataIndex: "phone", align: "center" },
    {
      title: "감독자여부",
      align: "center",
      render: (_, record) => (record.is_observer ? "Y" : "N"),
    },
    {
      title: "시작여부",
      align: "center",
      render: (_, record) => (record.is_started ? "Y" : "N"),
    },
    {
      title: "제출여부",
      align: "center",
      render: (_, record) => (record.is_submitted ? "Y" : "N"),
    },
    {
      title: "삭제가능여부",
      align: "center",
      render: (_, record) => (record.can_delete ? "Y" : "N"),
    },
    {
      title: "점수",
      dataIndex: "score",
      align: "center",
      render: (text) => text ?? "0",
    },
  ];

  return (
    <div style={{ height: "90%", width: "100%" }}>
      <Table
        columns={tabMenu === "Team" ? channelColumns : userColumns}
        dataSource={dataSource}
        pagination={false}
        scroll={{
          y: 500,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              if (tabMenu === "Team") {
                setOpen(true);
                setSelectedChannel(record);
                setIsCreate(false);
              }
            },
          };
        }}
        rowClassName={(record, idx) => {
          if (tabMenu === "Team") {
            return "un-selected-row";
          }
        }}
      />
    </div>
  );
};

export default ChannelList;
