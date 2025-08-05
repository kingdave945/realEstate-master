import {
  BrowserRouter,
  Routes,
  Route,
  UNSAFE_ErrorResponseImpl,
} from "react-router-dom";
import Layout from "./pages/Layout";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";
import ResetPassword from "./pages/User/UserResetPsw";

import About from "./pages/About";
import ForgetPassword from "./pages/forgotpassword";
import CreateNewPassword from "./pages/createnewpass";

import "./App.css";
import Login from "./pages/login";
import WatchlistTable from "./pages/watchlist";
import AgentLayout from "./pages/Agents/AgentLayout";
import Dashboard from "./pages/Agents/Dashboard";
import MyListing from "./pages/Agents/MyListing";
import NotFound from "./pages/NotFound";
import Properties from "./pages/Properties";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/home";
import Messages from "./pages/Agents/Messages";
import AdminLayout from "./pages/Admin/AdminLayout";
import Property from "./pages/Property";
import AgentLogin from "./pages/Agents/login";
import AdminLogin from "./pages/Admin/login";
import Register from "./pages/register";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";
import ProtectedRouteAgent from "./components/ProtectedRouteAgent";
import ProtectedRouteUser from "./components/ProtectedRouteUser";
import ConfirmEmail from "./pages/ConfirmEmail";
import TwoFactor from "./pages/TwoFactorAuth";
UNSAFE_ErrorResponseImpl;
import "react-toastify/dist/ReactToastify.css";
import UserLayout from "./pages/User/UserLayout";
import Notifications from "./pages/Agents/Notifications";
import AgentProfile from "./pages/Agents/agentprofile"; // import agent profile
// import other agent pages as needed

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="login/agent" element={<AgentLogin />} />
            <Route path="login/admin" element={<AdminLogin />} />
            <Route path="register" element={<Register />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:id" element={<Property />} />
            <Route path="/confirm-email" element={<ConfirmEmail />} />
            <Route path="/auth/2fa" element={<TwoFactor />} />
          </Route>
          <Route
            path="agent"
            element={
              <ProtectedRouteAgent>
                <AgentLayout />
              </ProtectedRouteAgent>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="listing" element={<MyListing />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:id" element={<Property />} />
            {/* <Route path="admin" element={<Admin />} /> */}
            <Route path="messages" element={<Messages />} />

            {/* <Route path=":agentId" element={<Agent />} /> */}
          </Route>
          <Route
            path="agent-profile"
            element={
              <ProtectedRouteAgent>
                <AgentProfile />
              </ProtectedRouteAgent>
            }
          />
          <Route
            path="Admin"
            element={
              <ProtectedRouteAdmin>
                <AdminLayout />
              </ProtectedRouteAdmin>
            }
          >
            <Route index element={<Admin />} />
            {/* <Route path="listing" element={<MyListing />} /> */}
            <Route path="properties" element={<Properties />} />

            <Route path="properties/:propertyId" element={<Properties />} />
            {/* <Route path="admin" element={<Admin />} />
            <Route path="messages" element={<Messages />} /> */}

            {/* <Route path=":agentId" element={<Agent />} /> */}
          </Route>
          <Route
            path="user-profile"
            element={
              <ProtectedRouteUser>
                <UserLayout />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="reset-password"
            element={
       
                <ResetPassword />
            
            }
          />
          <Route path="/watchlist" element={<WatchlistTable />} />
          <Route path="forgot-password" element={<ForgetPassword />} />
          <Route
            path="forgot-password/create-new-password"
            element={<CreateNewPassword />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
