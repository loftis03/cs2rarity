import { useEffect, useState } from "react";
import { useGetLoggedInProfileQuery, useGetUserInventorySkinsQuery } from "./app/apiSlice";

const YourProfilePage = () => {

    const [profile, setProfile] = useState(null);
    const { data: yourLoggedInProfile, error, isLoading } = useGetLoggedInProfileQuery();
    const { data: skinStuff, isLoading: skinLoading } = useGetUserInventorySkinsQuery(0);

    useEffect(() => {
        if (yourLoggedInProfile) {
            setProfile(yourLoggedInProfile);
        }
    }, [yourLoggedInProfile]);

if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div>
        <h1>My page</h1>
        <div>
        {yourLoggedInProfile && (
            <div>
                <h2>Welcome, {yourLoggedInProfile.account.username}</h2>
                <p>Email: {yourLoggedInProfile.account.email}</p>
            </div>
        )}
        </div>
        <h3>Inventory</h3>
        <div>
        {skinStuff && skinStuff.map((skin) => (
            <div key={skin.id}>
                <ul>skin.skin_id</ul>
            </div>
        )

        )
                }
        </div>
    </div>
  );
        };

export default YourProfilePage;
