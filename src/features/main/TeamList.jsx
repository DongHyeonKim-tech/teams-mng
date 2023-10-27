import React from "react";
import { Table } from "antd";

const TeamList = ({
  tabMenu = "Team",
  dataSource = [],
  selectedRow,
  setSelectedRow,
}) => {
  console.log("dataSource: ", dataSource);
  const teamColumns = [
    {
      title: "No",
      dataIndex: "key",
      width: "10%",
      align: "center",
    },
    {
      title: "팀명",
      dataIndex: "displayName",
      width: "30%",
      align: "center",
    },
    {
      title: "팀 설명",
      dataIndex: "description",
      width: "60%",
      align: "center",
    },
  ];

  const testColumns = [
    { title: "No", dataIndex: "key", align: "center", width: "6%" },
    { title: "평가명", dataIndex: "name", align: "center" },
    { title: "평가유형", dataIndex: "test_type", align: "center" },
    { title: "최대참여인원", dataIndex: "max_participants", align: "center" },
    { title: "시험시간", dataIndex: "test_datetime", align: "center" },
    {
      title: "결과 공개 시작 시간",
      dataIndex: "registration_start_date",
      align: "center",
    },
    {
      title: "결과 공개 마감 시간",
      dataIndex: "registration_end_date",
      align: "center",
    },
    {
      title: "문제생성여부",
      render: (_, record) => (record.is_generated_question ? "Y" : "N"),
      align: "center",
    },
    {
      title: "평가시작여부",
      render: (_, record) => (record.is_opened ? "Y" : "N"),
      align: "center",
    },
    {
      title: "결과공개여부",
      render: (_, record) => (record.is_result_open ? "Y" : "N"),
      align: "center",
    },

    {
      title: "사용여부",
      render: (_, record) => (record.is_used ? "Y" : "N"),
      align: "center",
    },
  ];

  return (
    <div style={{ height: "90%", width: "100%" }}>
      <Table
        columns={tabMenu === "Team" ? teamColumns : testColumns}
        dataSource={dataSource}
        pagination={false}
        scroll={{
          y: 500,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectedRow(record);
            },
          };
        }}
        rowClassName={(record, idx) => {
          return record.key === selectedRow.key
            ? "selected-row"
            : "un-selected-row";
        }}
        tableLayout={"auto"}
      />
    </div>
  );
};

export default TeamList;
