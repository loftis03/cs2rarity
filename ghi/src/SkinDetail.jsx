import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSkinDetailsQuery, useAddToWishlistMutation } from "./app/apiSlice";

const SkinDetail = () => {
    const [skin_id, setID] = useState("")
    const { id } = useParams();
    const {
        data: skinData,
        isLoading: isSkinLoading
    } = useGetSkinDetailsQuery(id);

    useEffect(() => {
        if (skinData && !isSkinLoading) {
            setID(skinData.id)

        }
    }, [skinData, isSkinLoading]);

    const [wishlist, setWishlist] = useState([]);
    
    const [addToWishlistMutation] = useAddToWishlistMutation();
    const addToWishlist = async () => {
        try {
            const body = { "skin_id": skin_id, "wishlist_id": 0 }
            await addToWishlistMutation("list1", body);
            console.log(body)
            console.log(skin_id)
            setWishlist([...wishlist, skinData]);
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };
    
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
            <button onClick={addToWishlist}>Add to Wishlist</button>
        </div>
    );
};

export default SkinDetail;
