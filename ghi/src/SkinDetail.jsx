// import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSkinDetailsQuery } from "./app/apiSlice";

const SkinDetail = () => {
    const { id } = useParams();
    const {
        data: skinData,
        error: skinError,
        isLoading: isSkinLoading
    } = useGetSkinDetailsQuery(id)

    if(isSkinLoading) return <div>Skin is currently loading</div>;
    if(skinError) return <div>There was an error loading your skin</div>;

    const {name, description, image } = skinData;

    return (
        <div>
            <div>
                <img
                src={image}
                />
            </div>
            <div>{name}</div>
            <div>{description}</div>
        </div>
    );
};

export default SkinDetail