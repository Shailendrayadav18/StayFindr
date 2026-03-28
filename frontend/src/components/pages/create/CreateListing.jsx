import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewListing() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();

    const handleImagePreview = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Please Upload Image of Allowed Format!")
                return;
            }

            setPreviewUrl(URL.createObjectURL(file));
        }
    };

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

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const imageData = await uploadImageToCloudinary(data.image[0]);
            const response = await fetch("http://localhost:8080/listing", {
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...data,
                    image: imageData
                })
            });

            const result = await response.json();

            if (result.error) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);
            navigate("/");
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h2>Add New Listing</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text" id="title" name="title" className="form-control"
                                    {...register("title", { required: "Title is required" })}
                                />

                                {errors.title && (
                                    <small className="text-danger">{errors.title.message}</small>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>

                                <textarea
                                    id="description" name="description" className="form-control"
                                    {...register("description", { required: "Description required" })}
                                />

                                {errors.description && (
                                    <small className="text-danger">{errors.description.message}</small>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Upload Image</label>
                                {previewUrl && (
                                    <img
                                        src={previewUrl}
                                        alt="preview"
                                        style={{ width: "200px", borderRadius: "8px" }}
                                        className="mb-2"
                                    />
                                )}

                                <input
                                    type="file" id="image" name="image" className="form-control"
                                    {...register("image", { required: "Image is required" })}
                                    onChange={handleImagePreview}
                                />

                                {errors.image && (
                                    <small className="text-danger">{errors.image.message}</small>
                                )}
                            </div>

                            <div className="row">
                                <div className="mb-3 col-md-4">
                                    <label htmlFor="price" className="form-label">Price</label>

                                    <input
                                        type="number" id="price" name="price" className="form-control"
                                        {...register("price", {
                                            required: "Price required",
                                            min: { value: 1, message: "Price must be greater than 0" }
                                        })}
                                    />

                                    {errors.price && (
                                        <small className="text-danger">{errors.price.message}</small>
                                    )}
                                </div>

                                <div className="mb-3 col-md-8">
                                    <label htmlFor="country" className="form-label">Country</label>

                                    <input
                                        type="text" id="country" name="country" className="form-control"
                                        {...register("country", { required: "Country required" })}
                                    />

                                    {errors.country && (
                                        <small className="text-danger">{errors.country.message}</small>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="place" className="form-label">Place</label>

                                <input
                                    type="text" id="place" name="place" className="form-control"
                                    {...register("place", { required: "Place required" })}
                                />

                                {errors.place && (
                                    <small className="text-danger">{errors.place.message}</small>
                                )}
                            </div>

                           {loading? <b>Creating...</b>: <button className="btn btn-dark">Add Listing</button>}

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}