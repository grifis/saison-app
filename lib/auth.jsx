import { GetServerSideProps } from "next";
import Cookies from "js-cookie";

export const withAuthServerSideProps = (url) => {
  return async (context) => {
    const { req, res } = context;

    const response = await fetch(
      `https://saison-app-api.herokuapp.com/${url}`,
      {
        headers: {
          "Content-Type": "application/json",
          uid: req.cookies["uid"],
          client: req.cookies["client"],
          "access-token": req.cookies["access-token"],
        },
      }
    );
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
  return isSignedIn;
};
