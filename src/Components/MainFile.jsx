import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

const MainFile = () => {

    const [show, setshow] = useState([])
    const [find, setfind] = useState('')
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2;

    const last = (currentPage + 1) * itemsPerPage;
    const first = last - itemsPerPage;

    const currentItems = show.filter((val) => val.author?.toLowerCase().includes(find.toLowerCase())).slice(first, last);
    
    useEffect(() => {
        axios.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7425ed0a49d24aa499fd775f10b2cb7e').then((res) => {
            setshow(res.data.articles)
        })
    }, [])

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <div className='container main'>
           <div className="table-responsive">
           <table className='table table-bordered'>
                <thead>
                    <tr>
                        <td colSpan="5">
                            <input className='w-100 form-control' type="text"  value={find}
                                onChange={(e) => setfind(e.target.value)}
                                placeholder="Search by author" />
                        </td>
                        <td></td>
                        <td></td>
                        <td><div className="dropdown">
                            <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Author
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    currentItems.map((val, index) => {
                                        return (
                                            <li key={index}><a className="dropdown-item" href="#">{val.author}</a></li>
                                        )
                                    })
                                }
                            </ul>
                        </div></td>
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>Source</td>
                        <td>Author</td>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Published</td>
                        <td>Image</td>
                        <td>Content</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems.map((val, index) => {
                            const publishedDate = new Date(val.publishedAt).toLocaleDateString();
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{val.source.name}</td>
                                    <td>{val.author}</td>
                                    <td>{val.title}</td>
                                    <td>{val.description}</td>
                                    <td>{publishedDate}</td>
                                    <td>
                                        <img style={{ width: "200px", height: "200px" }} src={val.urlToImage} alt="" />
                                    </td>
                                    <td>{val.content}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={10}
                marginPagesDisplayed={10}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
           </div>
        </div>
    )
}

export default MainFile