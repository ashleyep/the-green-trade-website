export function SizeSelectBox({ setSize }) {
    return (
        <div className="custom-select" style={{ width: '200px' }}>
            <label className="inputDetails">Select Size:</label>
            <select onChange={(e) => setSize(e.target.value)}>
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
                <option value="Mens 3.5/Womens 5">Mens 3.5 Womens 5</option>
                <option value="Mens 4/Womens 5.5">Mens 4 Womens 5.5</option>
                <option value="Mens 4.5/Womens 6">Mens 4.5 Womens 6</option>
                <option value="Mens 5/Womens 6.5">Mens 5 Womens 6.5</option>
                <option value="Mens 5.5/Womens 7">Mens 5.5/Womens 7</option>
                <option value="Mens 6/Womens 7.5">Mens 6/Womens 7.5</option>
                <option value="Mens 6.5/Womens 8">Mens 6.5/Womens 8</option>
                <option value="Mens 7/Womens 8.5">"Mens 7/Womens 8.5"</option>
                <option value="Mens 7.5/Womens 9">"Mens 7.5/Womens 9"</option>
                <option value="Mens 8/Womens 9.5">"Mens 8/Womens 9.5"</option>
                <option value="Mens 8.5/Womens 10">"Mens 8/Womens 9.5"</option>
                <option value="Mens 9/Womens 10.5">Mens 9/Womens 10.5</option>
                <option value="Mens 9.5/Womens 11">Mens 9.5/Womens 11</option>
                <option value="Mens 10/Womens 11.5">Mens 10/Womens 11.5</option>
                <option value="Mens 10.5/Womens 12">Mens 10.5/Womens 12</option>
                <option value="Mens 11/Womens 12.5">Mens 11/Womens 12.5</option>
                <option value="Mens 11.5/Womens 13">Mens 11.5/Womens 13</option>
                <option value="Mens 12/Womens 13.5">Mens 12/Womens 13.5</option>
                <option value="Mens 12.5/Womens 14">Mens 12.5/Womens 14</option>
                <option value="Mens 13/Womens 14.5">Mens 13/Womens 14.5</option>
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

export function TypeSelectBox({ setType, setSize }) {
    return (
        <div>
        <div className="custom-select" style={{ width: '200px' }}>
            <label className="inputDetails">Clothing type:</label>
            <select onChange={(e) => setType(e.target.value) }>
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
        {e.target.value === 'Shoes' && <ShoeSizeSelectBox shoe = {setSize}/>}
        {e.target.value === 'Pants' && <PantsSizeSelectBox pants = {setSize}/>}
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
