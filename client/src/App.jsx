import { Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import ReadQuestionPage from "./pages/readQuestion/ReadQuestionPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import UserProfilePage from "./pages/userProfile/UserProfilePage";
import CreateQuestionPage from "./pages/createQuestion/CreateQuestionPage";
import "./App.module.css";
import Users from "./pages/users/Users";
import EditQuestionPage from "./pages/editQuestion/EditQuestionPage";
import EditProfile from "./pages/editProfile/EditProfile";
import { useSetRecoilState } from "recoil";
import { loginState, userDataState } from "./store/auth";
import { useEffect } from "react";
import axios from "axios";
import Header from "./components/header/Header";

function App() {
  const setLoginState = useSetRecoilState(loginState);
  const setUserDataState = useSetRecoilState(userDataState);
  const { pathname } = useLocation();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const memberId = sessionStorage.getItem("id");

    if (token) {
      setLoginState(true);

      axios
        .get(
          `http://ec2-3-34-211-22.ap-northeast-2.compute.amazonaws.com:8080/members/${memberId}`,
          { headers: { authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          if (res.status === 200) {
            setUserDataState({
              createdAt: res.data.data.createdAt,
              displayName: res.data.data.displayName,
              email: res.data.data.email,
              memberId: res.data.data.memberId,
              modifiedAt: res.data.data.modifiedAt,
            });
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, []);

  return (
    <>
      <Header pathname={pathname} />
      <Routes>
        <Route element={<MainPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignupPage />} path="/signup" />
        <Route element={<ReadQuestionPage />} path="/questions/read" />
        <Route element={<Users />} path="/users" />
        <Route
          element={<UserProfilePage />}
          path={"/users/:memberId/:displayName"}
        />
        <Route element={<EditProfile />} path={"/users/edit/:memberId"} />
        <Route element={<CreateQuestionPage />} path="/questions/ask" />
        <Route element={<EditQuestionPage />} path="/questions/edit" />
      </Routes>
    </>
  );
}

export default App;
