import React from 'react';
import Search from '../search/Search';
import Errors from '../errors/Errors';
import Menu from '../menu/Menu';
import Workers from '../workers/Workers';
import Popup from '../popup/Popup';
import Profile from '../profile/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getWorkers } from '../../gateway/gateway';

import { useEffect, useState } from 'react';

const Body = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    getWorkers().then(data => {
      console.log(data);
      setWorkers(data);
    });
  }, []);

  const [profileId, setProfileId] = useState(null);

  const [activePosition, setActivePosition] = useState('All');

  const [input, setInput] = useState('');

  const [popupOpen, setPopupOpen] = useState(false);

  const [sortId, setSortId] = useState('a-z');

  const handleInput = e => {
    setInput(e.target.value);
  };

  const handleFilterOptions = e => {
    const newActivePosition = e.target.innerHTML;
    if (activePosition !== newActivePosition) setActivePosition(newActivePosition);
  };

  const handlePopup = () => {
    setPopupOpen(!popupOpen);
  };

  const handleSortOptions = e => {
    if (e.target.id === 'close') {
      handlePopup();
    } else if (e.target.type === 'radio') {
      setSortId(e.target.id);
    } else return;
  };

  const handleProfileId = (e, id) => {
    setProfileId(e.target.dataset.key);
    console.log(e.target.dataset.key);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={[
            <Errors />,
            <Search
              onOpenPopup={handlePopup}
              onSetInput={handleInput}
              input={input}
              sortId={sortId}
            />,
            <Menu onFilter={handleFilterOptions} activePosition={activePosition} />,
            <Workers
              onSetProfileId={handleProfileId}
              activePosition={activePosition}
              input={input}
              sortId={sortId}
              workers={workers}
            />,
            <Popup
              onOpenPopup={handlePopup}
              onSortOptions={handleSortOptions}
              popupOpen={popupOpen}
              sortId={sortId}
            />,
          ]}
        ></Route>
        <Route path="/profile" element={<Profile worker={workers[profileId - 1]} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Body;
