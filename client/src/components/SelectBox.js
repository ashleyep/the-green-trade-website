import React, { useState, useEffect } from "react";

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
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="2XL">2XL</option>
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
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="2XL">2XL</option>
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
    const [sizeSelect, setSizeSelect] = useState()
    const [selectedType, setSelectedType] = useState()


    const handleSelect = (e) => {
        setType(e.target.value)
    }

    return (
        <div className="custom-select" style={{ width: '200px' }}>
            <label className="inputDetails">Clothing type:</label>
            <select onChange={handleSelect}>
                <option value="Null">Please Select Type</option>
                <option value="Shirts">Shirts</option>
                <option value="Pants">Pants</option>
                <option value="Shorts">Shorts</option>
                <option value="Shoes">Shoes</option>
                <option value="Sweaters">Sweaters</option>
                <option value="Jackets">Jackets</option>
                <option value="Skirts">Skirts</option>
                <option value="Dresses">Dresses</option>
                <option value="Accessories">Accessories</option>
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
                <option value="Goth">Goth</option>
                <option value="Preppy">Preppy</option>
                <option value="Vintage">Vintage</option>
                <option value="Y2K">Y2K</option>
                <option value="Streetwear">Streetwear</option>
                <option value="Formal">Formal</option>
                <option value="Athletic Wear">Athletic Wear</option>
                <option value="Basics">Basics</option>
                <option value="Professional">Professional</option>
            </select>
        </div>
    );
}
