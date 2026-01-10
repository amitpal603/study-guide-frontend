import React, { lazy, Suspense } from "react";
import Navbar from "./components/header/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/main/Home";
import About from "./components/main/About";
import Help from "./components/main/Help";
const SignUp = lazy(() => import("./components/main/SignUp"))
import Login from "./components/main/Login";
import Mg from "./components/main/Mg"
import Aktu from "./components/main/Aktu";
import StudyFooter from "./components/footer/StudyFooter";
import Policy from "./components/main/Policy";
import TermAndCondition from "./components/main/TermAndCondition";
import Support from "./components/main/Support";
import Review from "./components/main/Review";
import ForgetPassword from "./components/main/ForgetPassword";
import AdminSignUp from "./components/main/admin/AdminSignUp";
import NotFound from "./components/main/NotFound";
import AdminDashboard from "./components/main/admin/AdminDashboard";

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/sign-up" element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <SignUp/>
            </Suspense>
          } />
          <Route path="/login-account" element={<Login />} />
          <Route path="/mgkvp-university" element={<Mg />} />
          <Route path="/aktu-university" element={<Aktu />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/terms-conditions" element={<TermAndCondition />} />
          <Route path="/support" element={<Support />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/admin-sign-up-study-guide" element={<AdminSignUp/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/admin-sign-in-study-guide"/>
          <Route path="/admin/study-guide/dashboard" element={<AdminDashboard/>}/>
        </Routes>
      </div>
      <StudyFooter />
    </div>
  );
}

export default App;
