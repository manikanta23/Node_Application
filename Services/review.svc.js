
const Review = require('../Models/review.model');

class ReviewService {

    get(id) {
        return  Review.find({ productId: id }, { _id: 0 })
            .exec();       
    }


    save(data) {
        var review = new Review(data);

        review.save()
            .then(function (result) {
                res.status(201);
                res.json(result);
            })
            .catch(function (err) {
                res.status(500);
                res.send("Ionternal Server Error");
            });
    }



}

module.exports = new ReviewService();
