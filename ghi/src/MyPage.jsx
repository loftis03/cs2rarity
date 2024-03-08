import { useState, useEffect } from "react";
import { useGetLoggedInProfileQuery } from"./app/apiSlice";

const MyPage = () => {
    const [profile, setProfile] = useState(null);

    const { data: loggedInProfile, error, isLoading } = useGetLoggedInProfileQuery();

    useEffect(() => {
        if (loggedInProfile) {
            setProfile(loggedInProfile);
        }
    }, [loggedInProfile]);

    return (
        <div>
          <h1>My Page</h1>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {profile && (
            <div>
              <h2>Welcome, {profile.name}</h2>
              <p>Email: {profile.email}</p>
            </div>
          )}
        </div>
      );
};

export default MyPage;