import { useState } from 'react';

const Search = ({ onSearchTermChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (value) => {
        setSearchTerm(value);
        onSearchTermChange({searchTerm: value})
    }

    return (
        <form className='search-form'>
            <div className='form-control'>
                <label className="label">Search Marvel Charachters</label>
                <input
                    type='text'
                    placeholder='Type something ...'
                    value={searchTerm} onChange={(e) => handleInputChange(e.target.value)}
                />
            </div>
        </form>
    )
}

export default Search;