import { useState, useEffect } from "react";
import "./Listings.css";
import CreateListing from "../create/CreateListing";
import EditListing from "../edit/EditListings";

export default function MyListings() {
    const [view, setView] = useState("list");
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/listing/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await res.json();

            if (data.success) {
                setData((prev) => prev.filter((item) => item._id !== id));
            } else {
                alert("Failed to delete");
            }

        } catch (err) {
            console.log(err);
        }
    };

    const fetchListings = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/listing/userListings`, {
                credentials: "include",
            });

            // Check if response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setData(result.userListings);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    return (
        <div className="container-fluid px-2 py-2 px-sm-4 py-sm-3" style={{ backgroundColor: "#f8f9fa" }}>
            {view === "create" && (
                <CreateListing
                    onSuccess={() => {
                        setView("list");
                        fetchListings();
                    }}
                    onCancel={() => setView("list")}
                />
            )}

            {view === "edit" && (
                <EditListing
                    id={selectedId}
                    onSuccess={() => {
                        setView("list");
                        fetchListings();
                    }}
                    onCancel={() => setView("list")}
                />
            )}

            {view === "list" && (
                <>
                    <div className="d-flex justify-content-end p-3">
                        <button
                            className="airbnb-plus-btn"
                            onClick={() => setView("create")}
                        >
                            +
                        </button>
                    </div>

                    <div className="row g-1 g-sm-4">
                        {data.length > 0 ? (
                            data.map((listing) => (
                                <div className="col-lg-4 col-md-6 col-sm-10 col-10 mx-auto" key={listing._id}>
                                    <div className="card listing-card-user p-3 rounded-4">
                                        <img
                                            src={listing.image?.URL}
                                            alt={listing.title}
                                            className="listing1-img rounded-3"
                                        />
                                        <div className="card-body p-0 pt-2">
                                            <div className="fs-6 listing-card-user-text">
                                                <span className="fw-semibold">{listing.title}</span>
                                                <br />
                                                &#8377; {listing.price.toLocaleString("en-IN")} / night
                                                <br />
                                                {listing.place}, {listing.country}
                                            </div>

                                            {/* Buttons */}
                                            <div className="card-actions mt-2">
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => {
                                                        setSelectedId(listing._id);
                                                        setView("edit");
                                                    }}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(listing._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <h4>No listings yet</h4>
                                <p>Start hosting and earn by creating your first listing.</p>

                                <button
                                    className="create-btn"
                                    onClick={() => setView("create")}
                                >
                                    Create Your First Listing
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}