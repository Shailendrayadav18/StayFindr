import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../create/CreateListing.css";

export default function EditListing({ id, onSuccess, onCancel }) {
    const [listingData, setListing] = useState({
        title: "",
        description: "",
        price: "",
        country: "",
        place: ""
    });
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setListing({ ...listingData, [event.target.name]: event.target.value });
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Please Upload Image of Allowed Format!");
                return;
            }

            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    const uploadImageToCloudinary = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "wanderlust_dev");

            const res = await fetch(
                "https://api.cloudinary.com/v1_1/du9t7zagw/image/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await res.json();

            return {
                url: data.secure_url,
                filename: data.public_id
            };
        } catch (error) {
            console.error("Cloudinary fetching error", error);
            toast.error(error.message);
        }
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            let bodyData = {
                ...listingData
            };
            if (image) {
                const imageData = await uploadImageToCloudinary(image);
                bodyData.image = imageData;
            }

            const response = await fetch(`/api/listing/${id}`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyData),
            });

            const data = await response.json();

            if (data.error) {
                toast.error(data.message);
                return;
            }
            toast.success(data.message);
            onSuccess();
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/listing/${id}/edit`, {
                    credentials: "include"
                });

                // Check if response is OK
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setListing({
                    title: result.userListing.title || "",
                    description: result.userListing.description || "",
                    price: result.userListing.price || "",
                    country: result.userListing.country || "",
                    place: result.userListing.place || ""
                });
                setPreviewUrl(result.newImage);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <div className="container box-layout">
                <div className="row">
                    <div className="col-12 order-2 order-md-1 mb-2 d-none d-md-block p-0">
                        <button className="soft-back-btn" onClick={onCancel}>
                            ←
                        </button>
                    </div>
                    <div className="col-12 col-md-10 form-wrapper order-1 order-md-2">
                        <h2>Edit your listing</h2>
                        <form onSubmit={handleOnSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" id="title" name="title" className="form-control" value={listingData.title}
                                    placeholder="Enter a catchy title" onChange={handleChange} required />
                                <div className="valid-feedback">Title Looks Good!</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea id="description" name="description" className="form-control" value={listingData.description} onChange={handleChange} required></textarea>
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
                                <input type="file" id="image" name="image" className="form-control" onChange={handleImageChange} />
                            </div>

                            <div className="row">
                                <div className="mb-3 col-md-4">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" id="price" name="price" className="form-control" value={listingData.price}
                                        placeholder="1200" onChange={handleChange} required />
                                    <div className="invalid-feedback">Please Enter Price!</div>
                                </div>

                                <div className="mb-3 col-md-8">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" id="country" name="country" className="form-control" value={listingData.country} onChange={handleChange} required />
                                    <div className="invalid-feedback">Please Provide Country Name!</div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="place" className="form-label">Place</label>
                                <input type="text" id="place" name="place" className="form-control" value={listingData.place}
                                    placeholder="Jaipur, Rajsthan" onChange={handleChange} required />
                                <div className="invalid-feedback">Please Provide Location Details!</div>
                            </div>

                            <div className="d-flex d-md-none gap-2 mt-3">
                                <button
                                    type="button"
                                    className="soft-back-btn flex-fill"
                                    onClick={onCancel}
                                >
                                    ← Back
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-dark flex-fill"
                                >
                                    {loading ? "Updating..." : "Update"}
                                </button>
                            </div>

                            <div className="d-flex d-none d-md-block mt-3">
                                {loading ? <b>Updating...</b> : <button className="btn btn-dark" type="submit">Update</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}