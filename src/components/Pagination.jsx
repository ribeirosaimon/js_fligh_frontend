import React, {useState} from "react";


const Pagination = () => {
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)

    function pagination() {
        const previous = page === 1 ? 1 : page - 1
        const next = page === 1 ? 3 : page + 1

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button className="page-link" onClick={() => setPage(previous)} tabIndex="-1">Previous</button>
                    </li>
                    <li className={page >= 1 ? "page-item" : "page-item disabled"}>
                        <button className="page-link"  onClick={() => setPage(previous)}>{previous}</button>
                    </li>
                    <li className={maxPage === 1 ? "page-item disabled" : "page-item"}>
                        <button className="page-link" onClick={() => setPage(page === 1 ? 2 : page)}>{page === 1 ? 2 : page}</button>
                    </li>
                    <li className={maxPage >= 3 ? "page-item" : "page-item disabled"}>
                        <button className="page-link">{next}</button>
                    </li>
                    <li className={maxPage >= 3 ? "page-item" : "page-item disabled"}>
                        <button className="page-link" onClick={() => setPage(next)}>Next</button>
                    </li>
                </ul>
            </nav>
        )
    }

    return(
        <>
            {pagination()}
        </>
    )
}

export default Pagination