import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLoggedInProfileQuery, useGetWishlistQuery, useGetFilteredWishlistSkinsQuery, useGetFilteredSkinDetailsQuery, useClearWishlistMutation, useRemoveFromWishlistMutation } from "./app/apiSlice";
import { Link } from "react-router-dom";
import profilePicture from "./Counter-Strike_2_29.png";

const WishlistPage = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [wishlistID, setWishlistIDs] = useState();
    const [skinID, setSkinID] = useState([]);
    const [clearwishlistmutation] = useClearWishlistMutation();
    const [deleteskinfromwishlist] = useRemoveFromWishlistMutation();
    const [wishlistOrder, setWishlistOrder] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const { data: yourLoggedInProfile, isLoading: profileLoading } = useGetLoggedInProfileQuery();
    const { data: wishlistStuff, isLoading: wishlistLoading } = useGetWishlistQuery();
    const { data: skinStuff, isLoading: skinLoading } = useGetFilteredWishlistSkinsQuery({"wishlist_list": wishlistID});
    const { data: skinDetailStuff, isLoading: skinDetailLoading, isFetching } = useGetFilteredSkinDetailsQuery({ "skin_list": skinID });

    const handleClearWishlist = async (wishlist_id) => {
        try{
            await clearwishlistmutation(wishlist_id);
            window.location.reload();
        } catch(error){
            console.error("Error occured while deleting the wishlist", error);
        }
    };
    const handleDeleteSkinFromWishlist = async (wishlistId, skinId) => {
        try {
            await deleteskinfromwishlist({ wishlist_id: wishlistId, id: `${skinId}` });
            window.location.reload();
        } catch (error) {
            console.error("Error occurred while deleting the skin from the wishlist", error);
        }
    };

    useEffect(() => {
        if (yourLoggedInProfile && !profileLoading) {
            setProfile(yourLoggedInProfile);
        }
    }, [yourLoggedInProfile, profileLoading]);

    useEffect(() => {
        if (wishlistStuff && !wishlistLoading) {
          const ids = wishlistStuff.map(wishlist => wishlist.id);
          setWishlistIDs(ids);
        }
    }, [wishlistStuff, wishlistLoading]);

    useEffect(() => {
        if (skinStuff && Object.keys(skinStuff).length > 0) {
            const ids = Object.keys(skinStuff).reduce((acc, wishlistId) => {
                const skins = skinStuff[wishlistId];
                const skinIds = skins.map(skin => skin.skin_id);
                return [...acc, ...skinIds];
            }, []);

            setSkinID(ids);
        }
    }, [skinStuff]);


    if (profileLoading || wishlistLoading || skinLoading || skinDetailLoading || !skinDetailStuff) {
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
                        <Link to="/yourpage">
                            <button class="button-78" role="button">Profile Page</button>
                        </Link>
                        <h1>Wishlists</h1>
                        {wishlistStuff.map((wishlist) => (
                            <div key={wishlist.id}>
                                <div>
                                 <h4>Wishlist: {wishlist.name}</h4>
                                 <button
                                 className="button-78" role="button"
                                 onClick={() => handleClearWishlist(wishlist.id)}
                                 refresh="true"
                                 >
                                    Delete Wishlist
                                 </button>
                                </div>
                                <div className="row">
                                    {(skinStuff?.[wishlist.id] ?? []).length > 0 ? (
                                        skinStuff[wishlist.id].map((skin) => {
                                            const detailedSkin = skinDetailStuff?.find(detail => detail.id === skin.skin_id);
                                            return detailedSkin ? (
                                                <div key={skin.skin_id} className="large col-md-4 mb-3">
                                                    <Link to={`/skins/${detailedSkin.id}`} className="text-decoration-none text-dark">
                                                        <img src={detailedSkin.image} alt={detailedSkin.name} style={{ maxWidth: '100%' }} />
                                                        <div style={{ textDecoration: 'none' }}>{detailedSkin.name}</div>
                                                    </Link>
                                                    <button class="button-78" role="button" onClick={() => handleDeleteSkinFromWishlist(wishlist.id, skin.skin_id)}>Delete Skin</button>
                                                </div>
                                            ) : null;
                                        })
                                    ) : (
                                        <p>No skins available for this wishlist.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
