import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSkinDetailsQuery, useGetWishlistQuery, useAddToWishlistMutation } from "./app/apiSlice";

const SkinDetail = () => {
    const { id } = useParams();
    const {
        data: skinData,
        isLoading: isSkinLoading
    } = useGetSkinDetailsQuery(id);
    const {
        data: wishlists,
        error: wishlisterror,
        isLoading: isWishlistLoading
    } = useGetWishlistQuery();
    const [selectWishlistId, setSelectedWishlistId] = useState("");
    const [buttonText, setButtonText] = useState("Add Skin to Wishlist");
    const handleClick = async () => {
        setButtonText("Skin added to Wishlist")
        try{
            console.log("Adding skin to wishlist:", selectWishlistId, id);
            await addSkinToWishlist({
                body: {"skin_id": id, "wishlist_id": 0},
                wishlist_id: selectWishlistId,
            });
            console.log("Skin Added top Wishlist succesfully!");
        } catch (error) {
            console.error("Error occured while adding skin to wishlist:", error)
        }
    };

    const[addSkinToWishlist, {isLoading: isAddingSkin }] =
        useAddToWishlistMutation();
    if (isSkinLoading || isWishlistLoading) return <div>Loading.....</div>

    if (isSkinLoading) return <div>Skin is currently loading</div>;
    if (!skinData) return <div>No skin data available</div>;

    const { name, description, image } = skinData;

    return (
        <div>
            <div>
                <img src={image} alt={name} />
            </div>
            <div>{name}</div>
            <div>{description}</div>
            <div>
                <h4>Add to Wishlist</h4>
                <div>
                    <select
                    value={selectWishlistId}
                    onChange={(e) => setSelectedWishlistId(e.target.value)}
                    >
                        <option value="">Select a Wishlist</option>

                        {wishlists && wishlists.map((wishlist) => (
                                <option key={wishlist.id} value={wishlist.id}>
                                    {wishlist.name}
                                    {console.log(wishlist.id)}
                                </option>
                            ))}
                    </select>
                </div>
                <button
                onClick={handleClick}
                disabled={!selectWishlistId || isAddingSkin}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default SkinDetail;
