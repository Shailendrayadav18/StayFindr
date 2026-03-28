import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function DisplayRating({ rating }) {
  return (
    <span>
      {[1,2,3,4,5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          style={{
            color: star <= rating ? "#ffc107" : "#e4e5e9",
            fontSize: "10px"
          }}
        />
      ))}
    </span>
  );
}
