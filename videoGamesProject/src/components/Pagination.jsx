import React from 'react'

const Pagination = ({ videoGamesPerPage, totalVideoGames, currentPage, onPageChange, sup}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalVideoGames / videoGamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='divPagination'>
            <nav>
                <ul className="pagination">
                    {currentPage > 1 && (
                        <li className="page-item">
                        <button onClick={() => onPageChange(currentPage - 1)} className={sup ? 'page-link-sup':'page-link'}>
                            Anterior
                        </button>
                        </li>
                    )}

                    {pageNumbers.map((number) => (
                        <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                            <button onClick={() => onPageChange(number)} className={sup ? 'page-link-sup':'page-link'}>
                                {number}
                            </button>
                        </li>
                    ))}

                    {currentPage < pageNumbers.length && (
                        <li className="page-item">
                        <button onClick={() => onPageChange(currentPage + 1)} className={sup ? 'page-link-sup':'page-link'}>
                            Siguiente
                        </button>
                        </li>
                    )}

                </ul>
            </nav>
        </div>
    )
}

export default Pagination