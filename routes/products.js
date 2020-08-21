var express = require('express');
var router = express.Router();

var Product = /** @class */ (function () {
    function Product(id, title, price, rating, desc, categories,imgurl) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
        this.imgurl=imgurl;
    }
    return Product;
}());
exports.Product = Product;
var Comment = /** @class */ (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var products = [
    new Product(2, "Huawei Mate", 1222.99, 2.5, "This is the second Demo", ["Phones"],"./assets/img/img(2).jpg"),
    new Product(1, "Camera1", 781.99, 3.5, "This is the first Demo", ["Cameras"],"./assets/img/img(1).jpg"),
    new Product(3, "Iphone6", 853.99, 4.5, "This is the third Demo", ["Phones"],"./assets/img/img(3).jpg"),
    new Product(4, "Camera2", 499.99, 1.5, "This is the fourth Demo", ["Cameras"],"./assets/img/img(4).jpg"),
    new Product(5, "Apple3", 595.99, 3.5, "This is the fifth Demo", ["Computers"],"./assets/img/img(5).jpg"),
    new Product(6, "Ipad5", 1256.99, 2.5, "This is the sixth Demo", ["Tablets"],"./assets/img/img(6).jpg"),
];
var comments = [
    new Comment(1, 1, "2018-02-03 22:12:12", "Tom", 3, "It is very good"),
    new Comment(2, 1, "2018-02-03 12:02:12", "Jerry", 3, "It is good"),
    new Comment(3, 2, "2018-02-03 08:12:12", "Sam", 2, "It is not bad"),
    new Comment(4, 2, "2018-02-03 07:12:13", "Bruce", 1, "It is bad"),
    new Comment(5, 2, "2018-02-03 19:12:12", "Harry", 2, "It is so so"),
];



router.get('/', function (req, res) {
    var result = products;
    var params = req.query;
    console.log(params);
    if (params.title) {
        result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
        console.log(result.length);
        console.log('title');
    }
    if (params.price && result.length > 0) {
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
        console.log('price');
    }
    if (params.category && params.category !== "-1" && result.length > 0) {
        result = result.filter(function (p) { return p.categories.indexOf(params.category) !== -1; });
    }
    res.json(result);
});
router.get('/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
router.get('/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.id; }));
});

module.exports = router;