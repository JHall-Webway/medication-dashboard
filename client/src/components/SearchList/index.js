import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_SEARCH } from '../../utils/queries';

import { useSelector } from 'react-redux';

import SearchItem from '../SearchItem';
import Loading from '../../assets/Loading.gif';

const SearchList = () => {
    const search = useSelector(({ global }) => global.search);
    const { loading, data } = useQuery(QUERY_SEARCH, {
        variables: { name: search }
    });
    return (
    <div>
        {data ? 
            <div>
                {data.scriptSearch.map((drug, i) => (
                    <SearchItem key={i} item={drug} />
                ))}
            </div> : null
        }
        {loading ? <img className="m-auto" src={Loading} alt="loading" /> : null}
    </div>
)};

export default SearchList;