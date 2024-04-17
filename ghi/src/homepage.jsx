import React, { useState, useEffect } from "react";
import { useGetSkinListQuery } from "./app/apiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
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

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' } }>
            <div className="center">
                <input
                    type="text"
                    placeholder="Search skins..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {paginatedData.map((skin) => (
                    <div className="large text" key={skin.id} style={{ padding: '10px', textAlign: 'center' }}>
                        <Link to={`/skins/${skin.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img src={skin.image} alt={skin.name} style={{ maxWidth: '100%' }} />
                            <div style={{ textDecoration: 'none' }}>{skin.name}</div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="center"style={{ marginTop: '20px', marginBottom: '40px' }}>
                <button className="selector-button" onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span >{`Page ${currentPage} of ${totalPages}`}</span>
                <button className="selector-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomePage;
