import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./card";
import "./card.css"
import { FiX } from "react-icons/fi";

export default function Show() {
    const [data, setData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const city = query.get("city");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/listing${city ? `?city=${city}` : ""}`, {
                    credentials: 'include'
                });

                // Check if response is OK
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchData();
    }, [city]);

    return (
        <div className="container-fluid px-3 py-2 px-sm-5 py-sm-3" style={{ backgroundColor: "#f8f9fa" }}>
            {city && (
                <div className="d-flex align-items-center mt-1 px-2">
                    <h5>
                        Results for <span className="fw-semibold text-dark">"{city}"</span>
                    </h5>
                    <button
                        className="clear-btn"
                        onClick={() => navigate("/")}
                    >
                        <FiX style={{ marginRight: "4px" }} />
                        Clear
                    </button>
                </div>
            )}
            {data.length === 0 ? (
                <div className="text-center mt-5">
                    <h5>No listings found for "{city}"</h5>
                </div>
            ) : (
                <div className="row g-2 g-sm-4">
                    {data.map((listing, index) => (
                        <Card listing={listing} key={index} />
                    ))}
                </div>
            )}
        </div>
    )
}