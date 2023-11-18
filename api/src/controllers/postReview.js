const {Review} = require('../db');

const postReview = async (req, res) => {
    const {name, content, rating} = req.body;
    if(!name || !content ||!rating){
        return res.staus(404).send('Missing Data');
    }
    try {
        const [newReview,created] = await Review.findOrCreate({
            where : {name},
            defaults : {
                content,
                rating
            }
        });
        if(!created){
            return res.status(403).send('You already sent a review of the app');
        }
        return res.status(200).send('Your review was added successfully');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    postReview
}