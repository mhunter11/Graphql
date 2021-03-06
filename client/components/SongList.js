import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'

import query from '../queries/fetchSong'

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({ variables: { id }})
      .then(() => {this.props.data.refetch()})
  }
  render() {
    const {loading, songs} = this.props.data;
    if (loading) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <ul className="collection">
          {songs.map(song => (
            <li className="collection-item" key={song.id}>
              <Link to={`/songs/${song.id}`}>
                {song.title}
              </Link>
              <i 
                className="material-icons"
                onClick={() => this.onSongDelete(song.id)}
              >delete</i>
            </li>
          ))}
        </ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    ) 
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;



export default graphql(mutation) (
  graphql(query)(SongList)
);