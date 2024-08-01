import React from 'react';
import { useState, useEffect } from 'react';
import { getWorkers } from '../../gateway/gateway';
import './workers.scss';
import Card from '../card/Card';
import Preloader from '../preloader/Preloader';

const Workers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    getWorkers().then(data => setWorkers(data));
  }, []);

  return (
    <div className="workers">
      <ul className="workers_list">
        {workers.length > 0 ? (
          workers.map(({ id, name, position, birthDate, phone, avatar, tag, email }) => {
            return (
              <li className="worker workers_list-item" key={id}>
                <img
                  className="worker_avatar"
                  src={avatar || '../../images/icon.png'}
                  alt="avatar"
                />
                <div className="worker_text">
                  <div>
                    <span className="worker_name">{name}</span>
                    <span className="worker_tag"> {tag}</span>
                  </div>
                  <div className="worker_position">{position}</div>
                </div>
              </li>
            );
          })
        ) : (
          <Preloader />
        )}
      </ul>
    </div>
  );
};

export default Workers;
