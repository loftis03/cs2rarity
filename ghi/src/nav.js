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
          src="https://cdn.discordapp.com/attachments/1116140581123538975/1229853046385803358/CS2RARITY.png?ex=663130e7&is=661ebbe7&hm=28c70d1d67dad40490b226e320146268a419edc9bd46bc908906ac656890fa05&"
          alt="Cs2Rarity Logo"
          className="logo-image mr-2"
          style={{ width: '100px', height: 'auto', marginLeft: '30px', marginTop: '0px' }}
          // Adjust marginLeft and marginTop as needed
        />
      </div>
      {account ? (
        <div>
          <button className="button btn-transition gradient mx-2" onClick={ProfileButton}>
            Profile Page
          </button>
          <button className="button btn-transition gradient mx-2" onClick={onLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button className="button btn-transition gradient mx-2" onClick={loginButton}>
            Login
          </button>
          <button className="button btn-transition gradient mx-2" onClick={CreateAccountButton}>
            Create an account
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
