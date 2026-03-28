import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowMsg from "../showMsg/flashMsg";

export default function NewListing() {
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const navigate = useNavigate();
    const [listingData, setListing] = useState({
        title: "",
        description: "",
        place: "",
        country: "",
        price: 0,
    });
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleChange = (event) => {
        setListing({ ...listingData, [event.target.name]: event.target.value });
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setType("error");
                setMessage("Please select a valid image file.");
                return;
            }

            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (!image) {
            setType("error");
            setMessage("Please select an image before submitting");
            return;
        }

        const formData = new FormData();

        formData.append("title", listingData.title);
        formData.append("description", listingData.description);
        formData.append("price", listingData.price);
        formData.append("place", listingData.place);
        formData.append("country", listingData.country);
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:8080/listing", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.error) {
                setType("error");
                setMessage(data.message);
            }
            else if (data.success) {
                setType("success");
                setMessage(data.message);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setType("error");
            setMessage("An error occurred while uploading.");
        }
    }
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
                setType("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <>
            {message && (<div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <ShowMsg type={type} message={message} />
                    </div>
                </div>
            </div>)}
            <div className="container">
                <div className="row mt-2">
                    <div className="col-8 offset-2">
                        <h2>Add New Listing</h2>
                        <form onSubmit={handleOnSubmit} className="needs-validation" encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" id="title" name="title" className="form-control"
                                    placeholder="Enter a catchy title" onChange={handleChange} required />
                                <div className="valid-feedback">Title Looks Good!</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea id="description" name="description" className="form-control" onChange={handleChange} required></textarea>
                                <div className="invalid-feedback">Please provide some description!</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Upload Image</label>
                                {previewUrl && (
                                    <div className="my-2" >
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            style={{ width: "200px", borderRadius: "8px" }}
                                        />
                                    </div>
                                )}
                                <input type="file" id="image" name="image" className="form-control" onChange={handleImageChange} required />
                            </div>

                            <div className="row">
                                <div className="mb-3 col-md-4">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" id="price" name="price" className="form-control"
                                        placeholder="1200" onChange={handleChange} required />
                                    <div className="invalid-feedback">Please Enter Price!</div>
                                </div>

                                <div className="mb-3 col-md-8">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" id="country" name="country" className="form-control" onChange={handleChange} required />
                                    <div className="invalid-feedback">Please Provide Country Name!</div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="place" className="form-label">Place</label>
                                <input type="text" id="place" name="place" className="form-control"
                                    placeholder="Jaipur, Rajsthan" onChange={handleChange} required />
                                <div className="invalid-feedback">Please Provide Location Details!</div>
                            </div>
                            <button type="submit" className="btn btn-dark">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}