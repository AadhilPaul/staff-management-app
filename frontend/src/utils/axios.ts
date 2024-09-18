import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      if (originalRequest._retry) {
        // If the request has already been retried, reject it
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Attempt to refresh the token
          const response = await axiosInstance.post('token/jwt/refresh/', {
            refresh: localStorage.getItem('refresh_token'),
          });

          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;

          processQueue(null, response.data.access);

          return axiosInstance(originalRequest);
        } catch (err) {
          // Blacklist the old refresh token
          await axiosInstance.post('logout/blacklist/', {
            refresh: localStorage.getItem('refresh_token'),
          });

          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      // If a refresh request is in progress, queue the request
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        return axiosInstance(originalRequest);
      }).catch((err) => Promise.reject(err));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
// import axios from "axios";

// const baseURL = "http://127.0.0.1:8000/";

// const axiosInstance = axios.create({
//   baseURL: baseURL,
//   timeout: 5000,
//   headers: {
//     Authorization: "Bearer " + localStorage.getItem("access_token"),
//     "Content-Type": "application/json",
//     accept: "application/json",
//   },
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;

//     if (typeof error.response === "undefined") {
//       alert(
//         "A server/network error occurred. " +
//           "Looks like CORS might be the problem. " +
//           "Sorry about this - we will get it fixed shortly."
//       );
//       return Promise.reject(error);
//     }

//     if (
//       error.response.status === 401 &&
//       originalRequest.url === baseURL + "token/jwt/refresh/"
//     ) {
//       localStorage.clear();
//       window.location.href = "/login";
//       return Promise.reject(error);
//     }

//     if (
//       error.response.data.code === "token_not_valid" &&
//       error.response.status === 401 &&
//       error.response.statusText === "Unauthorized"
//     ) {
//       const refreshToken = localStorage.getItem("refresh_token");

//       if (refreshToken) {
//         const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

//         // exp date in token is expressed in seconds, while now() returns milliseconds:
//         const now = Math.ceil(Date.now() / 1000);
//         console.log(`expiring time ${tokenParts.exp} is past ${now}`);

//         if (tokenParts.exp > now) {
//           console.log("ITS EXPIRED!");
//           return axiosInstance
//             .post("token/jwt/refresh/", {
//               refresh: refreshToken,
//             })
//             .then((response) => {
//               localStorage.setItem("access_token", response.data.access);
//               localStorage.setItem("refresh_token", response.data.refresh);

//               axiosInstance.defaults.headers["Authorization"] =
//                 "Bearer " + response.data.access;
//               originalRequest.headers["Authorization"] =
//                 "Bearer " + response.data.access;

//               console.log("access token request successfull!")

//               return axiosInstance(originalRequest);
//             })
//             .catch((err) => {
//               console.log("ERROR: ", err);
//             });
//         } else {
//           localStorage.clear();
//           console.log("Refresh token is expired", tokenParts.exp, now);
//           window.location.href = "login/";
//         }
//       } else {
//         localStorage.clear();
//         console.log("Refresh token not available.");
//         window.location.href = "login/";
//       }
//     }

//     // specific error handling done elsewhere
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

