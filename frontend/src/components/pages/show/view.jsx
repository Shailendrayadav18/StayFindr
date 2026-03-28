import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./card.css";
import DisplayRating from "./rating";
import { formatDistanceToNowStrict } from "date-fns";
import Map from "./Map";

export default function View() {
    const { id } = useParams();
    const [listing, setListing] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/listing/${id}`);

                // Check if response is OK
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
                    <div className="col-7">
                        <img src={listing?.image?.URL} className="img-fluid" style={{ objectFit: "cover" }} />
                    </div>
                    <div className="w-100"></div>
                    <div className="col-7 fs-4 mt-2">
                        <span className="fw-semibold">{listing.title}</span>
                        <br />
                        {listing.description}
                        <br />
                        {listing.place}, {listing.country}
                        <br />
                        &#8377; {listing.price}
                        <hr />
                    </div>
                    <div className="w-100"></div>
                    <div className="col-7 owner-profile">
                        <div
                            className="avatar"
                            style={{ backgroundColor: getColor(listing?.owner?.username) }}
                        >
                            {listing?.owner?.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="owner-name">Hosted by {listing?.owner?.username}</span>
                    </div>
                    <div className="w-100"></div>
                    <div className="col-7">
                        <hr />
                        <div className="container">
                            <div className="row">
                                {listing.reviews?.map((review, index) => (
                                    <div key={index} className="col-6 mt-2">
                                        <div className="owner-profile">
                                            <div
                                                className="avatar"
                                                style={{ backgroundColor: getColor(review.author.username) }}
                                            >
                                                {review.author.username.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="owner-name">{review.author.username}</span>
                                        </div>
                                        <div>
                                            <DisplayRating rating={review.rating}/> • <span>{formatDistanceToNowStrict(new Date(review.createdAt), { addSuffix: true })}</span>
                                        </div>
                                        <p>
                                            {review.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        <hr />
                    </div>
                    <div className="col-7 mt-2">
                        <h2>Where you'll be</h2>
                        <div className="my-3 fs-5">{listing.place}, {listing.country}</div>
                        <Map coordinates={listing.geometry?.coordinates} title={listing.title}/>
                    </div>
                </div>
            </div>
        </>
    )
}