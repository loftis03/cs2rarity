import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageRedirectRoutes from "./HomePageRedirectRoutes.js";
import HomePage from "./homepage.jsx";
import LoginForm from "./LoginForm.jsx";
import SignupPage from "./SignupPage.jsx";
import Nav from "./Nav";
import MyPage from "./MyPage.jsx";
import ProtectedRoutes from "./ProtectedRoutes.js";
// import "./App.css";
// import Nav from "./nav.js";

// const domain = /https:\/\/[^/]+/;
// const basename = process.env.PUBLIC_URL.replace(domain, "");

const App = () => {
  return (
    // <BrowserRouter basename={basename}>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<HomePageRedirectRoutes child={<LoginForm />} />}/>
        <Route path="/signup/" element={<HomePageRedirectRoutes child={<SignupPage />} />}/>
        <Route path="/mypage/" element={<ProtectedRoutes child={<MyPage />} />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
