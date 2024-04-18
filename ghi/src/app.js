import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageRedirectRoutes from "./HomePageRedirectRoutes.js";
import HomePage from "./homepage.jsx";
import LoginForm from "./LoginForm.jsx";
import SignupPage from "./SignupPage.jsx";
import SkinDetail from "./SkinDetail.jsx";
import Nav from "./Nav.js";
import ProtectedRoutes from "./ProtectedRoutes.js";
import YourProfilePage from "./ProfilePage.jsx";
import WishlistPage from "./WishlistPage.jsx";
import CreateWishlistPage from "./CreateWishlist.jsx";
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
        <Route path="/yourpage/" element={<ProtectedRoutes child={<YourProfilePage />} />}/>
        <Route path="/skins/:id" element={<SkinDetail />}/>
        <Route path="/wishlists" element={<WishlistPage />}/>
        <Route path="/createwishlist" element={<CreateWishlistPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
