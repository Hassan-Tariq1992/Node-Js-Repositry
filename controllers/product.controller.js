const Product = require('../models/product.model');
exports.test=function(req,res){
	res.send('Greeting from Test Controller!');
	
}

exports.product_create=function(req,res)
{
	let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );
	product.save(function(err)
	{
		if(err)
		{
			console.log(err);
		}
			res.send('Product saved Successfully');

	});

}

exports.product_view=function(req,res)
{
	Product.findById(req.params.id,function(err,product){
		if(err)
		{
			console.log(err);
		}
		res.send(product);
	})
}
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return console.log(err);
        res.send('Product Updated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findOneAndDelete(req.params.id, function (err) {
        if (err) return console.log(err);
      res.send('Product Deleted Successfully');
    })
};

exports.product_list=function(req,res)
{
	Product.find({},function(err,products){
			if(err)
			{
				console.log(err);
			}
		res.send(products);
			//	res.render('../views/index.html',{products:products});
	});
}
