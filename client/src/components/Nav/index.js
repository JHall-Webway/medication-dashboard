import React from "react";
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import { useSelector, useDispatch } from 'react-redux';
import { searchMeds, clearSearch } from '../../utils/globalState';

function Nav() {
  const searchState = useSelector(({ global }) => global.search);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(searchMeds(e.target.value));
  };

  const dashClearSearch = () => {
    dispatch(clearSearch());
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-3 border-info">
      <div className="container-fluid">
        <Link className="navbar-brand btn btn-outline-info border-2 rounded-pill text-dark" id="home-button" to="/" onClick={dashClearSearch}>Medication Dashboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {Auth.loggedIn() ? (
              <li className="nav-item me-2 mb-2">
                <button type="button" className="btn btn-primary btn-sm border-dark border-2 rounded-pill text-light" onClick={() => Auth.logout()}>Logout</button>
              </li>
            ) : (
              <>
              <li className="nav-item me-2 m-2">
              <Link type="button" className="btn btn-primary btn-sm border-dark border-2 rounded-pill text-light" to="login" onClick={dashClearSearch}>Login</Link>
              </li>
              <li className="nav-item me-2 m-2">
              <Link type="button" className="btn btn-primary btn-sm border-dark border-2 rounded-pill text-light" to="register" onClick={dashClearSearch}>Register</Link>
              </li>
              </>
            )}
          </ul>
          <form action="/drugs" className="d-flex">
            <Link id="searchBar" to="/"><input className="form-control me-2 rounded-pill border-primary border-2" type="search" placeholder="Search Medications" aria-label="Search" name="drug" onChange={handleChange} value={searchState} /></Link>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
