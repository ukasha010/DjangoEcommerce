// import React, { useState } from "react";
// import "./ProductForm.css"; // Import the CSS file for styling
// import axios from "axios";

// const ProductForm = () => {
//     const [product, setProduct] = useState({
//         product_name: "",
//         category: "clothing",
//         description: "",
//         price: "",
//         inventory: [{ size: "", color: "", quantity: "" }],
//     });
//     const [images, setImages] = useState([]);

//     const handleInputChange = (e, index) => {
//         const { name, value } = e.target;
//         const updatedInventory = [...product.inventory];
//         updatedInventory[index][name] = value;

//         setProduct((prevProduct) => ({
//             ...prevProduct,
//             inventory: updatedInventory,
//         }));
//     };

//     const handleAddInventory = () => {
//         setProduct((prevProduct) => ({
//             ...prevProduct,
//             inventory: [
//                 ...prevProduct.inventory,
//                 { size: "", color: "", quantity: "" },
//             ],
//         }));
//     };

//     const handleRemoveInventory = (index) => {
//         const updatedInventory = [...product.inventory];
//         updatedInventory.splice(index, 1);

//         setProduct((prevProduct) => ({
//             ...prevProduct,
//             inventory: updatedInventory,
//         }));
//     };

//     const handleSubmit = async () => {
//         try {
//             const formData = new FormData();

//             formData.append("product_name", product.product_name);
//             formData.append("category", product.category);
//             formData.append("description", product.description);
//             formData.append("price", product.price);

//             // Append images
//             images.forEach((image) => {
//                 formData.append("images", image);
//             });

//             // Append inventory data as JSON string
//             const inventoryData = JSON.stringify(product.inventory);
//             formData.append("inventory", inventoryData);

//             const response = await axios.post(
//                 "http://localhost:8000/products/",
//                 formData
//             );

//             console.log(response);
//         } catch (error) {
//             console.error("Error submitting the form:", error);
//         }
//     };

//     const handleImageChange = (e) => {
//         const selectedFiles = e.target.files;
//         setImages([...images, ...selectedFiles]);
//     };

//     return (
//         <div className="product-form-container">
//             <h2>Product Upload Form</h2>
//             <div className="flex flex-row">
//                 <div className="mt-5 h-[40rem] w-[20rem] overflow-auto">
//                     {images.map((image, index) => (
//                         <div key={index}>
//                             <img
//                                 className="h-[17rem] w-[15rem] mb-5"
//                                 src={URL.createObjectURL(image)}
//                                 alt={`Preview ${index}`}
//                             />
//                         </div>
//                     ))}
//                 </div>
//                 <form>
//                     <div>
//                         <label htmlFor="image" className="block text-sm text-black  pt-4">
//                             Choose Images
//                         </label>

//                         <input
//                             type="file"
//                             multiple
//                             onChange={handleImageChange}
//                             className="p-4 mb-2"
//                         />
//                     </div>

//                     <label>
//                         Product Name:
//                         <input
//                             type="text"
//                             name="product_name"
//                             value={product.product_name}
//                             onChange={(e) =>
//                                 setProduct({ ...product, [e.target.name]: e.target.value })
//                             }
//                         />
//                     </label>
//                     <label htmlFor="category">Choose a category:</label>
//                     <select
//                         value={product.category}
//                         name="category"
//                         onChange={(e) =>
//                             setProduct({ ...product, [e.target.name]: e.target.value })
//                         }
//                         className="px-3 py-2 mb-3"
//                         id="category"
//                     >
//                         <option value='clothing'>clothing</option>
//                         <option value='electronics'>electronics</option>
//                         <option value='books'>books</option>
//                     </select>

//                     <label>
//                         Description:
//                         <textarea
//                             name="description"
//                             value={product.description}
//                             onChange={(e) =>
//                                 setProduct({ ...product, [e.target.name]: e.target.value })
//                             }
//                         />
//                     </label>

//                     <label>
//                         Price:
//                         <input
//                             type="text"
//                             name="price"
//                             value={product.price}
//                             onChange={(e) =>
//                                 setProduct({ ...product, [e.target.name]: e.target.value })
//                             }
//                         />
//                     </label>

//                     <h3>Inventory</h3>
//                     {product.inventory.map((item, index) => (
//                         <div key={index} className="inventory-item">
//                             <label>
//                                 Size:
//                                 <input
//                                     type="text"
//                                     name="size"
//                                     value={item.size}
//                                     onChange={(e) => handleInputChange(e, index)}
//                                 />
//                             </label>

//                             <label>
//                                 Color:
//                                 <input
//                                     type="text"
//                                     name="color"
//                                     value={item.color}
//                                     onChange={(e) => handleInputChange(e, index)}
//                                 />
//                             </label>

//                             <label>
//                                 Quantity:
//                                 <input
//                                     type="number"
//                                     name="quantity"
//                                     value={item.quantity}
//                                     onChange={(e) => {
//                                         const value = Math.max(0, parseInt(e.target.value) || 0);
//                                         handleInputChange({ target: { name: 'quantity', value } }, index);
//                                     }}
//                                     min="0"
//                                 />
//                             </label>

//                             <button
//                                 type="button"
//                                 onClick={() => handleRemoveInventory(index)}
//                             >
//                                 Remove
//                             </button>
//                         </div>
//                     ))}

//                     <button
//                         className="mx-2 bg-blue-500 px-2  py-2 text-white hover:bg-green-500 "
//                         type="button"
//                         onClick={handleAddInventory}
//                     >
//                         Add Inventory
//                     </button>

//                     <button
//                         className="mx-2 bg-blue-500 px-2  py-2 text-white hover:bg-green-500 "
//                         type="button"
//                         onClick={handleSubmit}
//                     >
//                         Submit
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ProductForm;


import React, { useState } from "react";
import "./ProductForm.css"; // Import the CSS file for styling
import axios from "axios";

const ProductForm = () => {
    const [product, setProduct] = useState({
        product_name: "",
        category: "clothing",
        description: "",
        price: "",
        inventory: [{ size: "", color: "", quantity: "" }],
    });
    const [images, setImages] = useState([]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedInventory = [...product.inventory];
        updatedInventory[index][name] = value;

        setProduct((prevProduct) => ({
            ...prevProduct,
            inventory: updatedInventory,
        }));
    };

    const handleAddInventory = () => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            inventory: [
                ...prevProduct.inventory,
                { size: "", color: "", quantity: "" },
            ],
        }));
    };

    const handleRemoveInventory = (index) => {
        const updatedInventory = [...product.inventory];
        updatedInventory.splice(index, 1);

        setProduct((prevProduct) => ({
            ...prevProduct,
            inventory: updatedInventory,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Append product data as JSON
        formData.append("data", JSON.stringify({
            product_name: product.product_name,
            category: product.category,
            description: product.description,
            price: product.price,
            inventory: product.inventory,
        }));

        // Append images
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });

        console.log("Form data:", formData);

        try {
            const response = await axios.post(
                "http://localhost:8000/products/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response);
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    };

    const handleImageChange = (e) => {
        const selectedFiles = e.target.files;
        setImages([...images, ...selectedFiles]);
    };

    return (
        <div className="product-form-container">
            <h2>Product Upload Form</h2>
            <div className="flex flex-row">
                <div className="mt-5 h-[40rem] w-[20rem] overflow-auto">
                    {images.map((image, index) => (
                        <div key={index}>
                            <img
                                className="h-[17rem] w-[15rem] mb-5"
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index}`}
                            />
                        </div>
                    ))}
                </div>
                <form>
                    <div>
                        <label htmlFor="image" className="block text-sm text-black  pt-4">
                            Choose Images
                        </label>

                        <input
                            type="file"
                            multiple
                            onChange={(e) => handleImageChange(e)}
                            className="p-4 mb-2"
                        />
                    </div>

                    <label>
                        Product Name:
                        <input
                            type="text"
                            name="product_name"
                            value={product.product_name}
                            onChange={(e) =>
                                setProduct({ ...product, [e.target.name]: e.target.value })
                            }
                        />
                    </label>
                    <label htmlFor="category">Choose a category:</label>
                    <select
                        value={product.category}
                        name="category"
                        onChange={(e) =>
                            setProduct({ ...product, [e.target.name]: e.target.value })
                        }
                        className="px-3 py-2 mb-3"
                        id="category"
                    >
                        <option value='clothing'>clothing</option>
                        <option value='electronics'>electronics</option>
                        <option value='books'>books</option>
                    </select>

                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={(e) =>
                                setProduct({ ...product, [e.target.name]: e.target.value })
                            }
                        />
                    </label>

                    <label>
                        Price:
                        <input
                            type="text"
                            name="price"
                            value={product.price}
                            onChange={(e) =>
                                setProduct({ ...product, [e.target.name]: e.target.value })
                            }
                        />
                    </label>

                    <h3>Inventory</h3>
                    {product.inventory.map((item, index) => (
                        <div key={index} className="inventory-item">
                            <label>
                                Size:
                                <input
                                    type="text"
                                    name="size"
                                    value={item.size}
                                    onChange={(e) => handleInputChange(e, index)}
                                />
                            </label>

                            <label>
                                Color:
                                <input
                                    type="text"
                                    name="color"
                                    value={item.color}
                                    onChange={(e) => handleInputChange(e, index)}
                                />
                            </label>

                            <label>
                                Quantity:
                                <input
                                    type="number"
                                    name="quantity"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const value = Math.max(0, parseInt(e.target.value) || 0);
                                        handleInputChange({ target: { name: 'quantity', value } }, index);
                                    }}
                                    min="0"
                                />
                            </label>

                            <button
                                type="button"
                                onClick={() => handleRemoveInventory(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <button
                        className="mx-2 bg-blue-500 px-2  py-2 text-white hover:bg-green-500 "
                        type="button"
                        onClick={handleAddInventory}
                    >
                        Add Inventory
                    </button>

                    <button
                        className="mx-2 bg-blue-500 px-2  py-2 text-white hover:bg-green-500 "
                        type="button"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;