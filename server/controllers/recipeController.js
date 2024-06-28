require("../config/database");
const Category = require("../models/category");
const Recipe = require("../models/recipe");

/**
 * Get
 * Homepage
 */

exports.homepage = async (req, res) => {
  try {
    const limitnum = 5;
    const limitnumb = 5;
    const categories = await Category.find({}).limit(limitnum);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitnumb);

    const thai = await Recipe.find({ category: "Thai" })
      .sort({ _id: -1 })
      .limit(limitnumb);
    const american = await Recipe.find({ category: "American" })
      .sort({ _id: -1 })
      .limit(limitnumb);
      const mexican = await Recipe.find({ category: "Mexican" })
      .sort({ _id: -1 })
      .limit(limitnumb);
    const chinese = await Recipe.find({ category: "Chinese" })
      .sort({ _id: -1 })
      .limit(limitnumb);
      const indian = await Recipe.find({ category: "Indian" })
      .sort({ _id: -1 })
      .limit(limitnumb);
      const italian = await Recipe.find({ category: "Italian" })
      .sort({ _id: -1 })
      .limit(limitnumb);

    const food = { latest, thai, american, chinese,indian ,italian, mexican};

    res.render("index", { title: "CooKKing-Home", categories, food });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error" });
  }
};

/**
 * Get /categories
 * exploreCategories
 */
exports.exploreCategories = async (req, res) => {
  try {
    const limitnum = 20;
    const categories = await Category.find({}).limit(limitnum);
    res.render("categories", { title: "CooKKing-categories", categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error" });
  }
};

/**
 * Get
 * categories/id
 * exploreCategoriesbyid
 */
exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryid = req.params.id;
    const limitnum = 20;
    const categoryById = await Recipe.find({ category: categoryid }).limit(
      limitnum
    );
    res.render("categories", { title: "CooKKing-categories", categoryById });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error" });
  }
};

/**
 * Get
 * /recpie/:id
 * Recipe
 */
exports.exploreRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render("recipe", { title: "CooKKing-Recipe", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error" });
  }
};

/**
 * Post
 * /Search
 * Serch
 */

exports.searchrecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", { title: "CooKKing-Search", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error" });
  }
};

/**
 * Get
 * /recpie/:id
 * Explore Latest
 */

exports.exploreLatest = async (req, res) => {
  try {
    const limitnum = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitnum);
    res.render("explore-latest", { title: "CooKKing-Explore Latest", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error" });
  }
};

/**
 * Get
 * /recpie/:id
 * Explore Random
 */

exports.exploreRandom = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render("random-latest", { title: "CooKKing-Explore Random", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error" });
  }
};

exports.aboutpage = async (req, res) => {
  res.render("about", { title: "CooKKing-About" });
}

exports.contactpage = async (req, res) => {
  res.render("contact", { title: "CooKKing-Contact" });
}
/**
 * Get
 * /Submit Recipe
 */
exports.submitRecipe = async (req, res) => {
  const infoErrorObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("submit-recipe", {
    title: "CooKKing-Submit Recipe",
    infoErrorObj,
    infoSubmitObj,
  });
};

/**
 * Post
 * /Submit Recipe
 */
exports.submitRecipePost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No Files where uploaded.");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath =
        require("path").resolve("./") + "/public/uploads/" + newImageName;

      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.satus(500).send(err);
      });
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName,
    });

    await newRecipe.save();

    req.flash("infoSubmit", "Recipe has been added.");
    res.redirect("submit-recipe");
  } catch (error) {
    req.flash("infoErrors", error);
    res.redirect("submit-recipe");
  }
};



// Delete Recipe
// async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({ name: 'ads' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();


// Update Recipe
// async function updateRecipe(){
//   try {
//     const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateRecipe();




// insert into Category

// async function insertdataintocategory(){

//     try {
//         await Category.insertMany([
//            
//         ]);
//     } catch (error) {
//         console.log(error);
//     }

// }

// insertdataintocategory()





// Insert into recepie

// async function insertDymmyRecipeData() {
//   try {
//     await Recipe.insertMany([
      
//    ]);
//   } catch (error) {
//     console.log(error);
//   }
// }

// insertDymmyRecipeData();
