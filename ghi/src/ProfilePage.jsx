import { useEffect, useState } from "react";
import { useGetLoggedInProfileQuery, useGetUserInventorySkinsQuery, useGetUserInventoryQuery, useGetSkinDetailsQuery } from "./app/apiSlice";

const YourProfilePage = () => {

    const [profile, setProfile] = useState(null);
    const [inventoryID, setInventoryID] = useState("")
    const [skinID, setSkinID] = useState("")
    const { data: yourLoggedInProfile, error, isLoading: profileLoading } = useGetLoggedInProfileQuery();
    const { data: inventoryStuff, isLoading: inventoryLoading } = useGetUserInventoryQuery();
    const { data: skinStuff, isLoading: skinLoading } = useGetUserInventorySkinsQuery(inventoryID);
    const { data: skinDetailStuff, isLoading: skinDetailLoading } = useGetSkinDetailsQuery(skinID)



    useEffect(() => {
        if (!profileLoading && yourLoggedInProfile) {
            setProfile(yourLoggedInProfile);
        }

        if (!inventoryLoading && inventoryStuff && inventoryStuff.length > 0) {
            setInventoryID(inventoryStuff[0].id)
            console.log("This is inventory stuff", inventoryStuff[0].id)

        }

        if (!skinLoading && skinStuff && skinStuff.length > 0) {
            const ids = skinStuff.map((skin) => skin.skin_id)

            setSkinID(ids.map((skin) => skin));
            console.log("this is ids", ids)

        }

        console.log("This is also inventory stuff", inventoryStuff)
        console.log("This is skin detail stuff look here", skinDetailStuff)
        console.log(skinID)

    }, [profileLoading, yourLoggedInProfile, inventoryLoading, inventoryStuff]);

    const handleLoop = (e) => {
        e.preventDefault();

    }


    if (profileLoading || skinLoading || inventoryLoading || !skinStuff || !skinDetailStuff) {
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
        { skinDetailStuff.map((skin) => (
                    <div key={skin.id}>
                        {/* Render skin information here */}
                        <ul>Skin name: {skin.name}</ul>
                        <ul></ul>
                    </div>

        )

        )
                }
        </div>
    </div>
  );
        };

export default YourProfilePage;
