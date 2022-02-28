import { useRef, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddBooks = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const bookNameRef = useRef();
    const bookAuthorRef = useRef();
    const bookQuantityRef = useRef();
    const bookPriceRef = useRef();

    const submitBookHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const bookNameValue = bookNameRef.current.value;
        const bookAuthorValue = bookAuthorRef.current.value;
        const bookQuantityValue = bookQuantityRef.current.value;
        const bookPriceValue = bookPriceRef.current.value;

        const formData = new FormData();
        formData.append('bookNameValue', bookNameValue);
        formData.append('bookAuthorValue', bookAuthorValue);
        formData.append('bookQuantityValue', bookQuantityValue);
        formData.append('bookPriceValue', bookPriceValue);
        
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/saveabook`, formData)
            .then(function (response) {
                setLoading(false)
                // handle success
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
                setLoading(false);
                // handle error
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
            <h2 className="text-center mt-1">Add a Book</h2>

            <form className="mt-4" onSubmit={submitBookHandler}>
                <div className="row mb-3">
                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Book Name</label>
                    <div className="col-sm-10">
                    <input ref={bookNameRef} type="text" className="form-control" id="inputName" required />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputAuthor" className="col-sm-2 col-form-label">Book Author</label>
                    <div className="col-sm-10">
                    <input ref={bookAuthorRef} type="text" className="form-control" id="inputAuthor" required />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputQuantity" className="col-sm-2 col-form-label">Quantity</label>
                    <div className="col-sm-10">
                    <input ref={bookQuantityRef} type="number" className="form-control" id="inputQuantity" required/>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputbookprice" className="col-sm-2 col-form-label">Book Price</label>
                    <div className="col-sm-10">
                    <input ref={bookPriceRef} type="number" className="form-control" id="inputbookprice" required/>
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

export default AddBooks;