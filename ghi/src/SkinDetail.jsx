import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSkinDetailsQuery, useGetWishlistQuery, useAddToWishlistMutation, useAddToInventoryMutation, useGetUserInventoryQuery } from "./app/apiSlice";
import "./style.css";
import "./test.css";

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
    const {
        data: inventory,
        error: inventoryerror,
        isLoading: isInventoryLoading
    } = useGetUserInventoryQuery();

    const [selectWishlistId, setSelectedWishlistId] = useState("");
    const [buttonText, setButtonText] = useState("Add Skin to Wishlist");
    const [buttonInventoryText, setInventoryButtonText] = useState("Add Skin to inventory");
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


    const handleInventoryClick = async () => {
        setInventoryButtonText("Skin added to Inventory")
        try{
            console.log("Adding skin to inventory:");
            console.log(inventory[0].id, "This is what the inventory id looks like");
            await addSkinToInventory({
                inventory_id: inventory[0].id,
                body: {"skin_id": id},
            });
            console.log("Skin Added to Inventory successfully!");
        } catch (error) {
            console.error("Error occured while adding skin to Inventory:", error)
        }
    };


    const[addSkinToWishlist, {isLoading: isAddingSkin }] =
        useAddToWishlistMutation();

    const[addSkinToInventory, {isLoading: isAddingInventorySkin }] =
    useAddToInventoryMutation();

    if (isSkinLoading || isWishlistLoading || isInventoryLoading) return <div>Loading.....</div>

    if (isSkinLoading) return <div>Skin is currently loading</div>;
    if (!skinData) return <div>No skin data available</div>;

    const { name, description, image } = skinData;

    return (
        <div style={{
            borderRadius: "5px",
            padding: "20px",
            margin: "20px auto",
            maxWidth: "600px",
            backgroundColor: "#f9f9f9"
        }}>
            <div id="picture">
                <div className="avatar">
                    <img src={image} alt={name} />
                </div>
            </div>
            <div className="center"style={{ fontWeight: "bold", fontSize: "1.5em" }}>{name}</div> {/* Apply styles here */}
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
            <div>
                <h4>
                    Add to Inventory
                </h4>
                <div>
                    <button
                    onClick={handleInventoryClick}
                    disabled={isAddingInventorySkin}
                    >
                        {buttonInventoryText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkinDetail;
