import './PaginationMovie.css';
import { Pagination } from 'antd';

const PaginationMovie = ({onTogglePage}) => {

    return (
        <div className='pagination'>
            <Pagination defaultCurrent={1} total={1000} 
            onChange={onTogglePage}
            showSizeChanger={false}/>
        </div>
    )
}

export default PaginationMovie;