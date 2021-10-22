const Product = require("../models/productModel.js");
const { getPostData } = require("../utils.js");

async function getProducts(req, res) {
	try {
		const products = await Product.findAll();

		res.writeHead(200, { "content-type": "application/json" });
		res.end(JSON.stringify(products));
	} catch (error) {
		console.log(error);
	}
}

async function getProduct(req, res, id) {
	try {
		const product = await Product.findById(id);
		if (!product) {
			res.writeHead(404, { "content-type": "application/json" });
			res.end(
				JSON.stringify({ message: `product id ${id} does not exist` })
			);
		} else {
			res.writeHead(200, { "content-type": "application/json" });
			res.end(JSON.stringify(product));
		}
	} catch (error) {
		console.log(error);
	}
}

async function createProduct(req, res) {
	try {
		const body = await getPostData(req);

		const { title, description, price } = JSON.parse(body);

		const product = {
			title,
			description,
			price,
		};

		const newProduct = await Product.create(product);

		res.writeHead(201, { "content-type": "application/json" });
		return res.end(JSON.stringify(newProduct));
	} catch (error) {
		console.log(error);
	}
}

async function updateProduct(req, res, id) {
	try {
		const product = await Product.findById(id);

		if (!product) {
			res.writeHead(404, { "content-type": "application/json" });
			res.end(
				JSON.stringify({ message: `product id ${id} does not exist` })
			);
		} else {
			const body = await getPostData(req);

			const { title, description, price } = JSON.parse(body);

			const productData = {
				title: title || product.title,
				description: description || product.description,
				price: price || product.price,
			};

			const updProduct = await Product.update(id, productData);

			res.writeHead(200, { "content-type": "application/json" });
			return res.end(JSON.stringify(updProduct));
		}
	} catch (error) {
		console.log(error);
	}
}

async function deleteProduct(req, res, id) {
	try {
		const product = await Product.findById(id);
		if (!product) {
			res.writeHead(404, { "content-type": "application/json" });
			res.end(
				JSON.stringify({ message: `product id ${id} does not exist` })
			);
		} else {
			await Product.remove(id);
			res.writeHead(200, { "content-type": "application/json" });
			res.end(JSON.stringify({ message: `product ${id} removed` }));
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
