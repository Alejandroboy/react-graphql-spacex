import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import cn from 'classnames';
// import { Player } from 'video-react';
import Video from '../Video'

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      details
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
      launch_failure_details {
        time
        reason
      }
      links {
        mission_patch
        mission_patch_small
        presskit
        article_link
        wikipedia
        video_link
        youtube_id
      }
    }
  }
`;

export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <React.Fragment>
        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>...Loading...</h4>;
            if (error) return console.log(error);
            const {
              mission_name,
              launch_year,
              launch_date_local,
              details,
              launch_success,
              rocket: { rocket_id, rocket_name, rocket_type }, links: {
                mission_patch,
                mission_patch_small,
                presskit,
                article_link,
                wikipedia,
                video_link,
                youtube_id,
              },
            } = data.launch;

            console.log(data.launch.links.youtube_id)

            return (
              <div>
                <h1 className="display-4 my-3">
                  <span className="text-dark">Mission:</span> {mission_name}
                </h1>
                <h4>Launch Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">Flight Number: {flight_number}</li>
                  <li className="list-group-item">Launch Year: {launch_year}</li>
                  <li className="list-group-item">Launch Date: {launch_date_local}</li>
                  <li className="list-group-item">Description: {details}</li>
                  <li className="list-group-item">
                    Launch Successful:{' '}
                    <span
                      className={cn({
                        'text-success': launch_success,
                        'text-danger': !launch_success,
                      })}
                    >
                      {launch_success ? 'Yes' : 'No'}
                    </span>
                  </li>
                </ul>
                <h4>Rocket Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">Rocket id: {rocket_id}</li>
                  <li className="list-group-item">Rocket Name: {rocket_name}</li>
                  <li className="list-group-item">Rocket Type: {rocket_type}</li>
                </ul>
                <hr />
                <Link to="/" className="button" style={{ marginTop: 20 + 'px' }}>Back</Link>
                {/* <Player><source src={video_link}></source></Player> */}
                <Video youtubeId={youtube_id}></Video>
              </div>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default Launch;
