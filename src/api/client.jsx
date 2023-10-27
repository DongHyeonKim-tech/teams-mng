import axios from "axios";
// import jwt_decode from "jwt-decode";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

// const Authorization = () => {
//     try {
//       const token = JSON.parse(localStorage.getItem("user")).access;
//       return `Bearer ${token}`;
//     } catch (e) {
//       return "";
//     }
//   };

//   client.defaults.headers.common["Authorization"] = Authorization();

//   // JWT Refresh 및 인증 시간에 따른 자동 로그아웃
// client.interceptors.request.use(
//     async (config) => {
//       let userToken = JSON.parse(localStorage.getItem("user"));
//       if (userToken) {
//         config.headers.Authorization = `Bearer ${userToken.access}`;

//         const token = jwt_decode(userToken.access);

//         // token 만료시간
//         if (token.exp < Date.now() / 1000) {
//           localStorage.removeItem("user");
//           window.location = "/";
//         }
//       }

//       return config;
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
//   );

export default client;
