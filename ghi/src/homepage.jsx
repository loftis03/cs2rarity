import { useState } from "react";
import { useGetSkinListQuery } from "./app/apiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const searchCriteria = useSelector((state) => state.search.value)
    const { data, isLoading, isError } = useGetSkinListQuery();

    const filteredSkins = () => {
        if (searchQuery.trim()){
            return data.filter((skin) => skin.name.toLowerCase().includes(searchQuery.toLowerCase()));
        } else{
            return data;
        }
    };

    if (isLoading){
        return <p>Loading Skins...</p>
    }

    if (isError) {
        <p>Error occured while grabbing skins</p>
    }

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Search skins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredSkins().map((skin) =>
                <div key={skin.id}>
                    <Link to={`/skins/${skin.id}`}>
                    {/* <img
                        src={skin.image}
                    /> */}
                    <div>{skin.name}</div>
                    </Link>
                </div>
            )}

        </div>
    );

};

export default HomePage
