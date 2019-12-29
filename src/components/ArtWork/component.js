import React from 'react';
import PropTypes from 'prop-types';
import './ArtWork.css';

const ArtWork = (albumArtwork) => {
  return albumArtwork.albumImage && (
    <div className='album-artwork-container'>
      <img
        className='album-artwork' src={ albumArtwork.albumImage }
        alt={ 'box art' } />
    </div>
  );
};

ArtWork.propTypes = {
  albumArtwork: PropTypes.string
};

export default ArtWork;
