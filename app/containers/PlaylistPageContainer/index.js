import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { Link, Redirect } from 'react-router-dom';

import Loader from '../../components/Loader';
import arts from '../../arts.css';
import styles from './styles.css';

class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      name: '',
    };
  }

  componentDidMount() {
    const user = localStorage.getItem('user');
    if ((user === undefined) || (user == null) || (user === 'undefined')) {
      return;
    }

    const id = this.props.match.params.id;
    if (id == null) {
      this.setState({ ready: true });
      return;
    }

    axios.put('/api/spotify/generate', {
      id,
      user,
    })
      .then((response) => {
        console.log(response.data);
        if (!response.data.success) {
          this.setState({ ready: true });
          return;
        }

        this.setState({
          name: response.data.result.name,
          ready: true,
        });
      })
      .catch((error) => {
        /* eslint no-console: ["warn", { allow: ["error"] }] */
        console.error(error);
      });
  }

  render() {
    // const user = localStorage.getItem('user');
    // if ((user === undefined) || (user == null) || (user === 'undefined') || (this.state.ready && !this.state.name)) {
    //   return <Redirect to="/" />;
    // }

    return (
      <div className={arts.body} style={{ justifyContent: 'center', alignItems: !this.state.ready ? 'center' : null }}>
        {this.state.ready ? (
          <div>
            Cool
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

PlaylistPage.propTypes = {
  match: PropTypes.object,
};

export default PlaylistPage;