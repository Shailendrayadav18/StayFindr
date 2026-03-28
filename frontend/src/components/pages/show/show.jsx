import { useEffect, useState } from "react";
import Card from "./card";
import "./card.css"

export default function Show() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/listing");

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
    }, []);

    return ( 
        <div className="container-fluid" style={{backgroundColor:"#f8f9fa"}}>
            <div className="row">
                {data.map((listing, index)=>(
                    <Card listing={listing} key={index}/>
                ))}
            </div>
        </div>
    )
}