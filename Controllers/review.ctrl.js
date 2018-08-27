const Review = require('../Models/review.model');
const ReviewService = require('../Services/review.svc');


class ReviewControl {

    async save(req,res){
        try {
            await ReviewService.save(req.body);
            res.status(200).send("Successfully Saved.");

        } catch(error) {
            console.log(error);
        }
    }

    async get(req, res) {
        try {
          let response =  await ReviewService.get(req.params.id);
          
            res.status(200).json(response).send("Successfully got the result.");

        } catch(error) {
            console.log(error);
        }

    }

    // save(req, res) {
    //     var review = new Review(req.body);

    //     review.save()
    //         .then(function (result) {
    //             res.status(201);
    //             res.json(result);
    //         })
    //         .catch(function(err){
    //             res.status(500);
    //             res.send("Ionternal Server Error");
    //         });
    // }

}


module.exports = new ReviewControl();

