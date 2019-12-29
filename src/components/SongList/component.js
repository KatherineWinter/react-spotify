import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './SongList.css';

class SongList extends Component {

  componentDidUpdate(prevProps, prevState) {
    if(this.props.token !== '' && !this.props.fetchSongsError && this.props.fetchSongsPending && this.props.viewType === 'songs') {
      this.props.fetchSongs(this.props.token);
    }
  }

  msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  renderSongs() {
    return this.props.songs.map((song, i) => {
      const buttonClass = song.track.id === this.props.songId && !this.props.songPaused ? "spoticon-pause-16" : "spoticon-play-16";

      return (
        <li className={song.track.id === this.props.songId ? 'active user-song-item' : 'user-song-item'} key={ i }>
          <div onClick={() => {(song.track.id === this.props.songId) && this.props.songPlaying && this.props.songPaused ? this.props.resumeSong() :
            this.props.songPlaying && !this.props.songPaused && (song.track.id === this.props.songId)  ? this.props.pauseSong() :
              this.props.audioControl(song); } } className='play-song'>
            <i className={`fa ${buttonClass} play-btn`} aria-hidden="true"/>
          </div>

          {this.props.viewType !== 'songs' && (
            <p className='add-song' onClick={() => {this.props.addSongToLibrary(this.props.token, song.track.id);}}>
              {this.props.songAddedId === song.track.id ?
                (<i className="spoticon-heart-active-16 add-song" aria-hidden="true" />) :
                (<i className="spoticon-heart-16 add-song" aria-hidden="true" />)
              }
            </p>
          )}

          {this.props.viewType === 'songs' && (
            <p className='add-song'>
              <i className="spoticon-heart-active-16" aria-hidden="true"/>
            </p>
          )}

          <div className='song-info-container'>
            <div className='song-title'>
              <p>{ song.track.name }</p>
            </div>

            <div className='song-artist'>
              <p>{ song.track.artists[0].name }</p>
            </div>

            <div className='song-album'>
              <p>{ song.track.album.name }</p>
            </div>

            <div className='song-added'>
              <p>{ moment(song.added_at).format('YYYY-MM-DD')}</p>
            </div>

            <div className='song-length'>
              <p>{ this.msToMinutesAndSeconds(song.track.duration_ms) }</p>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {

    return (
      <div>
        <div className='song-header-container'>
          <div className='song-title-header'>
            <p>Title</p>
          </div>
          <div className='song-artist-header'>
            <p>Artist</p>
          </div>
          <div className='song-album-header'>
            <p>Album</p>
          </div>
          <div className='song-added-header'>
            <i className="fa fa-calendar-plus-o" aria-hidden="true"/>
          </div>
          <div className='song-length-header'>
            <p><i className="fa fa-clock-o" aria-hidden="true" /></p>
          </div>
        </div>
        {
          this.props.songs && !this.props.fetchSongsPending && !this.props.fetchPlaylistSongsPending && this.renderSongs()
        }

      </div>
    );
  }
}

SongList.propTypes = {
  viewType: PropTypes.string,
  token: PropTypes.string,
  songAddedId: PropTypes.string,
  songId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  songs: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  fetchSongsError: PropTypes.bool,
  fetchSongsPending: PropTypes.bool,
  fetchPlaylistSongsPending: PropTypes.bool,
  fetchSongs: PropTypes.func,
  audioControl: PropTypes.func,
  songPaused: PropTypes.bool,
  songPlaying: PropTypes.bool,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func,
  addSongToLibrary: PropTypes.func
};

export default SongList;
