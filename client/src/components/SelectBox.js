import React, { useState, useEffect } from "react";
import "../styles/CreatePost.css";

const sizes = ["XS", "S", "M", "L", "XL", "2XL"];

const types = [
    "Shirts",
    "Pants",
    "Shorts",
    "Shoes",
    "Sweaters",
    "Jackets",
    "Skirts",
    "Dresses",
    "Accessories"
];  

const styles = [
    "Goth",
    "Preppy",
    "Vintage",
    "Y2K",
    "Streetwear",
    "Formal",
    "Athletic Wear",
    "Basics",
    "Professional"
]

/* POTENTIALLY DELETING
export function SizeSelectBox({type, setSize}) {
    const getSizeOptions = () => {
        switch (type) {
            case 'Shoes':
                return <ShoeSizeSelectBox setSize={setSize} />;
            case 'Pants':
                return <BaseSizeSelectBox setSize={setSize} />;
            case 'Shirts':
                return <BaseSizeSelectBox setSize={setSize} />;
            // Add more cases as needed
            default:
                return <BaseSizeSelectBox setSize={setSize} />;
        }
    }
}
*/
export function BaseSizeSelectBox({ setSize }) {
    return (
        <div className="custom-select" style={{ width: '200px' }}>
            <label className="inputDetails">Select Size:</label>
            <select onChange={(e) => setSize(e.target.value)}>
                <option value="Null">Please Select Size</option>
                {sizes.map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>
        </div>
    );
}

export function ShoeSizeSelectBox({ setSize }) {
    return (
        <div className="custom-select" style={{ width: '200px' }}>
            <label className="inputDetails">Select Size:</label>
            <select onChange={(e) => setSize(e.target.value)}>
            <option value="Null">Please Select Size</option>
            {Array.from({ length: 20 }, (_, i) => {
                let mensSize = 3 + i * 0.5;  // Calculate men's size
                let womensSize = mensSize + 1.5; // Women's size is always +1.5
                return (
                <option key={i} value={`Mens ${mensSize}/Womens ${womensSize}`}>
                    Mens {mensSize} / Womens {womensSize}
                </option>
                );
            })}
            </select>
        </div>
    );
}

export function PantsSizeSelectBox({ setSize }) {
    return (
        <div className="custom-select" style={{ width: '200px' }}>
            <label className="inputDetails">Select Size:</label>
            <select onChange={(e) => setSize(e.target.value)}>
                <option value="Null">Please Select Size</option>
                {sizes.map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
                {Array.from({ length: 13 }, (_, i) => {
                    const size = i * 2;
                    return (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    );
                })}

            </select>
        </div>
    );
}



export function TypeSelectBox({ setType, setSize, type }) {
    //const TypeSelect = document.createElement("select")
    // const [sizeSelect, setSizeSelect] = useState()
    // const [selectedType, setSelectedType] = useState()


    const handleSelect = (e) => {
        setType(e.target.value)
    }

    return (
        <div className="custom-select" style={{ width: '200px' }}>
            <label className="inputDetails">Clothing type:</label>
            <select onChange={handleSelect}>
                <option value="Null">Please Select Type</option>
                {types.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>        
    );
}

export function StyleSelectBox({ setStyle }) {

    return (
        <div className="custom-select" style={{ width: '200px' }}>
            <label className="inputDetails">Aesthetic/Style:</label>
            <select onChange={(e) => setStyle(e.target.value)}>
                <option value="Null">Please Select Style</option>
                {styles.map((style) => (
                    <option key={style} value={style}>
                        {style}
                    </option>
                ))}
            </select>
        </div>
    );
}
