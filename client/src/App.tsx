import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import LoginPage from "./scenes/loginPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useAppDispatch, useAppSelector } from "./index";
import "react-quill/dist/quill.snow.css";
import 'react-calendar/dist/Calendar.css';

import ToastProvider from "./components/ToastProvider";
import { io } from "socket.io-client";
import LoadingPage from "components/loading/LoadingPage";
import ProgressLoading from "./components/loading/ProgressLoading";
import PostDetails from "./scenes/postDetails";
import AccountLayout from "./layouts/AccountLayout";
import ForgetPassword from "./scenes/account/ForgetPassword";
import Oauth from "./scenes/account/Oauth";
import ResetPassword from "scenes/account/ResetPassword";
import ChatExc from "components/chat/ChatExc";
import { actions, useTrackedStore } from "./hooks";
import Particles from "react-particles";
import useChatStore from "./hooks/stateChat.store";
import { getFriends, getSelfInfo } from "./service/user.service";
import { setFriends, setUSer } from "./state";
import SearchPost from "./scenes/searchPost/intex";
import { SidebarProvider } from "components/contexts/SideBarContext";
import AddPost from "./scenes/addPost";
import PostWithTags from "scenes/postWithTags";
import SharedPost from "scenes/sharedPost";
import Activities from "./scenes/activities";
import CalendarPage from "./layouts/weather";
import SavedPost from "./scenes/savedPost";
import ScrollToTop from "react-scroll-up"
import Topics from "./scenes/topics";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// use lazy load so that route come with <Suspense />
// import ProfilePage from "./scenes/profilePage";
const HomePage = lazy(() => import("./scenes/homePage"));
const ProfilePage = lazy(() => import("./scenes/profilePage"));

function App() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSocket(io("http://localhost:3001"));
    const handleGetUser = async () => {
      const res = await getSelfInfo();

      dispatch(setUSer({ user: res.data }));
    };
    if (user.id) {
      handleGetUser().then((r) => r);
      handleGetFriends().then((r) => r);
    }
  }, [user.id]);

  const handleGetFriends = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const res = await getFriends(user.id);
        const friendList: IUser[] = res.data.friends;

        dispatch(setFriends({ friends: friendList }));
      }
    } catch (e) {
      console.log({ error: e });
    }
  };

  const { setSocket } = actions().socket;

  useEffect(() => {
    setIsNavigating(true);
    setTimeout(() => setIsNavigating(false), 2000);
  }, [location]);

  // @ts-ignore
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = localStorage.getItem("accessToken");
  const isAppLoading = useTrackedStore().socket.isAppLoading();
  const { isOpenChat } = useChatStore();


  return (
    <>
      {/*<Particles />*/}
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''} >

        <div className={mode === "dark" ? "App" : "app"}>
          <ThemeProvider theme={theme}>
            <ScrollToTop showUnder={160}>
              <img style={{width:"50px"}} src={"/scroll-up.png"}/>
            </ScrollToTop>
            <SidebarProvider>
              <CssBaseline />
              <ToastProvider>
                {isNavigating && <ProgressLoading />}
                <Routes>
                  <Route
                    path={"/"}
                    element={!isAuth ? <LoginPage /> : <Navigate to={"/home"} />}
                  />
                  <Route
                    path={"/home"}
                    element={
                      isAuth ? (
                        isAppLoading ? (
                          <LoadingPage />
                        ) : (
                          <Suspense fallback={<LoadingPage />}>
                            <HomePage />
                          </Suspense>
                        )
                      ) : (
                        <Navigate to={"/account/login"} />
                      )
                    }
                  />
                  <Route
                    path={"/profile/:userId"}
                    element={
                      isAuth ? (
                        isAppLoading ? (
                          <LoadingPage />
                        ) : (
                          <Suspense fallback={<LoadingPage />}>
                            <ProfilePage />
                          </Suspense>
                        )
                      ) : (
                        <Navigate to={"/"} />
                      )
                    }
                  />
                  <Route path={"/account/"} element={<AccountLayout />}>
                    <Route index path={"login"} element={<LoginPage />} />
                    <Route
                      path={"forget-password"}
                      element={<ForgetPassword />}
                    />
                    <Route
                      path={"new-password/:token"}
                      element={<ResetPassword />}
                    />
                  </Route>
                  <Route path={"oauth-verify"} element={<Oauth />} />
                  <Route path={"/search"} element={<SearchPost />} />
                  <Route path={"/post/:id"} element={<PostDetails />} />
                  <Route path={"/add-post"} element={<AddPost />} />
                  <Route path={"/post-tags"} element={<PostWithTags />} />
                  <Route path={"/shared-post"} element={<SharedPost />} />
                  <Route path={"/activities"} element={<Activities />}/>
                  <Route path={"/calendar"} element={<CalendarPage />}/>
                  <Route path={"/saved-post"} element={<SavedPost />}/>
                  <Route path={"/topic"} element={<Topics />}/>
                </Routes>
                {isOpenChat && <ChatExc isShow={true} />}
              </ToastProvider>
            </SidebarProvider>
          </ThemeProvider>
        </div>
      </GoogleOAuthProvider>

    </>
  );
}

export default App;
