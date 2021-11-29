import axios from "axios";
// const baseUrl = "http://localhost:8000";
const baseUrl = "https://employee-metromidz.herokuapp.com";
const headers = {
  "content-type": "Application/json",
};
export const fetchEmployees = async (params) => {
  try {
    let resp = await axios({
      method: "get",
      url: `${baseUrl}/employee`,
      params,
    });
    if (resp && resp.status === 200) {
      return resp.data;
    } else {
      console.log("Error API call:", resp.data.message);
      return false;
    }
  } catch (err) {
    console.log("Error in Api call:", err);
    return false;
  }
};

export const createEmployee = async (body) => {
  try {
    let resp = await axios({
      method: "post",
      url: `${baseUrl}/employee`,
      data: body,
      headers,
    });
    // console.log("resp:", resp);
    if (resp && resp.status === 201) {
      return resp.data;
    } else {
      console.log("Error API call:", resp.data.message);
      return false;
    }
  } catch (err) {
    console.log("Error in Api call:", err);
    return false;
  }
};
export const updateEmployee = async (body, id) => {
  try {
    let resp = await axios({
      method: "put",
      url: `${baseUrl}/employee/${id}`,
      data: body,
      headers,
    });
    // console.log("resp:", resp);
    if (resp && resp.status === 200) {
      return resp.data;
    } else {
      console.log("Error API call:", resp.data.message);
      return false;
    }
  } catch (err) {
    console.log("Error in Api call:", err);
    return false;
  }
};

export const deleteEmployee = async (id) => {
  try {
    let resp = await axios({
      method: "delete",
      url: `${baseUrl}/employee/${id}`,
    });
    // console.log("resp:", resp);
    if (resp && resp.status === 200) {
      return resp.data;
    } else {
      console.log("Error API call:", resp.data.message);
      return false;
    }
  } catch (err) {
    console.log("Error in Api call:", err);
    return false;
  }
};
