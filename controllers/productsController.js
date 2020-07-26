const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const db = require('../database/models');
const { Op } = require("sequelize");


//const productsDB = path.join(__dirname, '../data/productsDB.json');
//slet products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));

const controller = {
	// Root - Show all products
	root: (req, res, next) => {
		db.Product.findAll(
			{
				include: [{ association: "Category" }, { association: "Subcategory" },
				{ association: "Image" }]
			})

			.then(function (products) {
				res.render('./products/list', { category: products, nombreCategoria: "Nuestros Productos" })
			})
			.catch(function (error) {
				console.log(error);
			})
	},

	category: (req, res, next) => {

		let productReq = db.Product.findAll({
			where: { category_id: req.params.productCategory },
			include: [{ association: "Category" }, { association: "Subcategory" }, { association: "Image" }]
		})

		let categoryReq = db.Category.findAll({
			where: { id: req.params.productCategory }
		})

		Promise.all([productReq, categoryReq])
			.then(function ([category, categoryName]) {
				res.render('./products/list', {
					category: category,
					nombreCategoria: categoryName[0].name
				})
			})
			.catch(function (error) {
				console.log(error);
			})
	},

	/*let category = []
	products.forEach(function (product) {
		if (product.category == req.params.productCategory) {
			category.push(product)
		}
	})
	res.render('./products/list', { category: category,
		nombreCategoria: req.params.productCategory })
		*/

	subCategory: (req, res, next) => {

		let productReq = db.Product.findAll({
			where: { subcategory_id: req.params.productSubCategory },
			include: [{ association: "Subcategory" },
			{ association: "Category" },
			{ association: "Image" }]
		})

		let subcategoryReq = db.Subcategory.findAll(
			{
				where: { id: req.params.productSubCategory },
				include: [{ association: "Category" },
				{ association: "Product" }]
			})


		Promise.all([productReq, subcategoryReq])
			.then(function ([category, subcategoryName]) {
				console.log(subcategoryName[0].Category.name);
				res.render('./products/list', {
					category: category,
					nombreCategoria: subcategoryName[0].Category.name + " >> " + subcategoryName[0].name
				})
			})
			.catch(function (error) {
				console.log(error);
			})
	},

	/*let category = [];
	let nombreCategoria = "";
	products.forEach(function (product) {
		if (product.subCategory == req.params.productSubCategory) {
			category.push(product);
			nombreCategoria = product.category
		}
	})
	res.render('./products/list', { category: category,
		nombreCategoria: nombreCategoria + " || " + req.params.productSubCategory })
		*/

	sale: (req, res, next) => {
		db.Product.findAll(
			{
				where: { discount: { [Op.gt]: 0 }, state: { [Op.ne]: 0 } },
				include: [{ association: "Category" }, { association: "Subcategory" },
				{ association: "Image" }]
			})

			.then(function (products) {
				res.render('./products/list', { category: products, nombreCategoria: "Promociones" })
			})
			.catch(function (error) {
				console.log(error);
			})
	},

	// Detail - Detail from one product
	detail: (req, res, next) => {

		db.Product.findByPk(req.params.productId,
			{
				include: [{ association: "Subcategory" },
				{ association: "Category" },
				{ association: "Image" }]
			})
			.then((product) => {
				categoria = product.category_id
				return product;
			})
			.then((productDetail) => {
				db.Product.findAll(
					{
						where: { category_id: productDetail.category_id },
						limit: 4,
						include: [{ association: "Subcategory" },
						{ association: "Category" },
						{ association: "Image" }]
					})
					.then((similar) => {
						res.render('./products/detail', {
							product: productDetail,
							category: similar
						})
					})
					.catch(function (error) {
						console.log(error);
					})
			})
	},

	/*let product
	for (let i = 0; i < products.length; i++) {if (products[i].id == req.params.productId) {product = products[i];}}let category = []; products.forEach(function (similar) {if (similar.category == product.category) {category.push(similar);}})
	res.render('./products/detail', { product: product, category: category })
	*/


	// Create - Form to create
	create: (req, res, next) => {
		let categories = db.Category.findAll()
		let subCategories = db.Subcategory.findAll()

		Promise.all([categories, subCategories])
			.then(([categories, subCategories]) => {
				res.render('./products/create-form', { categories, subCategories })
			})
			.catch((error) => {
				console.log(error);
			})

	},

	// Create -  Method to store
	store: (req, res, next) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {

			let marcaBody = req.body.brand;
			marcaBody = marcaBody.toLowerCase();
			function MaysPrimera(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}
			marcaBody = MaysPrimera(marcaBody);

			db.Brand.findAll()
				.then((marcas) => {
					let contador = 0;
					let marca;
					for (let i = 0; i < marcas.length; i++) {
						if (marcaBody == marcas[i].dataValues.name) {
							contador++;
							marca = marcas[i]
						}
					}
					if (contador > 0) {
						db.Product.create({
							name: req.body.name,
							description: req.body.description,
							price: Number(req.body.price),
							discount: Number(req.body.discount),
							tax: req.body.tax,
							state: 1,
							category_id: req.body.category,
							subcategory_id: req.body.subcategory,
							brand_id: marca.dataValues.id
						})
							.then((newProduct) => {
								console.log(req.files);
								let img1;
								let img2;
								let img3;

								if (req.files == '') {
									img1 = db.Image.create({
										name: 'logo-pickBazar.jpg',
										main: 1,
										product_id: newProduct.id
									})
										.then(() => {
											res.redirect('/products');
										})
										.catch((error) => {
											console.log(error);
										})
								} else if (req.files.length == 1) {
									img1 = db.Image.create({
										name: req.files[0].filename,
										main: 1,
										product_id: newProduct.id
									})
										.then(() => {
											res.redirect('/products');
										})
										.catch((error) => {
											console.log(error);
										})
								} else if (req.files.length == 2) {
									img1 = db.Image.create({
										name: req.files[0].filename,
										main: 1,
										product_id: newProduct.id
									})
									img2 = db.Image.create({
										name: req.files[1].filename,
										main: 2,
										product_id: newProduct.id
									})
									Promise.all([img1, img2])
										.then(() => {
											res.redirect('/products');
										})
										.catch((error) => {
											console.log(error);
										})
								} else if (req.files.length == 3) {
									img1 = db.Image.create({
										name: req.files[0].filename,
										main: 1,
										product_id: newProduct.id
									})
									img2 = db.Image.create({
										name: req.files[1].filename,
										main: 2,
										product_id: newProduct.id
									})
									img3 = db.Image.create({
										name: req.files[2].filename,
										main: 3,
										product_id: newProduct.id
									})
									Promise.all([img1, img2, img3])
										.then(() => {
											res.redirect('/products');
										})
										.catch((error) => {
											console.log(error);
										})
								}

							})

					} else {
						db.Brand.create({
							name: marcaBody
						})
							.then((brand) => {
								db.Product.create({
									name: req.body.name,
									description: req.body.description,
									price: Number(req.body.price),
									discount: Number(req.body.discount),
									tax: req.body.tax,
									state: 1,
									category_id: req.body.category,
									subcategory_id: req.body.subcategory,
									brand_id: brand.id
								})


									.then((newProduct) => {
										console.log(req.files);
										let img1;
										let img2;
										let img3;

										if (req.files == '') {
											img1 = db.Image.create({
												name: 'logo-pickBazar.jpg',
												main: 1,
												product_id: newProduct.id
											})
												.then(() => {
													res.redirect('/products');
												})
												.catch((error) => {
													console.log(error);
												})
										} else if (req.files.length == 1) {
											img1 = db.Image.create({
												name: req.files[0].filename,
												main: 1,
												product_id: newProduct.id
											})
												.then(() => {
													res.redirect('/products');
												})
												.catch((error) => {
													console.log(error);
												})
										} else if (req.files.length == 2) {
											img1 = db.Image.create({
												name: req.files[0].filename,
												main: 1,
												product_id: newProduct.id
											})
											img2 = db.Image.create({
												name: req.files[1].filename,
												main: 2,
												product_id: newProduct.id
											})
											Promise.all([img1, img2])
												.then(() => {
													res.redirect('/products');
												})
												.catch((error) => {
													console.log(error);
												})
										} else if (req.files.length == 3) {
											img1 = db.Image.create({
												name: req.files[0].filename,
												main: 1,
												product_id: newProduct.id
											})
											img2 = db.Image.create({
												name: req.files[1].filename,
												main: 2,
												product_id: newProduct.id
											})
											img3 = db.Image.create({
												name: req.files[2].filename,
												main: 3,
												product_id: newProduct.id
											})
											Promise.all([img1, img2, img3])
												.then(() => {
													res.redirect('/products');
												})
												.catch((error) => {
													console.log(error);
												})
										}

									})


							})
							.then(() => {
								res.redirect('/products');
							})
							.catch((error) => {
								console.log(error);
							})
					}
				})
				.catch((error) => {
					console.log(error);
				})
		} else {
			let categories = db.Category.findAll()
			let subCategories = db.Subcategory.findAll()

			Promise.all([categories, subCategories])
				.then(([categories, subCategories]) => {
					res.render('./products/create-form', { categories, subCategories, errors: errors.errors, datos: req.body })
				})
				.catch((error) => {
					console.log(error);
				})
		}
	},

	// Update - Form to edit
	edit: (req, res, next) => {

		let categories = db.Category.findAll()
		let subCategories = db.Subcategory.findAll()
		let product = db.Product.findByPk(req.params.productId, {
			include: [{ association: 'Category' }, { association: 'Subcategory' }]
		})
		let images = db.Image.findAll({
			where: {
				product_id: req.params.productId
			}
		})

		Promise.all([categories, subCategories, product, images])
			.then(([categories, subCategories, product, images]) => {
				res.render("./products/edit-form", { categories, subCategories, product, images })
			})
			.catch((error) => {
				console.log(error);
			})
	},

	// Update - Method to update
	update: (req, res, next) => {

		let errors = validationResult(req);
		if (errors.isEmpty()) {

			db.Product.update({
				name: req.body.name,
				description: req.body.description,
				price: Number(req.body.price),
				discount: Number(req.body.discount),
				tax: req.body.tax,
				state: 1,
				category_id: req.body.category,
				subcategory_id: req.body.subcategory,
			}, {
				where: {
					id: req.params.productId
				}
			})

				.then(() => {
					let images = db.Image.findAll({
						where: {
							product_id: req.params.productId
						}
					})
					return images;
				})


				.then((images) => {

					let img1;
					let img2;
					let img3;

					// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 1 \\

					if (images.length == 1) {

						// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 1 \\
						// Y NO SE EDITA NINGUNA IMAGEN \\

						if (req.files == '') {
							img1 = db.Image.update({
								name: 'logo-pickBazar.jpg',
								main: 1,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 1,
								}
							})
								.then(() => {
									res.redirect('/products/detail/' + req.params.productId)
								})
								.catch((error) => {
									console.log(error);
								})

							// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 1 \\
							// Y EN LA EDICION SE MODIFICA SOLO UNA \\

						} else if (req.files.length == 1) {
							img1 = db.Image.update({
								name: req.files[0].filename,
								main: 1,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 1,
								}
							})
								.then(() => {
									res.redirect('/products/detail/' + req.params.productId)
								})
								.catch((error) => {
									console.log(error);
								})

							// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 1 \\
							// Y EN LA EDICION SE MODIFICAN DOS \\


						} else if (req.files.length == 2) {
							img1 = db.Image.update({
								name: req.files[0].filename,
								main: 1,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 1,
								}
							})
							img2 = db.Image.create({
								name: req.files[1].filename,
								main: 2,
								product_id: req.params.productId
							})
							Promise.all([img1, img2])
								.then(() => {
									res.redirect('/products/detail/' + req.params.productId)
								})
								.catch((error) => {
									console.log(error);
								})

							// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 1 \\
							// Y EN LA EDICION SE MODIFICAN TRES \\

						} else if (req.files.length == 3) {
							img1 = db.Image.update({
								name: req.files[0].filename,
								main: 1,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 1,
								}
							})
							img2 = db.Image.create({
								name: req.files[1].filename,
								main: 2,
								product_id: req.params.productId
							})
							img3 = db.Image.create({
								name: req.files[2].filename,
								main: 3,
								product_id: req.params.productId
							})
							Promise.all([img1, img2, img3])
								.then(() => {
									res.redirect('/products/detail/' + req.params.productId)
								})
								.catch((error) => {
									console.log(error);
								})
						}

						// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 2 \\

					} else if (images.length == 2) {

						console.log(images);

						// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 2 \\
						// Y NO SE EDITA NINGUNA IMAGEN \\

						if (req.files == '') {
							img1 = db.Image.update({
								name: 'logo-pickBazar.jpg',
								main: 1,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 1,
								}
							})
								.then(() => {
									res.redirect('/products/detail/' + req.params.productId)
								})
								.catch((error) => {
									console.log(error);
								})

							// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 2 \\
							// Y EN LA EDICION SE MODIFICA SOLO UNA \\

						} else if (req.files.length == 1) {
							console.log('magua');
							img1 = db.Image.update({
								name: req.files[0].filename,
								main: 1,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 1,
								}
							})

								.then(() => {
									res.redirect('/products/detail/' + req.params.productId)
								})
								.catch((error) => {
									console.log(error);
								})

							// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 2 \\
							// Y EN LA EDICION SE MODIFICAN 2 \\

						} else if (req.files.length == 2) {
							console.log('entre mal');
							img1 = db.Image.update({
								name: req.files[0].filename,
								main: 1,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 1,
								}
							})
							img2 = db.Image.update({
								name: req.files[1].filename,
								main: 2,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 2,
								}
							})
							Promise.all([img1, img2])
								.then(() => {
									res.redirect('/products/detail/' + req.params.productId)
								})
								.catch((error) => {
									console.log(error);
								})

							// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 2 \\
							// Y EN LA EDICION SE MODIFICAN 3 \\

						} else if (req.files.length == 3) {
							console.log('entre bien');
							img1 = db.Image.update({
								name: req.files[0].filename,
								main: 1,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 1,
								}
							})
							img2 = db.Image.update({
								name: req.files[1].filename,
								main: 2,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 2,
								}
							})
							console.log(req.files[2].filename);
							img3 = db.Image.create({
								name: req.files[2].filename,
								main: 3,
								product_id: req.params.productId
							})
							Promise.all([img1, img2, img3])
								.then(() => {
									res.redirect('/products/detail/' + req.params.productId)
								})
								.catch((error) => {
									console.log(error);
								})
						}

						// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 3 \\ 

					} else if (images.length == 3) {

						// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 3 \\
						// Y NO SE EDITA NINGUNA IMAGEN \\

						if (req.files == '') {
							img1 = db.Image.update({
								name: 'logo-pickBazar.jpg',
								main: 1,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 1,
								}
							})
								.then(() => {
									res.redirect('/products/detail/' + req.params.productId)
								})
								.catch((error) => {
									console.log(error);
								})

							// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 3 \\
							// Y EN LA EDICION SE MODIFICA 1 \\

						} else if (req.files.length == 1) {
							img1 = db.Image.update({
								name: req.files[0].filename,
								main: 1,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 1,
								}
							})
								.then(() => {
									res.redirect('/products/detail/' + req.params.productId)
								})
								.catch((error) => {
									console.log(error);
								})

							// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 3 \\
							// Y EN LA EDICION SE MODIFICAN 2 \\

						} else if (req.files.length == 2) {
							img1 = db.Image.update({
								name: req.files[0].filename,
								main: 1,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 1,
								}
							})
							img2 = db.Image.update({
								name: req.files[1].filename,
								main: 2,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 2,
								}
							})
							Promise.all([img1, img2])
								.then(() => {
									res.redirect('/products/detail/' + req.params.productId)
								})
								.catch((error) => {
									console.log(error);
								})

							// SI LA CANTIDAD DE IMAGENES QUE TENIA ANTERIORMENTE EL ARTICULO ES 3 \\
							// Y EN LA EDICION SE MODIFICAN 3 \\

						} else if (req.files.length == 3) {
							img1 = db.Image.update({
								name: req.files[0].filename,
								main: 1,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 1,
								}
							})
							img2 = db.Image.update({
								name: req.files[1].filename,
								main: 2,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 2,
								}
							})
							img3 = db.Image.update({
								name: req.files[2].filename,
								main: 3,
								product_id: req.params.productId
							}, {
								where: {
									product_id: req.params.productId,
									main: 3,
								}
							})
							Promise.all([img1, img2, img3])
								.then(() => {
									res.redirect('/products/detail/' + req.params.productId)
								})
								.catch((error) => {
									console.log(error);
								})

						}
					}

				})

		} else {
			let categories = db.Category.findAll()
			let subCategories = db.Subcategory.findAll()
			let product = db.Product.findByPk(req.params.productId, {
				include: [{ association: 'Category' }, { association: 'Subcategory' }]
			})

			Promise.all([categories, subCategories, product])
				.then(([categories, subCategories, product]) => {
					res.render("./products/edit-form", { categories, subCategories, product, errors: errors.errors, datos: req.body })
				})
				.catch((error) => {
					console.log(error);
				})

		}
	},

	destroy: (req, res, next) => {

		let id = req.params.productId;
		db.Product.update({
			state: 0
		}, {
			where: {
				id: req.params.productId
			}
		})
			.then(() => {
				res.redirect('/products')
			})
			.catch((error) => {
				console.log(error);
			})

		//products = products.filter((producto) => { return producto.id != id });
		//fs.writeFileSync(productsDB, JSON.stringify(products));

	}
};

module.exports = controller;


