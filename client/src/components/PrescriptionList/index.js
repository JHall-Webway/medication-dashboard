import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../utils/globalState';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import PrescriptionItem from '../PrescriptionItem';

const PrescriptionList = () => {

    const user = useSelector(({ global }) => global.user);
    const { loading, data } = useQuery(QUERY_ME);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(updateUser(data?.me))
        }
    }, [user, loading, data, dispatch]);

    return (
    <div>
        <h1 className="text-dark m-5">My Medications:</h1>
        {data ? data.me.prescriptions.map((prescription, i) => (<PrescriptionItem key={i} item={prescription} />)) : null}
    </div>
)};

export default PrescriptionList;