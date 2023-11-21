import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import Review from './Review';
import Star from './Star';
import { toast } from 'react-toastify';
import validationReviews from './validationReviews';
import 'react-toastify/dist/ReactToastify.css';
import url from '../../rutaConnection'

const Reviews = () => {
    const [loading,setLoading] = useState(false);
    const [reviews,setReviews] = useState([]);
    const [ratingSelected,setRatingSelected] = useState(0);
    const [errors,setErrors] = useState({});
    const [reviewData,setReviewData] = useState({
        name : '',
        content : ''
    });
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const {data} = await axios.get(`${url}/reviews`);
            if (data.length != 0 ) {
                const limitedReviews = data.slice(0,100);
                setReviews(limitedReviews);
            }
            

        } catch (error) {
            setLoading(false);
        } finally{
            setLoading(false);
        }     
    }

    useEffect(()=>{
        fetchReviews();
    },[]);

    useEffect(()=>{
        if(reviewData.name != '' || reviewData.content != ''){
            setErrors(validationReviews(reviewData));
        }
    },[reviewData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/reviews`, {...reviewData, rating:ratingSelected});
            if(response?.status == 200){
                event.target.reset();
                setRatingSelected(0);
                setReviewData({
                    name : '',
                    content : ''
                });
                setLoading(false);
                fetchReviews();
                toast.success('The review was uploaded successfully', {
                    className:'toastSuccess',
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            }else if(response?.status == 404){
                toast.error('You must complete all fields', {
                    className:'toastError',
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            }else if(response?.status == 403){
                toast.error('A review has already been submitted to this name', {
                    className:'toastError',
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            }

        } catch (error) {
            
        }
    }

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        const newValue = type == 'number' ? parseFloat(value) : value; 
        setReviewData({
            ...reviewData,
            [name] : newValue
        });
    }

  return (
    <div className='divReviews'>
        {
            loading
            ?<Loading/>
            :(
                <div className='divFormReviewsContent'>
                    <div className='divFormReviews'>
                        <div className='formInstructionMain'>
                            <h3>REVIEWS</h3>
                            <p>Here add your review, you can comment and rate the app</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='firstContainerReview'>
                                <div className='containerInput containerInputAndStars'>
                                    <input id='name' name='name'  type='text' className={errors.name && reviewData.name!='' ? 'inputReviewError':'inputReview'} onChange={handleChange} required/>
                                    <label htmlFor='name' className={errors.name && reviewData.name!='' ? 'labelReviewError' : 'labelReview'} >Enter your nick name</label>
                                    <p className="errorMessage">
                                        {
                                            errors.name && reviewData.name != '' 
                                            ?errors.name
                                            :<span className="messageHide">A</span>
                                        }
                                    </p>
                                </div>
                                <div className='divContainerStarsContent'>
                                    <label className='labelRatingTag'>Rating: </label>
                                    <div className='divStarsContainer'>
                                        <Star value={1} setRatingSelected={setRatingSelected} ratingSelected={ratingSelected}/>
                                        <Star value={2} setRatingSelected={setRatingSelected} ratingSelected={ratingSelected}/>
                                        <Star value={3} setRatingSelected={setRatingSelected} ratingSelected={ratingSelected}/>
                                        <Star value={4} setRatingSelected={setRatingSelected} ratingSelected={ratingSelected}/>
                                        <Star value={5} setRatingSelected={setRatingSelected} ratingSelected={ratingSelected}/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='containerInput containerComments'>
                                <textarea id='content' name='content' className={errors.content && reviewData.content!='' ? 'inputReviewError':'inputReview'} onChange={handleChange}  type='text' rows="6" required/>
                                <label htmlFor='content' className={errors.content && reviewData.content!='' ? 'labelReviewError' : 'labelReview'} >About your experience</label>
                                <p className="errorMessage">
                                    {
                                        errors.content && reviewData.content != '' 
                                        ?errors.content
                                        :<span className="messageHide">A</span>
                                    }
                                </p>
                            </div>
                            <button id='buttonReviewForm' className='buttonReview' 
                                type='submit' 
                                disabled={reviewData.name == '' || reviewData.content == '' || ratingSelected <1 || errors.name || errors.content}>
                                    Upload review
                            </button>
                        </form>    
                    </div>
                    <div className='reviewsContainerContent'>
                        {
                            reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <Review key={review.id} name={review.name} content={review.content} rating={review.rating} />
                                ))
                            ) : (
                                <p>There are not reviews added yet</p>
                            )
                        }              
                    </div>
                    
                </div>
            )
        }
    </div>
  )
}

export default Reviews