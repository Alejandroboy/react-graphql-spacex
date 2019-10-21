import React from 'react';
import cn from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export default function LaunchItem({
  launch: { flight_number, mission_name, launch_date_local, launch_success, links: { mission_patch_small }, launch_failure_details, },
}) {
  return (
    <div className="launch-item">
      <div className="launch-item__info">
        <img src={mission_patch_small} alt={mission_name} className="launch-item__img"></img>
        <div className='launch-item__container'>
          <h4 className="launch-item__title">
            Mission:{' '}
            <span
              className={cn({
                'text-success': launch_success,
                'text-danger': !launch_success,
              })}
            >
              {mission_name}
            </span>
          </h4>
          <p className="launch-item__date">
            Date: <Moment format="DD.MM.YYYY HH:mm">{launch_date_local}</Moment>
          </p>
          {!launch_success && <button>Failure reason</button>}
        </div>
      </div>
      <div className="launch-item__details">
        <Link to={`/launch/${flight_number}`} className="button">
          Launch Details
          </Link>
      </div>
    </div>
  );
}
