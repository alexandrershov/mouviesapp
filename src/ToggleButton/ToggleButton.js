import './ToggleButton.css';
import { Button } from 'antd';

const ToggleButton = ({loadMovies, onGetStarList}) => {

    return (
        <div className='toggleButton'>
            <Button 
            onClick={loadMovies}
            size='large'
            >Search</Button>
            <Button
            onClick={onGetStarList} 
            size='large'
            >Rated</Button>
        </div>
    )
}

export default ToggleButton;