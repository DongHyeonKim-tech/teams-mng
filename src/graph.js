import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph(
  accessToken,
  type = "profile",
  teamId,
  channelId
) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    type === "profile"
      ? graphConfig.graphMeEndpoint
      : type === "user"
      ? graphConfig.graphUserEndpoint
      : type === "searchUser"
      ? `${graphConfig.graphUserEndpoint}?search="displayName:${searchValue}"`
      : type === "team"
      ? graphConfig.graphTeamsEndpoint
      : type === "channel"
      ? `${graphConfig.graphChannelEndpoint}/${teamId}/channels`
      : type === "msg"
      ? `${graphConfig.graphChannelEndpoint}/${teamId}/channels/${channelId}/messages`
      : null,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
