# Microservice - URL Link Shortener

This microservice was built to provide shorter URL links if provided a valid URL. For example, the url should look like 'https://reactjs.org/docs/hooks-custom.html'. While this is good for image urls that are rather long but also great when using Next JS to provide 1 domain to whitelist for all your images.

## Description of Setup:
#### 1. Next.js + Tailwind CSS Example
This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

#### 2. Connect to MongoDB with Mongoose
This service uses MongoDB Atlas for the database. You can setup a free account at [MongoDB](https://www.mongodb.com/). Once you have setup your free account, make sure that you copy your MongoDB connection string over to the `.env.local` file. [Mongoose](https://mongoosejs.com/docs/index.html) will need that to connect your Next JS app to MongoDB.

#### 3. For the Frontend (Optional)
To handle the Original URL submissions, I opted for the following packages:
- [React Hook Form](https://react-hook-form.com/) to manage the form state.
- [React-Query](https://tanstack.com/query/v4) to interact with the API through mutations 'POST' requests using the [Fetch API](https://fetch.spec.whatwg.org/)
- [Validator](https://github.com/validatorjs/validator.js) used to verify that the URL submitted in the form is valid

#### 4. For the API Route
- [nanoid](https://github.com/ai/nanoid) used to generate a short url for the Original URL.
- POST Route `/api/shorturl` creates a short url and saves the following information to MongoDB
  ```
  short_url: newShortURL,
  original_url: requestedURL,
  suffix: newShortURL,
  ```
- GET Route `/api/shorturl[slug]` is a dynamic route to handle retrieving the Original URL from MongoDB by the short url provided in the query params. Then it sends a `res.redirect(urlRedirect.original_url)` back to the client.

#### 5. To Shorten Your Link Even More
In the `next.config.js` file, you will see that we are rewriting the API route.
```
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/api/shorturl/:slug"
      }
    ]
  },
  env: {
    DEV_URL: process.env.DEV_URL,
    PROD_URL: process.env.PROD_URL,
  }
}
```
By doing this after a user requests a Short Link, they will be able to navigate to that Short Link by going to `http://localhost:3000/O6mSp` versus `http://localhost:3000/api/shorturl/O6mSp`

## Getting Setup:
#### 1. Get the source code
You need to clone the main branch of then navigate to the project folder.
```
git clone https://github.com/crisner1978/myurl-shortener.git
```
#### 2. Install dependencies
You will need to install the dependencies listed in the package.json
```
npm install
```
or
```
yarn install
```
#### 3. Setup Account with MongoDB
Go here [MongoDB](https://www.mongodb.com/) to set up a account.
#### 4. Set Environment Variables
You'll need to set your MONGODB_URI in the environment variable file so your project runs correctly. Rename `.example.env` file to `.env.local` and place your MONGODB_URI there. Be sure to remove the '#' sign prepending the variable names.
```
MONGODB_URI=
DEV_URL=http://localhost:3000/
PROD_URL=
```
#### 5. Run The App
To start the app 
```
npm start
```
or
```
yarn start
```