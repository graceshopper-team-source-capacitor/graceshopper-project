# FS-App-Template

## Setup

To use this as boilerplate, you'll need to take the following steps:

- Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)

- Now you will have to add the fs-app-template as a remote and merge it into your own repository.

```
git remote add boilermaker git@github.com:FullstackAcademy/fs-app-template-v2.git
git fetch boilermaker
git merge boilermaker/main
git branch -m master main
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

- Update project name and description in `package.json`
- `npm install`
- Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
- These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

- By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)

### As a customer/visitor, I want to be able to:
  [x] access a deployed* version of the website so I can browse and purchase products. (the website works with a localhost) <- will be handled as a group tomorrow (3/3)
  [x] view all available products so I can pick from a variety.
  [x] view a single product so I can see more details.
  [x] add a product to my cart so I can collect my desired products in one place.
  [x] edit my cart if I change my mind:
    [x] change the quantity of a product in my cart.
    [x] remove a product in my cart.
    [x] No one else should be able to edit my cart except me. <- specific to the local storage, when logged in as a user, need to be logged in as that user to access their cart
  [x] __"checkout" the items in my cart so I can purchase my desired goods. - need to make a confirmation page component__
    Think of a typical user experience on popular websites from a guest user and logged-in user perspective.
    You can just start with by simulating the experience of checking out with a simple confirmation page.
  [x] create an account so I can have a logged-in experience.

### As a logged-in customer, I want to be able to:
  [] have a persistent cart so I can revisit and pick up where I left off. (assocations are working, but the data still needs to persist when logged in)
    [] Logged-in-user across multiple devices: I'm logged in on my mobile device and add some items to my cart. When I open the browser on my laptop and log in, I want to see those items in my cart.
    [] No one else should be able to edit my cart except me.

### As an administrator, I want to be able to:
  [x] have validated data to ensure reliability. (may need to edit the model?)git 
    i.e. each customer that creates an account should only be able to do so once with a single email address. (need to have a unique log-in) <- data validation, for models, what requirements would a functional database have? (unique log-in)
    if the data is rejected, there can be a message (tier 2)
  [x] __have full rights to make backend requests to add, edit, and remove products.__ 
    No one else should have access.
  [x] __view user information. (usernames (+ orders))__ 
    No one else should have access.

### As an engineer, I want to:
  [x] have a well-seeded database so that I am able to simulate a number of different scenarios for the user stories below.
    - By doing this, you really set yourselves up to tackle many of the points throughout the tiers. In the long run, this will save you, potentially, tons of time.
    - For example, seed hundreds of products with dummy data so that when you get to the “pagination” user story, you won’t have to worry about adding more products.
    - Likewise, add a bunch of users with products in their carts so editing the cart can be worked on without already having the “add to cart” functionality built out.
  [] user data to be secure so that no one can unrightfully manipulate information. <- no one should be able to edit an other existing user's cart, keeping routes secure, and ensuring the buttons to edit, add, and delete things require admin privileges (authorization -> needs a token for admin)

