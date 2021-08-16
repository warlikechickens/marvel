const Pagination = ({ page, size, total, onPageChange }) => {

    const getPage = (number) => {

        number > -1 && number < Math.ceil(total/size) && onPageChange({page: number});
    }

    return (
        <div className="pagination">
            <div>
                <button className='btn' onClick={(e) => getPage(0)}>❮❮</button>
                <button className='btn' onClick={(e) => getPage(page-1)}>❮</button>
            </div>
            <p>{(page*size)+1} - {(page*size)+size} of {total}</p>
            <div>
                <button className='btn' onClick={(e) => getPage(page+1)}>❯</button>
                <button className='btn' onClick={(e) => getPage(Math.ceil(total/size) - 1)}>❯❯</button>
            </div>
        </div>
    )
}

export default Pagination
