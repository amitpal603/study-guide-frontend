import Navbar from "./components/header/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/main/Home";
import About from "./components/main/About";
import Help from "./components/main/Help";
import SignUp from "./components/main/SignUp"
import Login from "./components/main/Login";
import Mg from "./components/main/Mg"
import Aktu from "./components/main/Aktu";
import StudyFooter from "./components/footer/StudyFooter";
import Policy from "./components/main/Policy";
import TermAndCondition from "./components/main/TermAndCondition";
import Support from "./components/main/Support";
import Review from "./components/main/Review";
import ForgetPassword from "./components/main/ForgetPassword";
import NotFound from "./components/main/NotFound";
import AdminDashboard from "./components/main/admin/AdminDashboard";
import AdminSignIn from "./components/main/admin/AdminSignIn";
import ProtectedRoutes from "./components/protect/ProtectedRoutes";

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<ProtectedRoutes><Help /></ProtectedRoutes>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/login-account" element={<Login />} />
          <Route path="/mgkvp-university" element={
            <ProtectedRoutes>
              <Mg />
            </ProtectedRoutes>
            } />
          <Route path="/aktu-university" element={<ProtectedRoutes><Aktu /></ProtectedRoutes>} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/terms-conditions" element={<TermAndCondition />} />
          <Route path="/support" element={<Support />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<NotFound/>}/>
          <Route path="/admin-sign-in-study-guide" element={<AdminSignIn/>}/>
          <Route path="/admin/study-guide/dashboard" element={<ProtectedRoutes><AdminDashboard/></ProtectedRoutes>}/>  
        </Routes>
      </div>
      <StudyFooter />
    </div>
  );
}

export default App;
