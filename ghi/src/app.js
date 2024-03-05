import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./homepage.jsx";
// import "./App.css";
// import Nav from "./nav.js";

// const domain = /https:\/\/[^/]+/;
// const basename = process.env.PUBLIC_URL.replace(domain, "");

const App = () => {
  return (
    // <BrowserRouter basename={basename}>
    <BrowserRouter>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
