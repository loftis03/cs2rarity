import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLoggedInProfileQuery, useGetWishlistQuery, useGetFilteredWishlistSkinsQuery, useGetFilteredSkinDetailsQuery } from "./app/apiSlice";
import { Link } from "react-router-dom";



const WishlistPage = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [wishlistID, setWishlistIDs] = useState();
    const [skinID, setSkinID] = useState([]);
    const [wishlistOrder, setWishlistOrder] = useState([])

    const { data: yourLoggedInProfile, isLoading: profileLoading } = useGetLoggedInProfileQuery();
    const { data: wishlistStuff, isLoading: wishlistLoading } = useGetWishlistQuery();
    const { data: skinStuff, isLoading: skinLoading } = useGetFilteredWishlistSkinsQuery({"wishlist_list": wishlistID});
    const { data: skinDetailStuff, isLoading: skinDetailLoading, isFetching } = useGetFilteredSkinDetailsQuery({ "skin_list": skinID });


    const WishlistButton = () => {
        navigate("/tbd");
      };


    useEffect(() => {
        if (yourLoggedInProfile && !profileLoading) {
            setProfile(yourLoggedInProfile);
        }
    }, [yourLoggedInProfile, profileLoading]);

    useEffect(() => {
        if (wishlistStuff && !wishlistLoading) {
          const ids = wishlistStuff.map(wishlist => wishlist.id);
          console.log("this is wishlistids", ids)
          setWishlistIDs(ids);
          console.log("WishlistID the first one", wishlistID)
        }
      }, [wishlistStuff, wishlistLoading]);


    useEffect(() => {
        if (wishlistID && wishlistID.length > 0) {
            console.log("This is skinStuff", skinStuff)

        }
    })

    useEffect(() => {
        if (skinStuff && Object.keys(skinStuff).length > 0) {
            const ids = Object.keys(skinStuff).reduce((acc, wishlistId) => {
                const skins = skinStuff[wishlistId];
                const skinIds = skins.map(skin => skin.skin_id);
                return [...acc, ...skinIds];
            }, []);

            setSkinID(ids);
            console.log("Extracted skin IDs:", ids);
        }
    }, [skinStuff]);

    useEffect(() => {
        console.log("Skin IDs:", skinID);
        console.log("Skin Details:", skinDetailStuff);
    }, [skinID, skinDetailStuff]);

    if (profileLoading || wishlistLoading || skinLoading || skinDetailLoading || !skinDetailStuff) {
        return <progress className="progress is-primary" max="100"></progress>;
    }

    return (
        <div>
            <h1>Wishlists</h1>
            {profile && (
                <div>
                    <h2>Welcome, {profile.account.username}</h2>
                    <p>Email: {profile.account.email}</p>
                </div>
            )}
            <div>
                <button className="btn-transition gradient mx-2" onClick={WishlistButton}>
                    Wishlists
                </button>
            </div>
            <h3>Wishlists</h3>
            {wishlistStuff && Object.keys(skinStuff ?? {}).length > 0 ? (
                wishlistStuff.map((wishlist) => (
                    <div key={wishlist.id}>
                        <h4>Wishlist: {wishlist.name}</h4>
                        {(skinStuff?.[wishlist.id] ?? []).length > 0 ? (
                            <ul>
                                {skinStuff[wishlist.id].map((skin) => {
                                    const detailedSkin = skinDetailStuff?.find(detail => detail.id === skin.skin_id);
                                    return detailedSkin ? (
                                        <ul key={skin.skin_id}>
                                            <div>

                                                <Link to={`/skins/${detailedSkin.id}`}>
                                                    <img src={detailedSkin.image} alt={detailedSkin.name} />
                                                    <div>{detailedSkin.name}</div>
                                                </Link>
                                            </div>
                                                                    </ul>
                                    ) : null;  // Or handle the case where there is no detailed info
                                })}
                            </ul>
                        ) : (
                            <p>No skins available for this wishlist.</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No wishlist or skin details available.</p>
            )}
        </div>
    );
            };

export default WishlistPage;
