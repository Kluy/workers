import React from 'react';
import moment from 'moment/moment';

import './worker.scss';

const Worker = ({ sortId, id, name, position, birthDate, avatar, tag }) => {
  return (
    <li className="worker" data-id={id} key={id}>
      <div className="worker_data">
        <img className="worker_avatar" src={avatar || '../../images/duck.svg'} alt="avatar" />
        <div>
          <div className={name ? 'worker_name' : 'worker_downloading'}>
            {name}
            <span className="worker_tag"> {tag}</span>
          </div>
          <div
            className={
              position ? 'worker_position' : 'worker_downloading worker_downloading--small'
            }
          >
            {position}
          </div>
        </div>
      </div>
      {sortId === 'birthday' && (
        <div className="worker_birthdate">{moment(birthDate).format('DD MMM')}</div>
      )}
    </li>
  );
};
export default Worker;
