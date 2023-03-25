import { makeAxiosInstance, domain } from "../../lib/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function User(props) {
  console.log(props);
  const axiosInstance = makeAxiosInstance();
  const router = useRouter();
  const onSubmit = (data) => {
    data.preventDefault();
    axiosInstance
      .delete("/auth/sign_out")
      .then((res) => {
        console.log(res);
        Cookies.remove("uid");
        Cookies.remove("client");
        Cookies.remove("access-token");
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const check = (data) => {
    axiosInstance.get(`/users/${router.query.user}`).then((res) => {
      console.log(res);
      // router.push(`/posts/${res.data.data.id}`);
      // router.reload();
    });
  };
  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">テストページ</div>
      <button onClick={check}>ボタン</button>
      <form onSubmit={onSubmit}>
        <button>ログアウト</button>
      </form>
    </>
  );
}
