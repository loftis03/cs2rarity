import React, { useState} from "react";
import { useCreateWishlistMutation } from "./app/apiSlice";
import { useNavigate } from "react-router-dom";

const CreateWishlistPage = () => {
    const navigate = useNavigate();
    const [wishlistName, setWishlistName] = useState("");
    const [CreateWishlist] = useCreateWishlistMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Creating wishlist with name:", wishlistName);
        try {
        
            await CreateWishlist({ name: wishlistName });
            navigate("/yourpage");
        } catch (error) {
            console.error("Error creating wishlist:", error);
        }
    };
    
    const cancelButton = () => {
        navigate("/yourpage")
    };

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className='background-accent shadow-lg'></div>
                    <div className='background-accent-2 shadow-lg'></div>
                    <div className="shadow p-4 mt-4">
                        <h1>Create Wishlist</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    onChange={(e) => setWishlistName(e.target.value)}
                                    value={wishlistName}
                                    placeholder="Wishlist Name"
                                    required
                                    type="text"
                                    name="wishlistName"
                                    id="wishlistName"
                                    className="form-control"
                                />
                                <label htmlFor="wishlistName">Wishlist Name</label>
                            </div>
                            <button className="btn-transition-sm gradient" type="submit">
                                Create Wishlist
                            </button>
                            <button
                                className="btn-transition-sm gradient"
                                onClick={cancelButton}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
    
export default CreateWishlistPage;