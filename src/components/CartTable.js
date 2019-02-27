import React from 'react';

const CartTable = (props) => {

    const { rows, grandTotal, handleDeleteRow, handleEditRow } = props;
    return (
        <div className="table-responsive" suppressContentEditableWarning={true}>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Item ID</th>
                        <th scope="col">Item Code</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                    {rows.map((element, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1} </th>
                            <td>{element.items.itemName} </td>
                            <td><input name="qty" type="number" onChange={handleEditRow} value={element.items.qty} /></td>
                            <td>${element.items.price} </td>
                            <td style={{ width: 1 + '%' }}><button className="btn btn-dark" onClick={() => handleDeleteRow(index)} >X</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>

            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Cart Total</span>
                </div>
                <span className="form-control" aria-label="Amount (to the nearest dollar)" >{grandTotal}</span>

                <div className="input-group-append">
                    <span className="input-group-text">$</span>
                </div>
            </div>

        </div>
    );

}

export default CartTable;