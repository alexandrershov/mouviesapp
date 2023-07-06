import './Item.css';
import { Rate } from 'antd';

const Item = ({text, title, relase, img, grade, onAddMovieRating, ratedMovies}) => {
    return (
        <div className='item-movie'>
            <div className='item-movie__img'>
            <img src={img} alt='sorry, img do not loading' className='img-title'/>
            </div>
            <div className='item-movie__description'>
                <h3>{title}
                <div className='gradeItem'>{grade}</div>
                </h3>
                <p className='date'>{relase}</p>
                <div className='category'>Action</div>
                <p className='text'>
                    {text}
                </p>
                <div className='stars'>
                <Rate allowHalf
                className='stars__item'
                defaultValue={ratedMovies != null ? ratedMovies : 0}
                count={10}
                onChange={onAddMovieRating}/>
                </div>
            </div>
        </div>
    )
};

export default Item;