import React, { useEffect, useState, useContext } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { callMsGraph } from "../graph";
import client from "../api/client";
import TeamList from "../features/main/TeamList";
import ChannelList from "../features/main/ChannerList";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Paper, Grid, Button } from "@mui/material";
import { TabContext } from "../features/layout/PageLayout";
import RegistChannelPopup from "../features/main/popup/RegistChannelPopup";

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
          callMsGraph(response.accessToken, "team").then((response) => {
            setTeamData(
              response.value.map((item, idx) => {
                return {
                  ...item,
                  key: idx + 1,
                };
              })
            );
          });
          callMsGraph(response.accessToken, "user").then((res) => {
            console.log("user: ", res);
          });
        });
    } else if (tabMenu === "Test") {
      client.get("/BIMTest/manage/tests").then((response) => {
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
    // console.log("selectedRow: ", selectedRow);
    if (selectedRow?.id) {
      callMsGraph(token, "channel", selectedRow.id).then((response) => {
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
        .get(`/BIMTest/manage/tests/${selectedRow.seq}/users`)
        .then((response) => {
          // console.log("users: ", response);
          setChannelData(
            response.data.map((item, idx) => {
              return { ...item, key: idx + 1 };
            })
          );
        });
    }
  }, [selectedRow]);

  const getRgb = () => Math.floor(Math.random() * 256);

  const person = [
    "국민주",
    "권익현",
    "김민정",
    "김승배",
    "김현아",
    "김혜린",
    "김효은",
    "남지영",
    "백인엽",
    "백준영",
    "서지석",
    "오영범",
    "오주현",
    "이동욱",
    "이지행",
    "이호석",
    "임용한",
    "전두호",
    "전승재",
    "정순형",
    "조은비",
    "최서현",
    "최성배",
    "최지선",
    "최창대",
    "하예린",
  ];

  let personToColor = person.map((item) => {
    return {
      name: item,
      color: `am4core.color('rgb(${getRgb()},${getRgb()},${getRgb()})')`,
    };
  });

  let d = [
    {
      name: "20년 10월",
      국민주: "",
      권익현: "",
      김민정: "",
      김승배: "68",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "21",
      오주현: "",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "20년 11월",
      국민주: "",
      권익현: "",
      김민정: "",
      김승배: "45",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "20년 12월",
      국민주: "",
      권익현: "",
      김민정: "",
      김승배: "30",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "20년 8월",
      국민주: "",
      권익현: "",
      김민정: "",
      김승배: "67",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "20년 9월",
      국민주: "",
      권익현: "1",
      김민정: "",
      김승배: "34",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "462",
      오주현: "",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "21년 11월",
      국민주: "",
      권익현: "",
      김민정: "",
      김승배: "1",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "2",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "21년 12월",
      국민주: "",
      권익현: "",
      김민정: "",
      김승배: "",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "1",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "21년 1월",
      국민주: "",
      권익현: "",
      김민정: "",
      김승배: "13",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "37",
      하예린: "",
    },
    {
      name: "21년 2월",
      국민주: "",
      권익현: "",
      김민정: "",
      김승배: "29",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "21년 3월",
      국민주: "15",
      권익현: "",
      김민정: "18",
      김승배: "50",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "21",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "28",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "21년 4월",
      국민주: "16",
      권익현: "",
      김민정: "212",
      김승배: "74",
      김현아: "165",
      김혜린: "",
      김효은: "",
      남지영: "12",
      백인엽: "26",
      백준영: "",
      서지석: "1",
      오영범: "",
      오주현: "169",
      이동욱: "2",
      이지행: "",
      이호석: "",
      임용한: "57",
      전두호: "",
      전승재: "5",
      정순형: "5",
      조은비: "5",
      최서현: "9",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "2",
    },
    {
      name: "21년 5월",
      국민주: "",
      권익현: "",
      김민정: "40",
      김승배: "11",
      김현아: "55",
      김혜린: "",
      김효은: "",
      남지영: "85",
      백인엽: "22",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "28",
      이동욱: "",
      이지행: "",
      이호석: "9",
      임용한: "",
      전두호: "",
      전승재: "18",
      정순형: "67",
      조은비: "70",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "2",
    },
    {
      name: "21년 6월",
      국민주: "",
      권익현: "",
      김민정: "",
      김승배: "",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "9",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "3",
      이동욱: "",
      이지행: "",
      이호석: "2",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "6",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "21년 7월",
      국민주: "",
      권익현: "21",
      김민정: "",
      김승배: "",
      김현아: "38",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "61",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "46",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "5",
    },
    {
      name: "21년 8월",
      국민주: "",
      권익현: "",
      김민정: "",
      김승배: "3",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "22년 10월",
      국민주: "",
      권익현: "",
      김민정: "202",
      김승배: "",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "22년 11월",
      국민주: "",
      권익현: "",
      김민정: "548",
      김승배: "",
      김현아: "",
      김혜린: "2",
      김효은: "15",
      남지영: "",
      백인엽: "",
      백준영: "165",
      서지석: "",
      오영범: "",
      오주현: "4",
      이동욱: "",
      이지행: "139",
      이호석: "1",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "179",
      조은비: "",
      최서현: "",
      최성배: "120",
      최지선: "190",
      최창대: "",
      하예린: "32",
    },
    {
      name: "22년 12월",
      국민주: "",
      권익현: "",
      김민정: "121",
      김승배: "",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "24",
      서지석: "",
      오영범: "",
      오주현: "",
      이동욱: "",
      이지행: "19",
      이호석: "",
      임용한: "",
      전두호: "1",
      전승재: "",
      정순형: "25",
      조은비: "",
      최서현: "",
      최성배: "15",
      최지선: "19",
      최창대: "",
      하예린: "",
    },
    {
      name: "22년 3월",
      국민주: "",
      권익현: "",
      김민정: "",
      김승배: "",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "1",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "22년 6월",
      국민주: "",
      권익현: "",
      김민정: "",
      김승배: "",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "3",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
    {
      name: "22년 9월",
      국민주: "",
      권익현: "",
      김민정: "163",
      김승배: "",
      김현아: "",
      김혜린: "",
      김효은: "",
      남지영: "",
      백인엽: "",
      백준영: "",
      서지석: "",
      오영범: "",
      오주현: "",
      이동욱: "",
      이지행: "",
      이호석: "",
      임용한: "",
      전두호: "",
      전승재: "",
      정순형: "",
      조은비: "",
      최서현: "",
      최성배: "",
      최지선: "",
      최창대: "",
      하예린: "",
    },
  ];

  let test = d.map((item) => {
    const { name, ...etc } = item;
    const keys = Object.keys(etc);
    const values = Object.values(etc);
    return {
      name: name,
      color: `am4core.color('rgb(${getRgb()},${getRgb()},${getRgb()})')`,
      children: keys
        .map((key, idx) => {
          if (values[idx]) {
            return {
              name: key,
              value: Number(values[idx]),
              // color: `am4core.color('rgb(${getRgb()},${getRgb()},${getRgb()})')`,
              color: personToColor.filter((pc) => pc.name === key)[0].color,
            };
          }
        })
        .filter((childrenItem) => childrenItem),
    };
  });
  // console.log("test: ", test);

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
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} className={classes.paper}>
              <div className={classes.contentHeader}>
                <Typography className={classes.title}>
                  {tabMenu === "Team" ? "Channel" : "Member"}
                </Typography>
                <Button
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
                </Button>
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
