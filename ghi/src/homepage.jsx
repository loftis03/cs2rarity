import React, { useState, useMemo, useEffect } from "react";
import { useGetSkinListQuery } from "./app/apiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const searchCriteria = useSelector((state) => state.search.value);
    const { data, isLoading, isError } = useGetSkinListQuery();

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery])

    if (isLoading) {
        return <p>Loading Skins...</p>;
    }

    if (isError) {
        return <p>Error occurred while grabbing skins</p>;
    }

    let filteredData = data;
    if (searchQuery.trim()) {
        filteredData = data.filter((skin) =>
            skin.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    console.log(paginatedData)

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Search skins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {paginatedData.map((skin) => (
                <div key={skin.id}>
                    <Link to={`/skins/${skin.id}`}>
                        <img src={skin.image} alt={skin.name} />
                        <div>{skin.name}</div>
                    </Link>
                </div>
            ))}
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomePage;
