import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Profile from './components/profile/Profile';
import Workers from './components/workers/Workers';
import { getWorkers } from './gateway/gateway';
import None from './components/none/None';
import Popup from './components/popup/Popup';
import Menu from './components/menu/Menu';
import Search from './components/search/Search';
import { useState } from 'react';
import { useEffect } from 'react';
import './index.scss';

const App = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    getWorkers().then(data => {
      console.log(data);
      setWorkers(data);
    });
  }, []);

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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          exact
          path="/"
          element={[
            <Search
              onOpenPopup={handlePopup}
              onSetInput={handleInput}
              input={input}
              sortId={sortId}
            />,
            <Menu onFilter={handleFilterOptions} activePosition={activePosition} />,
            <Popup
              onOpenPopup={handlePopup}
              onSortOptions={handleSortOptions}
              popupOpen={popupOpen}
              sortId={sortId}
            />,
          ]}
          errorElement={
            <None
              img="../images/ufo.png"
              textMain="Unexpected error occurred..."
              text="Try again a bit later"
              reloadText="Reload page"
            />
          }
        >
          <Route
            index
            errorElement={
              <None
                img="../images/ufo.png"
                textMain="Unexpected error occurred..."
                text="Try again a bit later"
                reloadText="Reload page"
              />
            }
            element={
              <Workers
                activePosition={activePosition}
                input={input}
                sortId={sortId}
                workers={workers}
              />
            }
          ></Route>
        </Route>
        <Route
          path="profile/:id"
          element={<Profile workers={workers} />}
          errorElement={
            <None
              img="../images/ufo.png"
              textMain="Unexpected error occurred..."
              text="Try again a bit later"
              reloadText="Reload page"
            />
          }
          loader={() =>
            getWorkers().then(data => {
              // setWorkers(data);
              return data;
            })
          }
        />
      </>,
    ),
  );

  return (
    <div className="app">
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
};

export default App;

// import React from 'react';
// import Body from './components/body/Body';

// const App = () => {
//   return (
//     <div className="app">
//       <Body />
//     </div>
//   );
// };

// export default App;
