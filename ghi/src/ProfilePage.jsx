import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLoggedInProfileQuery, useGetUserInventorySkinsQuery, useGetUserInventoryQuery, useGetFilteredSkinDetailsQuery } from "./app/apiSlice";
import { Link } from "react-router-dom";
import profilePicture from "./Counter-Strike_2_29.png";

const YourProfilePage = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [inventoryID, setInventoryID] = useState("");
    const [skinID, setSkinID] = useState([]);

    const { data: yourLoggedInProfile, isLoading: profileLoading } = useGetLoggedInProfileQuery();
    const { data: inventoryStuff, isLoading: inventoryLoading } = useGetUserInventoryQuery();
    const { data: skinStuff, isLoading: skinLoading } = useGetUserInventorySkinsQuery(inventoryID);
    const { data: skinDetailStuff, isLoading: skinDetailLoading, isFetching } = useGetFilteredSkinDetailsQuery({ "skin_list": skinID });

    const WishlistButton = () => {
        navigate("/wishlists");
    };
    const handleCreateWishlist = () => {
        navigate("/createwishlist");
    };

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
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="text-center">
                        <img src={profilePicture} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} />
                        {profile && (
                            <div>
                                <h2>Welcome, {profile.account.username}</h2>
                                <p>Email: {profile.account.email}</p>
                            </div>
                        )}
                        <div className="my-3">
                            <button className="btn-transition gradient mx-2" onClick={WishlistButton}>
                                Wishlists
                            </button>
                            <button className="btn-transition gradient mx-2" onClick={handleCreateWishlist}>
                                Create Wishlist
                            </button>
                        </div>
                        <h3>Inventory</h3>
                        <div className="row">
                            {skinDetailStuff && skinDetailStuff.map((skin) => (
                                <div key={skin.id} className="col-md-4 mb-3">
                                    <Link to={`/skins/${skin.id}`} className="text-decoration-none text-dark">
                                        <img src={skin.image} alt={skin.name} style={{ maxWidth: '100%' }} />
                                        <div>{skin.name}</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YourProfilePage;
