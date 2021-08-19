//For using anywhere headers data

export const header = {
  headers: {
    "Content-Type": "application/json",
    module: "JW9tc0ByZWRsdGQl",
    authorization: "Bearer " + localStorage.getItem("token"),
  },
};
