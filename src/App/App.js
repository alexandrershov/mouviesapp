import './App.css';
import ItemList from '../ItemList/ItemList';
import SearchForm from '../SearchForm/SearchForm';
import PaginationMovie from '../Pagination/PaginationMovie';
import Loading from '../Loading/Loading';
import ToggleButton from '../ToggleButton/ToggleButton';

import { useEffect, useMemo, useRef, useState } from 'react';
import MoviesServise from '../MoviesService/MoviesService';


function App() {
  const moviesService = useMemo( () => new MoviesServise(), []);
  const [elements, setElements] = useState( null );
  const [loading, setLoading] = useState(true);
  const [serch, setSerch] = useState(null);
  const [toggleSerch, setToggleSerch] = useState(false);
  let session = useRef({
    guestSessionId: null,
    success: null
  })
  
  const useLoadMovies = () => {
    useEffect(() => {
      loadingMovie();
      return () => {return elements}
  }, []);
  }

  useEffect(() => {
    moviesService
    .guestSession()
    .then( e => {
      session.guestSessionId = e.guest_session_id;
      session.success = e.success;
    })  
    return () => {return}
  }, [ moviesService, session ]);

  useLoadMovies();

  const loadingMovie = (page) => {
    setLoading(true);
    setToggleSerch(false)
    moviesService
      .getAllMovies(page)
      .then( res => changeMovieItem(res))
      .then( () => setLoading(false))
      .catch( err => console.error(err))
  }

  const serchMovie = (page, se) => {
    setLoading(true);
    setToggleSerch(true);
    moviesService
      .getSerchMovie(page, se)
      .then( res => changeMovieItem(res))
      .then( () => setLoading(false))
      .catch( err => console.error(err))
  }

  const changeMovieItem = (list) => {
    return setElements(list);
  }

  const onTogglePage = (page) => {
    if (toggleSerch) {serchMovie(page, serch)} else loadingMovie(page);
  }

  const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => { fn.apply(this, arguments) }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
    }
  }

  const changeSerch = (text) => {
    setSerch(text);
    if (text.trim() === '') return loadingMovie()
    serchMovie(1, text)
  }

  const onGetStarList = () => {
    moviesService
      .getRatingMovies(session.guestSessionId)
  }

  const onChangeSerch = debounce(changeSerch, 1000);
  return (
    <div className="App">
      <ToggleButton loadingMovie={loadingMovie}
      onGetStarList={onGetStarList}
      />
      <SearchForm onChangeSerch={onChangeSerch}/>
      {loading ? <Loading/> : <ItemList elements={elements}
      session={session}/>}
      <PaginationMovie onTogglePage={onTogglePage}/>
    </div>
  );
}

export default App;
