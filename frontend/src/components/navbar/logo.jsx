import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import LogoName from "./LogoName";
import "./nav.css"
export default function Logo(){
    return (
        <>
            <div className="d-flex logoStyle">
                <FontAwesomeIcon icon={faCompass} size="2x"/>
                <LogoName />
            </div>
        </>
    )
}