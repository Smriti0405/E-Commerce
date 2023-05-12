
const mongoose = require('mongoose');
const Product = require('./models/product');


mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err))


const products = [
    {
        name: 'Iphone14',
        img: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aXBob25lMTR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        price: 1099,
        desc: `Longest battery life ever. A new Main camera and improved image processing let you capture even more sensational shots in all kinds of light. Safety features including emergency SOS via satellite, crash detection call for help when you can't.`
    },
    {
        name: 'Nike Shoes',
        img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8TmlrZSUyMFNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price: 300,
        desc: `Nike Air Max Pulse. Inspired by the energy of London's music scene comes the Air Max Pulse. A tough silhouette infused with an unreal sensation of Air. This season, swap the roses for matching Dunks, and hit the gym with your loved ones.`
    },
    {
        name: 'OnePlus Smart Watch',
        img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        price: 659,
        desc: `Smartwatches can count your steps, distance, calories, heart rate, pulse rate, and sleep; some can even calculate other crucial parameters. It will assist you in meeting your fitness objectives. So, if you're thinking about getting a fitness tracker, a good smartwatch can take its place.`
    },
    {
        name: 'Sunglasses',
        img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VuZ2xhc3Nlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        price: 460,
        desc: `Sunglasses offer 100% UV protection from all UV light. Wearing sunglasses under direct sunlight: Large lenses offer good protection, but broad temple arms are also needed against "stray light" from the sides.`
    },
    {
        name: 'Bonsai',
        img: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Ym9uc2FpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price: 295,
        desc: `Bonsai have ability to draw life energies into a room. As a focus of sight, conversation, and living forces, it can quickly spread joy and contentment to all who see it.`
    },
    {
        name: 'Microwave',
        img: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWljcm93YXZlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price: 800,
        desc: `Microwave ovens are a convenient means to heat food and are generally safe when used correctly. Microwave ovens heat food using microwaves, a form of electromagnetic radiation similar to radio waves.`
    }
];

// async function seedDB(){
    
//     await Product.deleteMany();
//     await Product.insertMany(products);
//     console.log('Product Seeded');
// }

// module.exports = seedDB;

Product.insertMany(products)
    .then(() => {
        console.log('Product Seeded')
    })