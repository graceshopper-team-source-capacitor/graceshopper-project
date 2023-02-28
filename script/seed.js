"use strict";

const {
  db,
  models: { User, Product, Order, LineItem },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Butter Croissants 4 count, 9 oz",
      imageUrl: "bakery1.jpeg",
      price: 8.0,
      type: "bakery",
      description: "Allergens: Eggs, Milk and Dairy, Wheat",
    }),
    Product.create({
      name: "Organic Tortillas, Flour - Burrito Size (6 Tortillas), 16 oz",
      imageUrl: "bakery2.jpeg",
      price: 4.99,
      type: "bakery",
      description:
        "Allergens: Soy, Wheat \n Dairy-free, Sugar-Conscious, Vegan, Vegetarian, Organic",
    }),
    Product.create({
      name: "Classic Puff Pastry, 14 oz",
      imageUrl: "bakery3.jpeg",
      price: 16.49,
      type: "bakery",
      description: "Allergens: Milk and Dairy, Wheat",
    }),
    Product.create({
      name: "Organic 21 Whole Grains And Seeds Bread, 27 oz",
      imageUrl: "bakery4.jpeg",
      price: 6.99,
      type: "bakery",
      description:
        "Allergens: Wheat \n Dairy-Free, Kosher, Vegan, Vegetarian, Organic",
    }),
    Product.create({
      name: "Brioche Hot Dog Buns 6 Count",
      imageUrl: "bakery5.jpeg",
      price: 6.99,
      type: "bakery",
      description: "Allergens: Eggs, Milk and Dairy, Wheat",
    }),
    Product.create({
      name: "Tandoori Naan, Roasted Garlic (4 - 3oz Pieces)",
      imageUrl: "bakery6.jpeg",
      price: 4.29,
      type: "bakery",
      description: "Allergens: Milk and Dairy, Wheat",
    }),
    Product.create({
      name: "Organic Epic Everything Bagel, 16.75 oz",
      imageUrl: "bakery7.jpeg",
      price: 5.99,
      type: "bakery",
      description:
        "Allergens: Wheat \n Dairy-Free, Kosher, Vegan, Vegetarian, Organic",
    }),
    Product.create({
      name: "Sandwich Bread, Classic White (16 Slices), 24 oz",
      imageUrl: "bakery8.jpeg",
      price: 3.49,
      type: "bakery",
      description: "Allergens: Soy, Wheat \n Dairy-Free, Kosher",
    }),
    Product.create({
      name: "Blueberry Scone 4 Count, 12 oz",
      imageUrl: "bakery9.jpeg",
      price: 7.49,
      type: "bakery",
      description: "Allergens: Milk and Dairy, Wheat",
    }),
    Product.create({
      name: "Brown Butter Chocolate Chunk Mini Cookie 18 Count, 9 oz",
      imageUrl: "bakery10.jpeg",
      price: 7.49,
      type: "bakery",
      description: "Allergens: Eggs, Milk and Dairy, Wheat",
    }),
    Product.create({
      name: "honeycrisp-apple",
      imageUrl: "honeycrisp-apple.jpg",
      price: 2.49,
      type: "produce",
      description: "Dairy-free, gluten-free, free, paleo-friendly",
    }),
    Product.create({
      name: "red-onion",
      imageUrl: "red-onion.jpg",
      price: 1.89,
      type: "produce",
      description: "Dairy-free, gluten-free, free, paleo-friendly",
    }),
    Product.create({
      name: "garlic",
      imageUrl: "garlic.jpg",
      price: 0.56,
      type: "produce",
      description: "Dairy-free, gluten-free, free, paleo-friendly",
    }),
    Product.create({
      name: "strawberries",
      imageUrl: "strawberries.jpg",
      price: 5.49,
      type: "produce",
      description: "Dairy-free, gluten-free, free, paleo-friendly",
    }),
    Product.create({
      name: "carrots",
      imageUrl: "carrots.jpg",
      price: 2.99,
      type: "produce",
      description: "Dairy-free, gluten-free, free, paleo-friendly",
    }),
    Product.create({
      name: "russett-potato",
      imageUrl: "russett-potato.jpg",
      price: 1.29,
      type: "produce",
      description: "Dairy-free, gluten-free, free, paleo-friendly",
    }),
    Product.create({
      name: "orange",
      imageUrl: "orange.jpg",
      price: 0.99,
      type: "produce",
      description: "Dairy-free, gluten-free, free, paleo-friendly",
    }),
    Product.create({
      name: "watermelon",
      imageUrl: "watermelon.jpg",
      price: 7.89,
      type: "produce",
      description: "Dairy-free, gluten-free, free, paleo-friendly",
    }),
    Product.create({
      name: "bananas",
      imageUrl: "bananas.jpg",
      price: 0.32,
      type: "produce",
      description: "Dairy-free, gluten-free, free, paleo-friendly",
    }),
    Product.create({
      name: "cabbage",
      imageUrl: "cabbage.jpg",
      price: 0.49,
      type: "produce",
      description: "Dairy-free, gluten-free, free, paleo-friendly",
    }),
    Product.create({
      name: "broccoli",
      imageUrl: "broccoli.jpg",
      price: 3.59,
      type: "produce",
      description: "Dairy-free, gluten-free, free, paleo-friendly",
    }),
    Product.create({
      name: "Oatly",
      price: 5.99,
      type: "Dairy and Dairy Alternatives",
      description: `dairy-free, gluten-free, kosher, vegan`,
      imageUrl: "oatmilk.jpg",
    }),
    Product.create({
      name: "Califia Farms Unsweetened Almond Milk",
      price: 5.39,
      type: "Dairy and Dairy Alternatives",
      description: `dairy-free, kosher, paleo-friendly, vegan`,
      imageUrl: "almondmilk.jpg",
    }),
    Product.create({
      name: "GT Cocoyo",
      price: 6.69,
      type: "Dairy and Dairy Alternatives",
      description: `kosher, paleo-friendly, organic, vegan`,
      imageUrl: "coconutyogurt.jpg",
    }),
    Product.create({
      name: "Daiya Mozzarella ",
      price: 5.99,
      type: "Dairy and Dairy Alternatives",
      description: `dairy-free, gluten-free, vegan, kosher`,
      imageUrl: "daiyacheese.jpg",
    }),
    Product.create({
      name: "Maple Hill Creamery ",
      price: 6.99,
      type: "Dairy and Dairy Alternatives",
      description: `organic, vegetarian`,
      imageUrl: "wholemilk.jpg",
    }),
    Product.create({
      name: "Ronny Brook Farm European Style Butter ",
      price: 6.99,
      type: "Dairy and Dairy Alternatives",
      description: `kosher, vegetarian, local`,
      imageUrl: "wholemilk.jpg",
    }),
    Product.create({
      name: "Van Leeuwen Mint Chip ",
      price: 7.99,
      type: "Dairy and Dairy Alternatives",
      description: `vegan, local`,
      imageUrl: `veganicecream.jpg`,
    }),
    Product.create({
      name: "Vital Farms Eggs",
      price: 9.99,
      type: "Dairy and Dairy Alternatives",
      description: `dairy-free, paleo, vegetarian`,
      imageUrl: `eggs.jpg`,
    }),
    Product.create({
      name: "Just Eggs",
      price: 3.99,
      type: "Dairy and Dairy Alternatives",
      description: `vegan, gluten-free`,
      imageUrl: `veganeggs.jpg`,
    }),
    Product.create({
      name: "Urban Remedy Blue Magic Cashew Milk",
      price: 9.99,
      type: "Dairy and Dairy Alternatives",
      description: `vegan, gluten-free, organic`,
      imageUrl: `cashewmilk.jpg`,
    }),
    Product.create({
      name: "Miyoko Oat Milk Butter",
      price: 5.99,
      type: "Dairy and Dairy Alternatives",
      description: `vegan, gluten-free, kosher, keto-friendly`,
      imageUrl: `veganbutter.jpg`,
    }),
    Product.create(
      {
        name: "Tony's Chocoloney Milk Chocolate Everything Bar, 6.35 oz",
        imageUrl: "Tonys_MilkChocEverything.jpg",
        price: 4.99,
        type: "specialty",
        description:
          "Ingredients: Sugar, Dry Whole Milk, Cocoa Butter, Chocolate Liquor, Caramel Pieces (Sugar, Wheat Syrup, Cream (Milk), Butter (Milk)), Almonds, Pretzel Crumbs (Wheat Flour, Salt, Sunflower Oil, Malted Wheat Flour, Yeast, Sodium Hydroxide), Honey-almond-nougat (Cane Sugar, Wheat Syrup, Almonds, Potato Starch, Honey, Cocoa Butter, Egg Whites), Sea Salt, Soy Lecithin.",
      },
      {
        name: "Kettle Brand Jalapeno Potato Chips, 5 oz",
        imageUrl: "Kettle_Jalapeno.jpg",
        price: 3.49,
        type: "specialty",
        description:
          "Ingredients: Potatoes, Vegetable Oils (Canola, Sunflower and/or Safflower), Salt, Sugar, Onion Powder, Spices, Torula Yeast, Yeast Extract, Garlic Powder, Jalapeno Pepper Powder, Natural Flavors, Parsley.",
      },
      {
        name: "Smart Sweets Sourmelon Bites, 5.3 oz",
        imageUrl: "SmartSweets.jpg",
        price: 9.99,
        type: "specialty",
        description:
          "Ingredients: Isomalto-oligosaccharides (Vegetable Source), Chicory Root Fiber, Water, Modified Potato Starch, Lactic Acid, Pectin, Malic Acid, Citric Acid, Fumaric Acid, Rice Flour, Stevia Leaf Extract, Fruit and Vegetable Juice (For Color), Spirulina Extract (For Color), Natural Flavors, Carnauba Wax, Coconut Oil.",
      },
      {
        name: "UNREAL, Dar Chocolate Quinoa Crisp Gems, 5 oz",
        imageUrl: "Unreal_CrispGems.jpg",
        price: 6.49,
        type: "specialty",
        description:
          "Ingredients: Dark Chocolate (Chocolate Liquor‡, Cane Sugar‡, Cocoa Butter‡, Vanilla), Organic Cane Sugar‡, Organic Quinoa Crisp, Gum Acacia, Colored With (Beet Juice, Spirulina Extract), Organic Tapioca Syrup, Carnauba Wax.",
      },
      {
        name: "Annie's Organic White Cheddar Bunnies Crackers, 7.5 oz",
        imageUrl: "Annies_Bunnies.jpg",
        price: 5.15,
        type: "specialty",
        description:
          "Best Ingredients: Organic Wheat Flour, Organic Expeller-pressed Sunflower Oil, Organic Cheddar Cheese (Pasteurized Organic Milk, Cheese Cultures, Salt, Non-animal Enzymes), Organic Dried Cheddar Cheese (Organic Cultured Milk, Salt, Non-animal Enzymes), Organic Whey, Salt, Organic Nonfat Dry Milk, Organic Yeast, Leavening (Monocalcium Phosphate, Baking Soda), Organic Paprika, Organic Onion Powder, Organic Cane Sugar, Organic Celery Seed, Non-animal Enzymes.",
      },
      {
        name: "Ines Rosales Sweet Seville Orange Torta, 6.34 oz",
        imageUrl: "InesRosales.jpg",
        price: 6.99,
        type: "specialty",
        description:
          "Ingredients: Unbleached Wheat Flour, Extra Virgin Olive Oil, Sugar, Caramelized Orange (Glucose and Fructose Syrup, Orange Peel, Sugar and Citric Acid), Sesame Seeds, Yeast, Natural Orange Flavor, Sea Salt",
      },
      {
        name: "Nature's Bakery Rasperry Fig Bars, 12 oz",
        imageUrl: "NaturesBakery.jpg",
        price: 4.99,
        type: "specialty",
        description:
          "Ingredients: Whole Wheat Flour, Cane Sugar, Fig Paste, Brown Rice Syrup, Raspberry Jam (Naturally Milled Sugar, Cane Sugar, Glycerin, Rice Starch, Raspberries, Apple Powder, Natural Flavor, Pectin, Citric Acid, Locust Bean Gum), Canola Oil, Whole Grain Oats, Glycerin, Fruit Juice (For Color), Sea Salt, Natural Flavor, Citric Acid, Baking Soda.",
      },
      {
        name: "Bobo's Lemon Poppyseed Oat Bars, 3 oz",
        imageUrl: "Bobos.jpg",
        price: 9.99,
        type: "specialty",
        description:
          "Ingredients: Whole Grain Rolled Oats, Brown Rice Syrup, Coconut Oil, Cane Sugar, Vegetable Glycerin, Poppy Seeds, Lemon Oil, Xanthan Gum, Sea Salt, Vitamin E (For Freshness).",
      },
      {
        name: "Angie's Boom Chicka Pop Sweet & Salty Kettle Corn, 7 oz",
        imageUrl: "BoomChicka.jpg",
        price: 3.99,
        type: "specialty",
        description:
          "Ingredients: Popcorn, Sunflower Oil, Cane Sugar, Sea Salt.",
      },
      {
        name: "Wonderful Pistacios Roasted Shelled Pistacios, 12 oz",
        imageUrl: "Pistacios.jpg",
        price: 12.79,
        type: "specialty",
        description: "Ingredients: Pistachios, Sea Salt.",
      }
    ),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
