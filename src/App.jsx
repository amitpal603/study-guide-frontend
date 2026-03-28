import Navbar from "./components/header/Navbar";
import { Route, Routes } from "react-router-dom";

import Home from "./components/main/Home";
import About from "./components/main/About";
import Help from "./components/main/Help";
import SignUp from "./components/main/SignUp";
import Login from "./components/main/Login";
import Mg from "./components/main/Mg";
import Aktu from "./components/main/Aktu";
import StudyFooter from "./components/footer/StudyFooter";
import Policy from "./components/main/Policy";
import TermAndCondition from "./components/main/TermAndCondition";
import Support from "./components/main/Support";
import Review from "./components/main/Review";
import ForgetPassword from "./components/main/ForgetPassword";
import ResetPassword from "./components/main/ResetPassword";
import NotFound from "./components/main/NotFound";

import AdminDashboard from "./components/main/admin/AdminDashboard";
import AdminSignIn from "./components/main/admin/AdminSignIn";

import ProtectedRoutes from "./components/protect/ProtectedRoutes";
import ShowContent from "./components/main/admin/material/ShowContent";
import Verify from "./components/main/Verify";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login-account" element={<Login />} />

        <Route path="/policy" element={<Policy />} />
        <Route path="/terms-conditions" element={<TermAndCondition />} />
        <Route path="/support" element={<Support />} />
        <Route path="/reviews" element={<Review />} />

        {/* Password Recovery (must be public) */}
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email" element={<Verify/>}/>

        {/* Protected Routes */}
        <Route
          path="/help"
          element={
            <ProtectedRoutes>
              <Help />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/mgkvp-university"
          element={
            <ProtectedRoutes>
              <Mg />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/aktu-university"
          element={
            <ProtectedRoutes>
              <Aktu />
            </ProtectedRoutes>
          }
        />

        {/* Admin */}
        <Route path="/admin-sign-in-study-guide" element={<AdminSignIn />} />

        <Route
          path="/admin/study-guide/dashboard"
          element={
            <ProtectedRoutes>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
          <Route
          path="/content-data-pdf"
          element={<ProtectedRoutes>
            <ShowContent/>
          </ProtectedRoutes>}
          />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>

      <StudyFooter />
    </div>
  );
}

export default App;