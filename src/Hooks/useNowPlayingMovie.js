import { nowPlayingAPI, options } from '../Utils/Constants'
import {useDispatch } from 'react-redux'
import { addNowPlayingMovies } from '../Slices/movieSlice'
import { useEffect } from 'react'

const useNowPlayingMovie = ()=>{

    const dispatch = useDispatch();

    const getNowPlayingMovies = async ()=>{
        const data = await fetch(nowPlayingAPI,options);
        const json = await data.json();
        console.log(json.results);
        dispatch(addNowPlayingMovies(json.results));
  }

  useEffect(()=>{
     getNowPlayingMovies();
  },[])

}

export default useNowPlayingMovie;