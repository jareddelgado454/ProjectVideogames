const validationReviews = (reviewData) => {
    const errors = {};
    if(reviewData.name != '' && reviewData.name.length > 20){
        errors.name = 'The nickname cannot be more than 20 characters';
    }
    if(reviewData.name != '' && reviewData.content.length > 200){
        errors.content = 'The comment cannot be more than 200 characters';
    }
    return errors;
}
export default validationReviews