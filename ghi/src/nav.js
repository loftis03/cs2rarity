import { useNavigate } from "react-router-dom";
import { useLogoutMutation, useGetAccountQuery } from "./app/apiSlice";

const Nav = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { data: account } = useGetAccountQuery();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  const homepageButton = () => {
    navigate("/");
  };

  const loginButton = () => {
    navigate("/login");
  };

  const CreateAccountButton = () => {
    navigate("/signup");
  };

  const ProfileButton = () => {
    navigate("/yourpage");
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-4 shadow sticky-top bg-white d-flex justify-content-between align-items-center">
      <div onClick={homepageButton} style={{ cursor: 'pointer' }}>
        <img 
          src="https://i.ibb.co/wz31Pvx/CS2-RARITY.png" 
          alt="Cs2Rarity Logo" 
          className="logo-image mr-2" 
          style={{ width: '100px', height: 'auto', marginLeft: '30px', marginTop: '0px' }}
          // Adjust marginLeft and marginTop as needed
        />
      </div>
      {account ? (
        <div>
          <button className="btn-transition gradient mx-2" onClick={ProfileButton}>
            Profile Page
          </button>
          <button className="btn-transition gradient mx-2" onClick={onLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button className="btn-transition gradient mx-2" onClick={loginButton}>
            Login
          </button>
          <button className="btn-transition gradient mx-2" onClick={CreateAccountButton}>
            Create an account
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
