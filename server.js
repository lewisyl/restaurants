const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/public/dist/public"));
mongoose.set("useFindAndModify", false);
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/restaurants", { useNewUrlParser: true });

const RateSchema = new mongoose.Schema(
    {
        customer: {
            type: String,
            required: [true, "Customer Name is required!"],
            minlength: [3, "Customer Name must have at least 3 characters."]
        },
        rate: {
            type: Number,
            required: [true, "Rate is required!"],
            min: [1, "Rate can't go less than 1 star"],
            max: [5, "Rate can't go more than 5 star"]
        },
        description: {
            type: String,
            required: [true, "Description is required!"],
            minlength: [3, "Description must have at least 3 characters."]
        }
    },
    { timestamps: true }
);
const RestaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Restaurant name is required!"],
            unique: [true, "Your restaurant has already been on our list!"],
            minlength: [3, "Restaurant name must have at least 3 characters."]
        },
        cuisine: {
            type: String,
            required: [true, "Cuisine is required!"],
            minlength: [3, "Cuisine must have at least 3 characters."]
        },
        rates: [RateSchema]
    },
    { timestamps: true }
);
const Rate = mongoose.model("Rate", RateSchema);
const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

app.get("/exp-restaurants", (req, res) => {
    Restaurant.find()
        .then(restaurants => {
            res.json({
                message: "success",
                result: restaurants
            });
        })
        .catch(err => res.json({ message: "error", result: err }));
});

app.post("/exp-new", (req, res) => {
    const newRestaurant = new Restaurant(req.body);
    newRestaurant
        .save()
        .then(newRestaurant => {
            res.json({
                message: "success",
                result: newRestaurant
            });
        })
        .catch(err => res.json({ message: "error", result: err }));
});

app.get("/exp-restaurants/:resID", (req, res) => {
    Restaurant.findOne({ _id: req.params.resID })
        .then(restaurant => {
            const propComparator = propName => (a, b) =>
                a[propName] == b[propName]
                    ? 0
                    : a[propName] < b[propName]
                    ? 1
                    : -1;
            restaurant.rates.sort(propComparator("rate"));
            res.json({
                message: "success",
                result: restaurant
            });
        })
        .catch(err => res.json({ message: "error", result: err }));
});

app.put("/exp-restaurants/review/:resID", (req, res) => {
    const newRate = new Rate(req.body);
    Restaurant.findOneAndUpdate(
        { _id: req.params.resID },
        { $push: { rates: newRate } },
        { runValidators: true }
    )
        .then(newRate => {
            res.json({ message: "success", result: newRate });
        })
        .catch(err => res.json({ message: "error", result: err }));
});

app.put("/exp-restaurants/edit/:resID", (req, res) => {
    Restaurant.findOneAndUpdate(
        { _id: req.params.resID },
        { name: req.body.name, cuisine: req.body.cuisine },
        { runValidators: true }
    )
        .then(updatedRestaurant => {
            res.json({
                message: "success",
                result: updatedRestaurant
            });
        })
        .catch(err => res.json(err));
});

app.delete("/exp-restaurants/:resID", (req, res) => {
    Restaurant.findOneAndDelete({ _id: req.params.resID })
        .then(removedRestaurant => {
            res.json({
                message: "success",
                result: removedRestaurant
            });
        })
        .catch(err => res.json({ message: "error", result: err }));
});

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"));
});
