import { FaBookmark } from 'react-icons/fa';

const Charachter = ({ charachter, onBookmark }) => {

    return (
        <div className="charachter-tile">
            <div className={`charachter-info ${charachter.bookmark ? 'charachter-bookmark' : ''}`}>
                <div>
                    <img src={charachter.thumbnail} alt={charachter.name}/>
                </div>
                <div className="charachter-text">
                    <h3>{charachter.name}</h3>
                </div>
                <div className='bookmark-icon'>
                    {!charachter.bookmark && <FaBookmark

                        onClick={() => { onBookmark(charachter) }}
                    />}
                </div>
            </div>
        </div>
    )
}

export default Charachter
