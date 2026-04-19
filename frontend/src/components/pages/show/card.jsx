import { Link } from "react-router-dom"
import "./card.css";

export default function Card({ listing }) {
    return (
        <div className="col-xl-4 col-lg-5 col-md-6 col-sm-10 col-10 mx-auto">
            <Link to={`/listing/${listing._id}`} style={{textDecoration: "none"}}>
                <div className="card listing-card p-3 rounded-4">
                    <img src={listing.image.URL} className="listing-img rounded-3" />
                    <div className="card-body p-0 pt-3">
                        <p className="fs-5 m-0">
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