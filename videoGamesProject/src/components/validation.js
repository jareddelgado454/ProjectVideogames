const validation = (videoData) => {
    const errors = {};
    const patternName = /^[A-Za-z0-9\s]+$/
    const patternURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    const today = new Date();
    const selectedDate = new Date(videoData.released);
    if(!patternName.test(videoData.name)){
        errors.name = 'The name cannot contain symbols';
    }
    if(!patternURL.test(videoData.background_image)){
        errors.background_image = 'The URL is invalid';
    }
    if(videoData.description.length > 500){
        errors.description = 'Description cannot be more than 400 characters';
    }
    if(videoData.platforms.length > 20){
        errors.platforms = 'Platform cannot be more than 20 characters';
    }
    if(selectedDate > today) {
        errors.released = 'Release date cannot be in the future';
    }
    if(videoData.rating < 0){
        errors.rating = 'Rating cannot be less than 0';
    }
    if(videoData.rating > 5){
        errors.rating = 'Rating cannot be more than 5';
    }
    return errors
}

export default validation;