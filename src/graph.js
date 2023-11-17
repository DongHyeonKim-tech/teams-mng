import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph(
  accessToken,
  // type = "profile",
  // teamId,
  // channelId
  url
) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export const getTeamList = async (accessToken) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(graphConfig.graphTeamsEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getChannelList = async (accessToken, teamId) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    `${graphConfig.graphChannelEndpoint}/${teamId}/channels`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getUserList = async (accessToken, maxNum = 100) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  headers.append("ConsistencyLevel", "eventual");
  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    // `${graphConfig.graphUserEndpoint}?&$filter=jobTitle ge ' '`,
    `${graphConfig.graphUserEndpoint}?$filter=NOT(mail eq 'G') and jobTitle ge ' '&$count=true`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getSearchUserList = async (accessToken, value) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  headers.append("ConsistencyLevel", "eventual");

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    `${graphConfig.graphUserEndpoint}?$search="displayName:${value}" OR "surname:${value}"&$filter=jobTitle ge ' '&$top=999&$count=true`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getEvlUserList = async (accessToken, value) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  headers.append("ConsistencyLevel", "eventual");

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    `${graphConfig.graphUserEndpoint}?$filter=startswith(mail, '${value}')`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getTeamUserList = async (accessToken, teamId, channelId) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    `${graphConfig.graphChannelEndpoint}/${teamId}/channels/${channelId}/members`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const sendChannelMessage = async (
  accessToken,
  teamId,
  channelId,
  message
) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  headers.append("Content-type", "application/json");

  let data = new FormData();
  data.append("content", message);

  const options = {
    method: "POST",
    headers: headers,
    data: data,
  };

  return fetch(
    `${graphConfig.graphChannelEndpoint}/${teamId}/channels/${channelId}/messages`
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
