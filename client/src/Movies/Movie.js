import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from 'react-router-dom';
import { Button } from "semantic-ui-react";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  handleDelete () {
    const id = this.props.match.params.id;
    axios
      .delete (`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => console.log(err.response))
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    const id = this.props.match.params.id;
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
     
      
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <Link to = {`/update-movie/${id}`}>
          <Button color='green'>Edit Movie</Button>
        </Link>
        <Button onClick  = {() => this.handleDelete()} color = 'red'>
          Delete Movie
        </Button>
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
      </div>
     
    );
  }
}

