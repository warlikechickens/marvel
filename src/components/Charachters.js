import Charachter from './Charachter';

const Charachters = ({ charachters, onBookmark }) => {
    return (
        <div className="charachters-container">
            <div className="charachter-container">
            {
                charachters.map(charachter => (
                    <Charachter key={charachter.id}
                        charachter={charachter}
                        onBookmark={onBookmark} />
                ))
            }
            </div>
        </div>
    )
}

export default Charachters