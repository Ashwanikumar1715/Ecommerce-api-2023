const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
  let toplevel = await Category.findOne({ name: reqData.topLevelCategory });

  if (!toplevel) {
    toplevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: toplevel._id,
  });

  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      parentCategory: toplevel._id,
      level: 2,
    });
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });
  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
  }

  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPresent: reqData.discountPresent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    sizes: reqData.size,
    quantity: reqData.quantity,
    category: thirdLevel._id,
  });
  return await product.save();
}

async function deleteProduct(productId) {
  const product = await findProductById(productId);

  await Product.findByIdAndDelete(productId);
  return "Product deleted successfully";
}

async function updateProduct(productId) {
  return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(id) {
  const product = await Product.findById(id).populate("category").exec();

  if (!product) {
    throw new Error("Product not found with id:" + id);
  }
  return product;
}

async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    sizes,
    minPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = pageSize || 10;

  let query = Product.find().populate("category");

  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (existCategory) {
      query.where("category").equals(existCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPage: 0 };
    }
  }

  if (color) {
    const colorList = new Set(
      color.split(",").map((color) => color.trim().toLowercase())
    );
    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "1") : null;
    query = query.where("color".regex(colorRegex));
  }

  if (sizes) {
    const sizes = new Set(sizes);
    query.query.where("sizes.name").in([...sizesSet]);
  }

  if (minprice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
    query = query.where("discountPresent").gte(minDiscount);
  }

  if (stock) {
    if (stock == "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock == "out_of_stock") {
      query = query.where("quantity").gt(1);
    }
  }
  if (sort) {
    const sortDirection = sort === "price_height" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  const totalProducts = await Product.countDocuments(query);

  const skip = (pageNumber - 1) * pageSize;

  query = query.skip(skip).limit(pageSize);

  const products = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize);

  return { content: products, currentPage: pageNumber, totalPages };
}

async function createMultipleProduct(products){
    for(let product of products){
        await createProduct(product);
    }
}

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct,
}