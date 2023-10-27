import React from "react";
import { Input } from "antd";

const Info = ({ title, data, isCreate, obj, setObj }) => {
  return (
    <>
      <div className={"registContentTitle"}>{title}</div>

      <div className={"channelInfo"} style={{ padding: "24px" }}>
        {/* <span className={"channelInfoTitle"}>
              {channelInfo?.testNm}
            </span> */}
        <span className={"channelInfoLabel"} style={{ width: "80px" }}>
          {"팀명"}
        </span>
        <span className={"channelInfoData"}>{data?.teamDisplayName}</span>
        <span className={"channelInfoLabel"}>{"팀 설명"}</span>
        <span className={"channelInfoData"}>{data?.teamDescription}</span>
        <span className={"channelInfoLabel"} style={{ width: "80px" }}>
          {"채널명"}
        </span>
        <span className={"channelInfoData"}>
          {isCreate ? (
            <Input
              value={obj?.displayName}
              onChange={(e) =>
                setObj((prev) => {
                  return { ...prev, displayName: e.target.value };
                })
              }
            />
          ) : (
            data?.displayName
          )}
        </span>
        <span className={"channelInfoLabel"}>{"채널 설명"}</span>
        <span className={"channelInfoData"}>
          {isCreate ? (
            <Input
              value={obj?.description}
              onChange={(e) =>
                setObj((prev) => {
                  return { ...prev, description: e.target.value };
                })
              }
            />
          ) : (
            data?.description
          )}
        </span>
      </div>
    </>
  );
};

export default Info;
