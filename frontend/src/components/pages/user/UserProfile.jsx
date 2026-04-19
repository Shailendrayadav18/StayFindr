import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./UserProfile.css";

export default function UserProfile() {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const res = await fetch("http://localhost:8080/reviews/user", {
                    credentials: "include"
                });
                const data = await res.json();
                setReviews(data.reviews);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUserReviews();
    }, []);

    const handleDelete = async (listingId, reviewId) => {
        try {
            const res = await fetch(
                `http://localhost:8080/listing/${listingId}/reviews/${reviewId}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            );

            const data = await res.json();

            if (data.success) {
                setReviews((prev) =>
                    prev.filter((r) => r._id !== reviewId)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container-fluid mt-3 mt-md-5 px-2 px-md-0">
            <div className="row">
                <div className="col-md-8 offset-md-2 col-12">
                    <div className="profile-card text-center p-md-4">

                        <div className="avatar-lg">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>

                        <h3 className="mt-md-3 mt-2">{user?.username}</h3>

                        <small className="text-muted">
                            {user ? "Guest" : ""}
                        </small>
                    </div>

                    <div className="mt-5">
                        <hr />
                        <h4>Reviews I've written</h4>

                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review._id} className="review-card p-3 mt-3">

                                    <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                                        <strong>{review.listing?.title}</strong>

                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() =>
                                                handleDelete(review.listing._id, review._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    <div className="mt-2">
                                        ⭐ {review.rating}
                                    </div>

                                    <p className="mb-0">{review.comment}</p>

                                </div>
                            ))
                        ) : (
                            <p>No reviews yet</p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}