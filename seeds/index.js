const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/Campping');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: '65f1be0aff211c864b231f12',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, officiis. Perferendis asperiores repudiandae maiores iure harum, corrupti totam facere quam! Voluptatibus maiores animi quas facere accusantium veniam reprehenderit eius alias.',
      price,
      geometry: {
        type: "Point",
        coordinates: [-113.1331, 47.0202]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/du6lfsvsz/image/upload/v1710938297/YelpCamp/afpuaxudhwbnw79iwsot.jpg',
          filename: 'YelpCamp/afpuaxudhwbnw79iwsot'
        },
        {
          url: 'https://res.cloudinary.com/du6lfsvsz/image/upload/v1710938297/YelpCamp/ur8zzwjg8r19cspkulhw.jpg',
          filename: 'YelpCamp/ur8zzwjg8r19cspkulhw'

        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})