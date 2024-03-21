import { useEffect, useState } from "react";
import { useGetLoggedInProfileQuery, useGetUserInventorySkinsQuery, useGetUserInventoryQuery } from "./app/apiSlice";

const YourProfilePage = () => {

    const [profile, setProfile] = useState(null);
    const [inventoryID, setInventoryID] = useState("")
    const { data: yourLoggedInProfile, error, isLoading: profileLoading } = useGetLoggedInProfileQuery();
    const { data: inventoryStuff, isLoading: inventoryLoading } = useGetUserInventoryQuery();
    const { data: skinStuff, isLoading: skinLoading } = useGetUserInventorySkinsQuery(inventoryID);


    useEffect(() => {
        if (!profileLoading && yourLoggedInProfile) {
            setProfile(yourLoggedInProfile);
        }

        if (!inventoryLoading && inventoryStuff && inventoryStuff.length > 0) {
            setInventoryID(inventoryStuff[0].id)
            console.log("This is inventory stuff", inventoryStuff[0].id)

        }
        console.log("This is also inventory stuff", inventoryStuff)

    }, [profileLoading, yourLoggedInProfile, inventoryLoading, inventoryStuff]);



    if (profileLoading || skinLoading || inventoryLoading || !skinStuff) {
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
        { skinStuff.map((skin) => (
            <div key={skin.id}>
                <ul>{skin.skin_id}</ul>
            </div>
        )

        )
                }
        </div>
    </div>
  );
        };

export default YourProfilePage;
