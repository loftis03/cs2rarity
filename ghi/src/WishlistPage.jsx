import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLoggedInProfileQuery, useGetWishlistQuery, useGetFilteredWishlistSkinsQuery, useGetFilteredSkinDetailsQuery } from "./app/apiSlice";



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
        if (wishlistID && skinStuff && skinStuff.length > 0 && wishlistID.length > 0) {
            console.log("This is wishlistID too", wishlistID)
            const ids = skinStuff.map(wishlist => wishlist.skin.skin_id);
            // To be worked on later. Will probably need to double .map or something
            setSkinID(ids);
            console.log("This is wishlist skin stuff", skinStuff)
        }
    }, [wishlistID, skinStuff, skinLoading]);

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
            <div className="" style={{width: '65vw'}}>
          </div>
          <div className="">
            <button className="btn-transition gradient mx-2" onClick={WishlistButton}>
              Wishlists
            </button>
          </div>
            <h3>Wishlists</h3>
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

export default WishlistPage;
