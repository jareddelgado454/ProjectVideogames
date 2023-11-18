const {Review} = require('../db');

const getReview = async (req, res) => {
    try {
        const maxReviews = 100;
        const reviews = await Review.findAll({
            limit : maxReviews,
            order : [['createdAt', 'DESC']]
        }); 
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
module.exports = {
    getReview
}