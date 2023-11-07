import React from 'react'

const Pagination = ({ videoGamesPerPage, totalVideoGames, currentPage, onPageChange }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalVideoGames / videoGamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='divPagination'>
            <nav>
                <ul className="pagination">
                    {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <button onClick={() => onPageChange(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination