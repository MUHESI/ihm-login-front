import axios from "axios";
export const URL = "http://localhost:5000/";
export const URL_Pred = "http://localhost:5000/";

export const postAPI = async (url, post) => {
  const res = await axios({
    method: "post",
    url: `${URL}api/${url}`,
    data: post
  });
  return res;
};

export const postAPIPred = async (url, post) => {
  const res = await axios({
    method: "post",
    url: `${URL}api/${url}`,
    data: post
  });
  return res;
};

export const getAPI = async (url) => {
  const res = await axios({
    method: "get",
    url: `${URL}api/${url}`
  });
  return res;
};
