import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import axios from "axios";
import domain from "../utils/domain";

export const makeAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: `${domain}/api/v1`,
    headers: {
      "content-type": "application/json",
      uid: Cookies.get("uid"),
      client: Cookies.get("client"),
      "access-token": Cookies.get("access-token"),
    },
  });
  return axiosInstance;
};

export const withAuthServerSideProps = (url) => {
  return async (context) => {
    const { req, res } = context;

    const response = await fetch(`${domain}${url}`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies["uid"],
        client: req.cookies["client"],
        "access-token": req.cookies["access-token"],
      },
    });
    if (!response.ok && response.status === 401) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    // TODO: 他にも500エラーを考慮した分岐も必要
    const props = await response.json();
    console.log(props);
    return { props };
  };
};

export const showServerSideProps = () => {
  return async (context) => {
    const { req, params } = context;
    const id = params.post;

    const response = await fetch(`${domain}/api/v1/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies["uid"],
        client: req.cookies["client"],
        "access-token": req.cookies["access-token"],
      },
    });
    if (!response.ok && response.status === 401) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    // TODO: 他にも500エラーを考慮した分岐も必要
    const props = await response.json();
    console.log(props);
    return { props };
  };
};

//loginしていたらtrueを返す関数
export const isAuth = () => {
  //Cookieのチェック（これをいろいろ認証タイプにより変更）
  const uid = Cookies.get("uid");
  const client = Cookies.get("client");
  const accessToken = Cookies.get("access-token");
  const isSignedIn = uid && client && accessToken && true;
  console.log(isSignedIn);
  return isSignedIn;
};
