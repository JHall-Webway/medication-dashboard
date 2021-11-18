import React from "react";

import { useSelector } from 'react-redux';

import SearchList from '../components/SearchList';
import PrescriptionList from '../components/PrescriptionList';

const Dashboard = () => {
  const search = useSelector(({ global }) => global.search);
  return (
    <div>
      {search ?
        <SearchList /> :
        <PrescriptionList />
      }
    </div>
  );
};

export default Dashboard;
