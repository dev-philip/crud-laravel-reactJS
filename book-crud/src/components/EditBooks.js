import { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditBooks = () => {
    const navigate = useNavigate();
    const bookNameRef = useRef();
    const bookAuthorRef = useRef();
    const bookQuantityRef = useRef();
    const bookPriceRef = useRef();

    const { id } = useParams();
    const [aBook, setABook] = useState("");
    const [loading, setLoading] = useState(false);

    const getDataFromServer = (bookId) => {
         axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getonebook/${bookId}`)
              .then(function (response) {
                  // handle success
                  const [book_details] = response.data;
                  setABook(book_details);
              })
              .catch(function (error) {
                  // handle error
                  console.log(error);
              });
      }

      useEffect( () => {
        getDataFromServer(id);
      }, [id]);

      const updateHandler = (e) => {
          e.preventDefault();
          setLoading(true);

          const enteredBookName = bookNameRef.current.value;
          const enteredBookAuthor= bookAuthorRef.current.value;
          const enteredBookQuantity = bookQuantityRef.current.value;
          const enteredBookPrice = bookPriceRef.current.value;

          const formData = new FormData();
          formData.append('bookNameValue', enteredBookName );
          formData.append('bookAuthorValue', enteredBookAuthor );
          formData.append('bookQuantityValue', enteredBookQuantity );
          formData.append('bookPriceValue', enteredBookPrice );

          axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/updateabook/${id}`, formData)
          .then(function (response) {
              // handle success
              setLoading(false);
              Swal.fire({
                title: 'Awesome',
                html: response.data.message,
                icon: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Yes, done'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
              })
              
          })
          .catch(function (error) {
              // handle error
              setLoading(false);
              console.log(error);
              Swal.fire({
                html: 'An error occured',
                icon: 'error',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Okay'
              })
          });

      }

    return (
        <div className="container">
            <Link to='/' className="btn btn-primary mt-4">View Books</Link>

            <h2 className="text-center mt-1">Edit a Book</h2>

            <form className="mt-4" onSubmit={updateHandler}>
                <div className="row mb-3">
                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Book Name</label>
                    <div className="col-sm-10">
                    <input 
                        ref= {bookNameRef}
                        type="text" 
                        className="form-control" id="inputName" 
                        defaultValue={aBook.book_name } 
                        required 
                    />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputAuthor" className="col-sm-2 col-form-label">Book Author</label>
                    <div className="col-sm-10">
                    <input type="text"
                        ref={bookAuthorRef}
                        className="form-control" id="inputAuthor"
                        defaultValue={aBook.book_author }  
                        required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputQuantity" className="col-sm-2 col-form-label">Quantity</label>
                    <div className="col-sm-10">
                    <input 
                        ref={bookQuantityRef}
                        type="number" className="form-control" id="inputQuantity"
                        defaultValue={aBook.quantity} 
                        required 
                    />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputBookPrice" className="col-sm-2 col-form-label">Book Price</label>
                    <div className="col-sm-10">
                    <input type="number"
                        ref={bookPriceRef} className="form-control" id="inputBookPrice"
                        defaultValue={aBook.book_price} 
                        required
                    />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    {loading ? ( 
                    <i className="fa fa-spinner fa-spin"
                        aria-hidden="true"></i> ) : ('Submit')}
                </button>
            </form>
        </div>
    )
}

export default EditBooks;