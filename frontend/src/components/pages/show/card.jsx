import { Link } from "react-router-dom"
import "./card.css";

export default function Card({ listing }) {
    return (
        <div className="col-lg-4 col-md-5 col-sm-8 mt-4">
            <Link to={`/listing/${listing._id}`} style={{textDecoration: "none"}}>
                <div className="card listing-card rounded-5">
                    <img src={listing.image.URL} className="mx-4 mt-4 rounded-4" style={{height:"25rem", objectFit:"cover", backgroundColor:"#f1f3f5"}} />
                    <div className="card-body mx-4 p-0">
                        <p className="card-text fs-5 mt-1">
                           <span className="fw-semibold">{listing.title}</span>
                            <br />
                            &#8377; {listing.price.toLocaleString("en-IN")}
                            <br />
                            {listing.place}, {listing.country}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}