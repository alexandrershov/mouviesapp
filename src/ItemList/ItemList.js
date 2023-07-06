import './itemList.css';
import Item from '../Item/Item';
import { Modal } from 'antd';
import { useState } from 'react';
import MoviesServise from '../MoviesService/MoviesService';

 const ItemList = ({elements, session}) => {
    const moviesService = new MoviesServise();
    const [postText, setPostText] = useState(null);
    let moviesList;
    if (elements === null) {
        moviesList = null;
    } else if (elements === 'sorry, you do not add rating to movies') {
      moviesList = elements;
    } else {
        moviesList = elements.map( (e, index) => {
          let ratedMovies = null;
            if (localStorage.getItem(`${e.id}`) != null) {
              ratedMovies = localStorage.getItem(`${e.id}`);
            }
            return <Item {...e} 
            id={e.id} 
            key={index}
            ratedMovies={ratedMovies}
            onAddMovieRating={(val) => onAddMovieRating(e.id, val)}/>
        })
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const onAddMovieRating = (...arg) => {
        const id = arg[0];
        const rating = arg[1];
        localStorage.setItem(`${id}`, rating);    
        moviesService
          .addRatingMovies(id, session.guestSessionId, rating)
          .then( e => {
            if (e.success) { setPostText('Ok. Movies rating add!')} else {
                setPostText('Sorry, failed to send movie rating. Please try again lil later. P.S Lil boi')
            }
          })
          .then( () => showModal() )
          .catch( (err) => console.error(err) )
      }

    return (
        <div className='list-item'>
            {moviesList}
            <Modal title={postText} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            </Modal>
        </div>
    )
}

export default ItemList;