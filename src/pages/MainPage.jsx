import React, { useEffect, useState, useContext } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { getTeamList, getChannelList, getUserList } from "../graph";
import client from "../api/client";
import TeamList from "../features/main/TeamList";
import ChannelList from "../features/main/ChannerList";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Paper, Grid, Button } from "@mui/material";
import { TabContext } from "../features/layout/PageLayout";
import RegistChannelPopup from "../features/main/popup/RegistChannelPopup";

// 수준측정 데이터 임시
import { lvlMsmtData } from "../tmpLvlMsmt";

const MainPage = () => {
  const tabMenu = useContext(TabContext);
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "contents",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      width: "100%",
    },
    paper: {
      padding: theme.spacing(2),
      height: "83vh",
      width: "98%",
      marginBottom: theme.spacing(5),
    },
    contentHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      textAlign: "left",
      width: "30%",
      padding: theme.spacing(3),
      fontWeight: 500,
      fontSize: 20,
    },
    subButton: {
      textAlign: "right",
      marginRight: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  const { instance, accounts } = useMsal();

  const [token, setToken] = useState("");
  const [teamData, setTeamData] = useState([]);
  const [channelData, setChannelData] = useState([]);

  const [selectedRow, setSelectedRow] = useState({});
  const [selectedChannel, setSelectedChannel] = useState({});

  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const closeClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (tabMenu === "Team") {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          setToken(response.accessToken);
          getTeamList(response.accessToken).then((response) => {
            setTeamData(
              response.value.map((item, idx) => {
                return {
                  ...item,
                  key: idx + 1,
                };
              })
            );
          });
          getUserList(response.accessToken).then((res) => {});
        });
    } else if (tabMenu === "Test") {
      client.get("/BIMTestManage/tests").then((response) => {
        setTeamData(
          response.data.map((item, idx) => {
            return { ...item, key: idx + 1 };
          })
        );
      });
    }
    setSelectedRow({});
    setChannelData([]);
  }, [tabMenu]);

  useEffect(() => {
    if (selectedRow?.id) {
      getChannelList(token, selectedRow?.id).then((response) => {
        setChannelData(
          response.value.map((item, idx) => {
            return {
              ...item,
              key: idx + 1,
              displayName:
                item.displayName === "General" ? "일반" : item.displayName,
            };
          })
        );
      });
    }
    if (selectedRow?.seq) {
      client
        .get(`/BIMTestManage/tests/${selectedRow.seq}/users`)
        .then((response) => {
          setChannelData(
            response.data.map((item, idx) => {
              return { ...item, key: idx + 1 };
            })
          );
        });
    }
  }, [selectedRow]);

  // 수준측정 데이터 임시
  // lvlMsmtData();

  return (
    <>
      <RegistChannelPopup
        open={open}
        isCreate={isCreate}
        onClose={closeClick}
        channelInfo={
          isCreate
            ? {
                teamDisplayName: selectedRow?.displayName,
                teamDescription: selectedRow?.description,
                teamId: selectedRow?.id,
              }
            : {
                ...selectedChannel,
                teamDisplayName: selectedRow?.displayName,
                teamDescription: selectedRow?.description,
                teamId: selectedRow?.id,
              }
        }
        tabMenu={tabMenu}
        token={token}
      />
      <Container className={classes.container} maxWidth="xl" fixed={false}>
        <Grid container spacing={2} sx={{ width: "100%", margin: "0 auto" }}>
          <Grid item xs={6} sx={{ width: "100%" }}>
            <Paper elevation={3} className={classes.paper}>
              <div className={classes.contentHeader}>
                <Typography className={classes.title}>{tabMenu}</Typography>
              </div>
              <TeamList
                tabMenu={tabMenu}
                dataSource={teamData}
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
                setSelectedChannel={setSelectedChannel}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} className={classes.paper}>
              <div className={classes.contentHeader}>
                <Typography className={classes.title}>
                  {tabMenu === "Team" ? "Channel" : "Member"}
                </Typography>
                {/* <Button
                  variant={"contained"}
                  color={"primary"}
                  className={classes.subButton}
                  onClick={() => {
                    setOpen(true);
                    setIsCreate(true);
                  }}
                  disabled={!selectedRow?.id && !selectedRow?.seq}
                >
                  채널 추가
                </Button> */}
              </div>
              <ChannelList
                tabMenu={tabMenu}
                dataSource={channelData}
                setOpen={setOpen}
                setSelectedChannel={setSelectedChannel}
                setIsCreate={setIsCreate}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;
