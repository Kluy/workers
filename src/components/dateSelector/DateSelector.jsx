import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const DateSelector = ({ selectDate, getShedule }) => {
  const date = selectDate.format('DD-MM-YYYY');
  const [searchParams] = useSearchParams({
    date: moment(new Date()).format('DD-MM-YYYY'),
  });
  const params = Object.fromEntries([...searchParams]);
  console.log(params);
  const navigate = useNavigate();
  const search = params.search ? `&search=${params.search}` : '';

  return (
    <div
      className={classNames('calendar__item', {
        calendar__item_selected: date === params.date,
      })}
      onClick={() => {
        navigate({
          search: `?date=${date}${search}`,
        });
        getShedule(date);
      }}
    >
      <div>{selectDate.format('DD/MM')}</div>
      <span className="calendar__item-text">ЗАВТРА</span>
    </div>
  );
};

DateSelector.propTypes = {
  getShedule: PropTypes.func.isRequired,
  selectDate: PropTypes.instanceOf(moment).isRequired,
};

export default DateSelector;