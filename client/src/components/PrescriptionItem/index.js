import React from 'react';

import { useMutation } from '@apollo/client';
import { UPDATE_PRESCRIPTION, DELETE_PRESCRIPTION } from '../../utils/mutations';

import { useDispatch } from 'react-redux';

const PrescriptionItem = ({ item }) => {
    const [deleteScrip] = useMutation(DELETE_PRESCRIPTION);
    const deleteHandler = (e) => {
        deleteScrip({
            variables: { _id: item._id }
        });
    };
    return (
    <div>
        <div className="card m-5 bg-info border-dark border-5 rounded-pill p-4">
            <div className="card-body">
                <h2 className="card-title">{item.synonym}</h2>
                <h6 className="card-subtitle mb-2 text-light">{item.name}</h6>
                <div className="btn-group me-3" role="group">
                    <button type="button" className="btn btn-primary">-</button>
                    <button type="button" className="btn btn-primary" disabled>amount per day: {item.perDay}</button>
                    <button type="button" className="btn btn-primary">+</button>
                </div>
                <button type="button" className="btn btn-danger border-dark border-3" onClick={deleteHandler}>Delete</button>
            </div>
        </div>
    </div>
)};

export default PrescriptionItem;

