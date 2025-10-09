import {
  Authenticated,
  AuthProvider,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  DashboardOutlined,
  PeopleAltOutlined,
  VillaOutlined,
  StarOutlineOutlined,
} from "@mui/icons-material";

import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";

import { Login } from "./pages/login";
import { parseJwt } from "./utils/parse-jwt";
import Title from "./components/header/Title";
import { ThemedLayout } from "./components/layout";
import {
  Agent,
  AgentProfile,
  AllProperty,
  CreateProperty,
  EditProperty,
  HomePage,
  PropertyDetail,
} from "./pages/index";
import Reviews from "./pages/Reviews";
import Messages from "./pages/Messages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const res = await axiosInstance.post(
          "http://localhost:8080/api/users",
          {
            email: profileObj.email,
            name: profileObj.name,
            avatar: profileObj.picture,
          }
        );

        if (res.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: res.data._id,
            })
          );
        }

        localStorage.setItem("token", `${credential}`);
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("http://localhost:8080/api")}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/",
                    meta: {
                      icon: <DashboardOutlined />,
                    },
                  },
                  {
                    name: "properties",
                    list: "/properties",
                    create: "/properties/create",
                    meta: {
                      icon: <VillaOutlined />,
                    },
                  },
                  {
                    name: "agents",
                    list: "/agents",
                    meta: {
                      icon: <PeopleAltOutlined />,
                    },
                  },
                  {
                    name: "reviews",
                    list: "/reviews",
                    meta: {
                      icon: <StarOutlineOutlined />,
                    },
                  },
                  {
                    name: "messages",
                    list: "/messages",
                    meta: {
                      icon: <ChatBubbleOutline />,
                    },
                  },
                  {
                    name: "my-profile",
                    list: "/my-profile",
                    meta: {
                      icon: <AccountCircleOutlined />,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "U950G9-GCQOrA-OPk3mm",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayout Header={Header} Title={Title}>
                          <Outlet />
                        </ThemedLayout>
                      </Authenticated>
                    }
                  >
                    <Route path="/">
                      <Route index element={<HomePage />} />
                      <Route path="agents" element={<Agent />} />
                      <Route path="reviews" element={<Reviews />} />
                      <Route path="messages" element={<Messages />} />
                      <Route path="my-profile" element={<AgentProfile />} />
                    </Route>

                    <Route path="/properties">
                      <Route index element={<AllProperty />} />
                      <Route path="create" element={<CreateProperty />} />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* <DevtoolsPanel /> */}
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
