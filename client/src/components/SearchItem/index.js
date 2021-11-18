import React from "react";

import { useMutation } from '@apollo/client';
import { ADD_PRESCRIPTION } from '../../utils/mutations';

import { useDispatch } from 'react-redux';
import { clearSearch } from '../../utils/globalState';

const SearchItem = ({ item }) => {
  const dispatch = useDispatch();
  const [newScrip] = useMutation(ADD_PRESCRIPTION);
  const clickHandler = async (e) => {
    e.preventDefault();
    await newScrip({
      variables: { ...item, perDay: 1 }
    });
    dispatch(clearSearch());
  }
  return (
    <div className="card m-5 bg-info border-dark border-2">
      <div className="card-body">
        <h5 className="card-title">{item.synonym}</h5>
        <h6 className="card-subtitle mb-2 text-light">{item.name}</h6>
      </div>
      <button className="btn btn-primary" onClick={clickHandler}>Add to Prescriptions</button>
    </div>
  );
};

export default SearchItem;