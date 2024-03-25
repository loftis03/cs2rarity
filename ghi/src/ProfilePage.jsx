import { useEffect, useState } from "react";
import { useGetLoggedInProfileQuery, useGetUserInventorySkinsQuery, useGetUserInventoryQuery, useGetFilteredSkinDetailsQuery } from "./app/apiSlice";

const YourProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [inventoryID, setInventoryID] = useState("");
    const [skinID, setSkinID] = useState([]);

    const { data: yourLoggedInProfile, isLoading: profileLoading } = useGetLoggedInProfileQuery();
    const { data: inventoryStuff, isLoading: inventoryLoading } = useGetUserInventoryQuery();
    const { data: skinStuff, isLoading: skinLoading } = useGetUserInventorySkinsQuery(inventoryID);
    const { data: skinDetailStuff, isLoading: skinDetailLoading, isFetching } = useGetFilteredSkinDetailsQuery({ "skin_list": skinID });

    useEffect(() => {
        if (yourLoggedInProfile && !profileLoading) {
            setProfile(yourLoggedInProfile);
        }
    }, [yourLoggedInProfile, profileLoading]);

    useEffect(() => {
        if (inventoryStuff && !inventoryLoading && inventoryStuff.length > 0) {
            setInventoryID(inventoryStuff[0].id);
        }
    }, [inventoryStuff, inventoryLoading]);

    useEffect(() => {
        if (inventoryID && skinStuff && !skinLoading && skinStuff.length > 0) {
            const ids = skinStuff.map(skin => skin.skin_id);
            setSkinID(ids);
        }
    }, [inventoryID, skinStuff, skinLoading]);

    useEffect(() => {
        console.log("Skin IDs:", skinID);
        console.log("Skin Details:", skinDetailStuff);
    }, [skinID, skinDetailStuff]);

    if (profileLoading || inventoryLoading || skinLoading || skinDetailLoading || !skinDetailStuff) {
        return <progress className="progress is-primary" max="100"></progress>;
    }

    return (
        <div>
            <h1>My page</h1>
            {profile && (
                <div>
                    <h2>Welcome, {profile.account.username}</h2>
                    <p>Email: {profile.account.email}</p>
                </div>
            )}
            <h3>Inventory</h3>
            {skinDetailStuff && skinDetailStuff.length > 0 ? (
                <div>
                    {skinDetailStuff.map((skin) => (
                        <div key={skin.id}>
                            <ul>Skin name: {skin.name}</ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No skin details available.</p>
            )}
        </div>
    );
};

export default YourProfilePage;
