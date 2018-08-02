var Joi = require('joi');
var express = require('express');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Product = require('./Models/product.model');
const userRouter = require('./Routes/user.router');
const reviewRouter = require('./Routes/review.router');
const middleWare = require('./middleware');

const ReviewService = require('./Services/review.svc');
const config = require('./config');
var multer = require('multer');
var upload = multer({dest: 'Uploads'});

var app = express();
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

var port = process.env.port || 3000;



app.post('/upload',upload.single("image"), (req,res) =>{

    res.status(201);
    res.send("Uploaded successfully.");
});

app.use(middleWare.tokenAuth);

function getProductById(id) {
    return Product.findById(id).exec();

}

app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

app.get('/api/products', (req, res) => {

    //Asynchronous promise
    Product.find()
        .exec()
        .then(function (products) {
            res.status(200).json(products);
        })
        .catch(function (err) {
            res.status(500).send("Internal server error");
        })


});

app.get('/api/products/:id', async (req, res) => {
    //res.send(cources);

    // Product.findById(id)
    // .exec()
    // .then(function(product){
    //     res.status(200).json(product);
    // })
    // .catch(function(err){
    //     res.status(500).send("Internal Server Error");
    // })
    try {

        let id = req.params.id;
        let product = await getProductById(id);
        let reviews = await ReviewService.get(id);
        
        let jsonProduct =  product.toJSON();
        jsonProduct.reviews = reviews;
        res.status(200).send(jsonProduct);

    }
    catch (err) {
        res.status(500).send("Internam server error");
    }

});


app.post('/api/products', (req, res) => {

    const { error } = validateCource(req.body);       // Object destructuring 
    if (error) return res.status(400).send(error.details[0].message);

    var product = new Product(req.body);
    // product.save(function(error, savedProduct){

    //     if(error){
    //         res.status(500);
    //         res.send("Internal server error");

    //     }else {
    //         res.status(200);
    //         res.json(savedProduct);
    //     }
    // });

    product.save()
        .then(function (productDetaisl) {
            res.status(200).json(productDetaisl);
        })
        .catch(function (err) {
            res.status(500).send("Internal Server Error");

        })




    // const cource = {
    //     id : cources.length + 1 ,
    //     name : req.body.name
    // };

    // cources.push(cource);
    // res.send(cources);
});

app.patch('/api/products/:id', (req, res) => {
    let id = req.params.id;
    delete req.body._id;

    Product.findById(id, function (err, product) {
        if (product) {
            for (var key in req.body) {
                product[key] = req.body[key];
            }

            Product.findByIdAndUpdate(id, product, function (err) {
                if (err) res.status(500).send("Internal server error");
                else res.status(204).send();
            });

        } else {
            res.status(404).send("Not Found");
        }
    });

});
app.put('/api/products/:id', (req, res) => {
    // const cource = cources.find(c => c.id === parseInt(req.params.id));
    // if(!cource)  return res.status(404).send('No Cource found');

    // // const result = validateCource(req.body);
    // const { error } = validateCource(req.body);       // Object destructuring 
    // if(error) return  res.status(400).send(error.details[0].message);

    // cource.name = req.body.name;
    // res.send(cources);

    let id = req.params.id;

    Product.findByIdAndUpdate(id, {
        $set: {
            Name: req.body.Name,
            Price: req.body.Price,
            Desc: req.body.Desc
        }
    }, function (err) {
        if (err) res.status(500).send("Internal server error");
        else res.status(204).send();

    });
});

app.delete('/api/products/:id', (req, res) => {
    // const cource = cources.find(c => c.id === parseInt(req.params.id));
    // if(!cource)  return res.status(404).send('No Cource found');

    // const index = cources.indexOf(cource);
    // cources.splice(index,1);

    // res.send(cources);

    // let id = req.params.id;
    // Product.findByIdAndRemove(id, function(err){
    //     if(err)
    //        return  res.status(500).send("Internal Server Error");
    //     else 
    //        return  res.status(204).send();

    // });
    let id = req.params.id;
    Product
        .findByIdAndRemove(id)
        .exec()
        .then(function () {
            res.status(204).send();
        })
        .catch(function (err) {
            res.status(500).send("Internal Server Error");
        })

});


app.get('/api/cources/:id', (req, res) => {
    const cource = cources.find(c => c.id === parseInt(req.params.id));

    if (!cource) return res.status(404).send('No Cource found');
    res.send(cource);
    // res.send(req.params);
    //res.send(req.query);
});

function validateCource(cource) {
    const schema = {
        Name: Joi.string().min(3).required(),
        Price: Joi.required(),
        Desc: Joi.string().min(3).required()
    };



    return Joi.validate(cource, schema);
}

app.listen(port, () => {
    console.log('Running on PORT:' + port);
});

// mongodb://localhost:27017
// mongoose.connect("mongodb://localhost/admin", () => console.log("DB connected"));
mongoose.connect(config.connectionString, () => console.log("DB connected"));
