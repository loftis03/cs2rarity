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
    <nav className="navbar navbar-expand-lg navbar-dark mb-4 shadow sticky-top bg-white">
      <button className="m-2 logo d-flex" onClick={homepageButton}>
        <p className="m-1 logo-text align-self-start align-self-center ">Cs2Rarity</p>
      </button>
      {account ? (
        <>
          <div className="" style={{width: '65vw'}}>
          </div>
          <div className="">
            <button className="btn-transition gradient mx-2" onClick={ProfileButton}>
              Profile Page
            </button>
          </div>
          <div className="">
            <button className="btn-transition gradient mx-2" onClick={onLogout}>
              Logout
            </button>
          </div>

        </>
      ) : (
        <>
          <div className="" style={{width: '65vw'}}>
          </div>
          <div>
            <button className="btn-transition gradient mx-2" onClick={loginButton}>
              Login
            </button>
            <button className="btn-transition gradient mx-2" onClick={CreateAccountButton}>
              Create an account
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
