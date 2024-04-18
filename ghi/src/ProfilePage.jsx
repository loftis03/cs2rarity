import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLoggedInProfileQuery, useGetUserInventorySkinsQuery, useGetUserInventoryQuery, useGetFilteredSkinDetailsQuery, useRemoveFromInventoryMutation } from "./app/apiSlice";
import { Link } from "react-router-dom";
import "./style.css";

const YourProfilePage = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [inventoryID, setInventoryID] = useState("");
    const [deleteskinfrominventory] = useRemoveFromInventoryMutation();
    const [skinID, setSkinID] = useState([]);

    const { data: yourLoggedInProfile, isLoading: profileLoading } = useGetLoggedInProfileQuery();
    const { data: inventoryStuff, isLoading: inventoryLoading } = useGetUserInventoryQuery();
    const { data: skinStuff, isLoading: skinLoading } = useGetUserInventorySkinsQuery(inventoryID);
    const { data: skinDetailStuff, isLoading: skinDetailLoading, isFetching } = useGetFilteredSkinDetailsQuery({ "skin_list": skinID });

    const WishlistButton = () => {
        navigate("/wishlists");
        window.location.reload();
    };
    const handleCreateWishlist = () => {
        navigate("/createwishlist");
    };
    const handleDeleteSkinFromInventory = async (inventoryid, skinid) =>{
        try {
            await deleteskinfrominventory({inventory_id: inventoryid, id: skinid})
            window.location.reload();
        } catch (error) {
            console.error("Error occurred while deleting the skin from your inventory", error);
        }
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



    if (profileLoading || inventoryLoading || skinLoading || skinDetailLoading || !skinDetailStuff) {
        return <progress className="progress is-primary" max="100"></progress>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="text-center">

                            {profile && (
                                <div>
                                    <img src={profile.account.profile_picture} alt="Profile" style={{ width: '300px', height: '300px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} />
                                    <h2>Welcome, {profile.account.username}</h2>
                                    <p>Email: {profile.account.email}</p>
                                </div>
                            )}
                            <div className="my-3">
                                <button className="button-78" role="button" onClick={WishlistButton}>
                                    Wishlists
                                </button>
                                <button className="button-78" role="button" onClick={handleCreateWishlist}>
                                    Create Wishlist
                                </button>
                            </div>
                            <h3>Inventory</h3>
                            <div className="row">
                                {skinDetailStuff && skinDetailStuff.map((skin) => (
                                    <div  key={skin.id} className="large col-md-4 mb-3 ">
                                        <Link to={`/skins/${skin.id}`} className="text-decoration-none text-dark">
                                            <img src={skin.image} alt={skin.name} style={{ maxWidth: '100%' }} />
                                            <div>{skin.name}</div>
                                        </Link>
                                        <button className="button-78" role="button" onClick={() => handleDeleteSkinFromInventory(inventoryStuff[0].id, skin.id)}>Delete Skin</button>
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
