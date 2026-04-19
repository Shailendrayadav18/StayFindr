import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./card.css";
import DisplayRating from "./rating";
import { formatDistanceToNowStrict } from "date-fns";
import Map from "./Map";
import "./review.css";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import AuthForm from "../user/Authform";

export default function View() {
    const { id } = useParams();
    const [listing, setListing] = useState({});
    const [activeTab, setActiveTab] = useState("reviews");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [animatedRating, setAnimatedRating] = useState(0);
    const { user } = useContext(AuthContext);
    const [showLoginInline, setShowLoginInline] = useState(false);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:8080/listing/${listing._id}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    rating,
                    comment
                })
            });

            const data = await res.json();

            if (data.success) {
                setListing((prev) => ({
                    ...prev,
                    reviews: [...prev.reviews, data.review]
                }));
                setRating(0);
                setComment("");
                setActiveTab("reviews");
            }
            toast.error(data.message);
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    const userReview = listing.reviews?.find(
        (review) => review.author._id === user?._id
    );

    const totalReviews = listing.reviews?.length || 0;
    const avgRating = totalReviews > 0 ? (
        listing.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
    ).toFixed(1) : 0;

    const ratingCount = [5, 4, 3, 2, 1].map((star) => {
        return {
            star,
            count: listing.reviews?.filter((r) => r.rating === star).length || 0,
        };
    });

    const getBadge = () => {
        if (avgRating >= 4.8 && totalReviews >= 20) {
            return "Guest favourite";
        } else if (avgRating >= 4.5) {
            return "Top rated";
        } else if (avgRating >= 4.0) {
            return "Highly rated";
        } else if (avgRating >= 3.0) {
            return "Average rating"
        }
        return null;
    };

    useEffect(() => {
        let startTime = null;
        const duration = 800;
        const end = avgRating || 0;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            const progressRatio = Math.min(progress / duration, 1);
            const value = (progressRatio * end).toFixed(2);

            setAnimatedRating(value);

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                const numericEnd = Number(end);

                if (!isNaN(numericEnd)) {
                    setAnimatedRating(numericEnd.toFixed(2));
                } else {
                    setAnimatedRating("0.00");
                }
            }
        };

        requestAnimationFrame(animate);
    }, [avgRating]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/listing/${id}`, {
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setListing(result);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchData();
    }, []);

    if (!listing) {
        return <h3>Loading</h3>
    }

    const colors = ["#FF6B6B", "#4ECDC4", "#556270", "#C7F464", "#C44D58"];

    const getColor = (name = "xyz") => {
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <>
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-7">
                        <img src={listing?.image?.URL} className="img-fluid view-image" />
                    </div>
                    <div className="w-100"></div>
                    <div className="col-12 col-md-7 responsive-text mt-2">
                        <span className="fw-semibold">{listing.title}</span>
                        <br />
                        <span className="fw-light">{listing.description}</span>
                        <br />
                        {listing.place}, {listing.country}
                        <br />
                        &#8377; {listing.price} / night
                        <hr />
                    </div>
                    <div className="w-100"></div>
                    <div className="col-12 col-md-7 owner-profile">
                        <div
                            className="avatar"
                            style={{ backgroundColor: getColor(listing?.owner?.username) }}
                        >
                            {listing?.owner?.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="owner-name">Hosted by {listing?.owner?.username}</span>
                    </div>

                    <div className="w-100"></div>
                    <div className="col-12 col-md-7">
                        <hr />
                    </div>

                    <div className="col-12 col-md-7">

                        <div className="rating-hero text-center mt-4 d-flex align-items-center justify-content-center gap-4">

                            <span className="leaf">🌿</span>

                            <div>
                                <div className="rating-number">{animatedRating}</div>
                                {getBadge() && (
                                    <div className="rating-badge">
                                        {getBadge()}
                                    </div>
                                )}
                                <div className="rating-subtext">
                                    Based on {totalReviews} reviews
                                </div>
                            </div>

                            <span className="leaf">🌿</span>

                        </div>

                        <div className="rating-breakdown my-4 mx-auto">
                            {ratingCount.map((item) => (
                                <div key={item.star} className="d-flex align-items-center mb-2">
                                    <span style={{ width: "20px" }}>{item.star}</span>

                                    <div className="bar-container mx-2">
                                        <div
                                            className="bar-fill"
                                            style={{
                                                width: `${totalReviews
                                                    ? (item.count / totalReviews) * 100
                                                    : 0
                                                    }%`,
                                            }}
                                        ></div>
                                    </div>

                                    <span>{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12 col-md-7">
                        <hr />
                    </div>
                    <div className="col-12 col-md-7 mt-2">
                        <div className="review-tabs d-flex gap-3">
                            <span
                                className={`tab ${activeTab === "reviews" ? "active-tab" : ""}`}
                                onClick={() => setActiveTab("reviews")}
                            >
                                Reviews
                            </span>

                            <span
                                className={`tab ${activeTab === "add" ? "active-tab" : ""}`}
                                onClick={() => {
                                    if (!user) {
                                        setShowLoginInline(true);
                                        setActiveTab("add");
                                    } else {
                                        setActiveTab("add");
                                    }
                                }}
                            >
                                Add Review
                            </span>
                        </div>
                    </div>
                    <div className="col-12 col-md-7">

                        {activeTab === "reviews" ? (
                            <>
                                <div className="container">
                                    <div className="row">
                                        {listing.reviews?.length > 0 ? (
                                            listing.reviews.map((review, index) => (
                                                <div key={index} className="col-12 col-md-6 mt-2">
                                                    <div className="owner-profile">
                                                        <div
                                                            className="avatar"
                                                            style={{ backgroundColor: getColor(review?.author?.username || "User") }}
                                                        >
                                                            {review?.author?.username?.charAt(0).toUpperCase() || "U"}
                                                        </div>
                                                        <span className="owner-name">
                                                            {review?.author?.username || "Unknown"}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <DisplayRating rating={review.rating} /> •{" "}
                                                        <span>
                                                            {formatDistanceToNowStrict(
                                                                new Date(review.createdAt),
                                                                { addSuffix: true }
                                                            )}
                                                        </span>
                                                    </div>

                                                    <p>{review.comment}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No reviews yet</p>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {showLoginInline ? (
                                    <AuthForm
                                        inline={true}
                                        onSuccess={() => {
                                            setShowLoginInline(false);
                                            setActiveTab("add");
                                        }}
                                    />
                                ) : userReview ? (
                                    <div className="auth-warning">
                                        <p>You have already reviewed this listing</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleReviewSubmit} className="review-box p-3">

                                        <div className="mb-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    className="star"
                                                    onClick={() => setRating(star)}
                                                    onMouseEnter={() => setHover(star)}
                                                    onMouseLeave={() => setHover(0)}
                                                >
                                                    {(hover || rating) >= star ? "★" : "☆"}
                                                </span>
                                            ))}
                                        </div>
                                        <textarea
                                            className="form-control mb-3"
                                            rows="3"
                                            placeholder="Give your review..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                        />

                                        <button className="submit-review-btn">
                                            Submit Review
                                        </button>
                                    </form>
                                )
                                }
                            </>
                        )}

                    </div>
                    <div className="col-12 col-md-7">
                        <hr className="mt-0" />
                        <h2>Where you'll be</h2>
                        <div className="my-3 fs-5">{listing.place}, {listing.country}</div>
                        <div style={{ width: "100%", height: "500px" }}>
                            {listing?.geometry?.coordinates?.length === 2 ? (
                                <Map
                                    coordinates={listing.geometry.coordinates}
                                    title={listing.title}
                                />
                            ) : (
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <p>📍 Location not available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}