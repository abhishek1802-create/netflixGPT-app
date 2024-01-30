import React from 'react'
import Header from '../Header/Header'
import useNowPlayingMovie from '../../Hooks/useNowPlayingMovie'

const Browse = () => {

  useNowPlayingMovie();

  return (
    <div>
      <Header/>
    </div>
  )
}

export default Browse
