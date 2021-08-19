const axios = require("axios");
const Module = "JW9tc0ByZWRsdGQl";
let Authorization = `Bearer ${sessionStorage.getItem("token") || null}`;

module.exports = {
  GetData: (url) => {
    return new Promise((resolve, reject) => {
      let headers = {
        "Content-Type": "application/json",
        Authorization: Authorization,
        Module: Module,
      };

      axios({
        method: "GET",
        url: url,
        //headers: headers,
      })
        .then((responseJson) => {
          resolve(responseJson.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },

  PostData: (url, userData = {},contenttype=false) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: url,
        data: !contenttype?JSON.stringify(userData):userData,
        headers: {
          "Content-Type": !contenttype?"application/json":contenttype,
          Module: Module,
          Authorization: Authorization,
        },
      })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },

  PostFormData: (url, userData = {},) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: url,
        data: userData,
        headers: {
          Module: Module,
          Authorization: Authorization      
        },
      })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },

  PutData: (url, userData) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        url: url,
        data: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Module: Module,
          Authorization: Authorization,
        },
      })
        .then((responseJson) => {
          resolve(responseJson.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },

  DeleteData: (url, userData = {}) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: url,
        data: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Module: Module,
          Authorization: Authorization,
        },
      })
        .then((responseJson) => {
          resolve(responseJson.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
