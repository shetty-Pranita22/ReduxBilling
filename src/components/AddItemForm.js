import React from 'react';


const AddItemForm = (props) => {

    const { handleSubmit, itemName, itemCodes, qty, handleExit } = props;

    return (
        <div className="addForm">
            <form onSubmit={handleSubmit}>
                <label>
                    Pick your item:
                    <select name="itemName" ref={itemName}>
                        <option value="SELECT">--SELECT--</option>
                        {itemCodes.map((itemCode) => (
                            <option key={itemCode.itemName} value={itemCode.itemName}>{itemCode.itemName}</option>
                        ))
                        }
                    </select>
                </label>
                <label>
                    Enter quantity:
                    <input
                        name="qty"
                        type="number"
                        ref={qty}
                    />
                </label>
                <input type="submit" value="SUBMIT" />
                <button id="exitButton" onClick={handleExit}>EXIT</button>
            </form>
        </div>
    );
}


export default AddItemForm;