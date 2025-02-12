import React, { useState, useEffect } from "react";

export function SizeSelectBox({type, setSize}) {
    const getSizeOptions = () => {
        switch (type){
            case 'Shoes':
                return ["Mens 3.5/Womens 5"]
            default:
                return []
        }
    }
    return (
        <div className="custom-select" style={{ width: '200px' }}>
            <label className="inputDetails">Select Size:</label>
            <select onChange={(e) => setSize(e.target.value)}>
                {getSizeOptions().map((size) => (
                    <option key={size} value={size}>
                    {size}
                    </option>
                )
                )}
            </select>
        </div>
    );
}

export function ShoeSizeSelectBox({ setSize }) {
    return (
        <div className="custom-select" style={{ width: '200px' }}>
            <label className="inputDetails">Select Size:</label>
            <select onChange={(e) => setSize(e.target.value)}>
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
                <option value="7">XS</option>
                <option value="8">S</option>
                <option value="9">M</option>
                <option value="10">L</option>
                <option value="11">XL</option>
                <option value="12">2XL</option>
            </select>
        </div>
    );
}



export function TypeSelectBox({ setType, setSize, type }) {
    const TypeSelect = document.createElement("select")
    const [sizeSelect, setSizeSelect] = useState()
    const [selectedType, setSelectedType] = useState()


    const handleSelect = (e) => {
        // setSelectedType(e.target.value)
        setType(e.target.value)
        // setSizeSelect(selectedType)
    }

    return (
        <div>
        <div className="custom-select" style={{ width: '200px' }}>
            <label className="inputDetails">Clothing type:</label>
            <select onChange={handleSelect}>
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
        {sizeSelect && <SizeSelectBox type={type} setSize={setSize} />}
        </div>
    );
}

export function StyleSelectBox({ setStyle }) {

    return (
        <div className="custom-select" style={{ width: '200px' }}>
            <label className="inputDetails">Aesthetic/Style:</label>
            <select onChange={(e) => setStyle(e.target.value)}>
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
