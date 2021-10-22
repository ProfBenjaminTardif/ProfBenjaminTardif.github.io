// status codes
// 200 : everything is ok or successful
// 201 : something is created
// 300 range : redirects
// 400 : bad request
// 404 : not found
// 500 range : server error

const http = require("http");
const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("./controllers/productController.js");

const server = http.createServer((req, res) => {
	// res.statusCode = 200;
	// res.setHeader("content-type", "text/html");
	// res.write("<h1>Hello World<h1>");
	// res.end();

	// res.statusCode = 200;
	// res.setHeader("content-type", "application/json");
	// res.write(JSON.stringify(products));
	// res.end();

	if (req.method === "GET" && req.url === "/api/products") {
		getProducts(req, res);
	} else if (
		req.method === "GET" &&
		req.url.match(/\/api\/products\/([0-9]+)/)
	) {
		const id = req.url.split("/")[3];
		getProduct(req, res, id);
	} else if (req.method === "POST" && req.url === "/api/products") {
		createProduct(req, res);
	} else if (
		req.method === "PUT" &&
		req.url.match(/\/api\/products\/([0-9]+)/)
	) {
		const id = req.url.split("/")[3];
		updateProduct(req, res, id);
	} else if (
		req.method === "DELETE" &&
		req.url.match(/\/api\/products\/([0-9]+)/)
	) {
		const id = req.url.split("/")[3];
		deleteProduct(req, res, id);
	} else {
		res.writeHead(404, { "content-type": "application/json" });
		res.end(JSON.stringify({ message: "Route not found" }));
	}
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
