import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

const ViewBooks = () => {

    const [books, setBooks] = useState();
    const getDataFromServer = () => {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getbooks`)
            .then(function (response) {
                // handle success
                setBooks(response.data);
                // console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    useEffect( () => {
      getDataFromServer();
    }, [])

    const deleteDataFromServer = (bookId) => {
      axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/deleteabook/`+ bookId)
            .then(function (response) {
                // handle success
                // setBooks(response.data);
                console.log(response);
                getDataFromServer();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }


    const deleteDataHandler = (id) => {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              deleteDataFromServer(id);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
      }
      
    return (
        <div className='container mt-4'>
        <Link to='/addbooks' className="btn btn-primary">Add Books</Link>
  
          <table className="table mt-4">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Book Name</th>
                    <th scope="col">Book Author</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Book Price</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books ? (books.map((booksdata, index) => {
                    return (
                    <tr key={booksdata.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{booksdata.book_name}</td>
                    <td>{booksdata.book_author}</td>
                    <td>{booksdata.quantity}</td>
                    <td>${booksdata.book_price}</td>
                    <td>
                      <Link to={`/editbooks/${booksdata.id}`} className="btn btn-primary btn-sm">Edit</Link>
                      <button onClick={() => deleteDataHandler(booksdata.id)} type="button" className="btn btn-danger btn-sm ms-2">Delete</button>
                    </td>
                  </tr>
                    )

                  })) : (
                   <tr>
                      <th scope="row"><i className="fa fa-spinner fa-spin"
                        aria-hidden="true"></i> </th>
                        <th> Loading Data..... </th>
                   </tr>
                     
                    
                  )}
                </tbody>
        </table>
      </div>
    );

}

export default ViewBooks;