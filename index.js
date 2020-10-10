const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({
    keys: ['ahjgfjhgl5345kaj31']
}));
app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);

app.listen(3000,() => {
    console.log('listening');
});


//BODY PARSER
// const bodyParser = (req, res, next) => {
//     if(req.method === 'POST'){
//         req.on('data', (data) => {
//             const parsed = data.toString('utf8').split('&');
//             const formData = {};
//             parsed.forEach(pair => {
//                 const [key, value] = pair.split('=');
//                 formData[key] = value;
//             });
//             req.body = formData;
//             next();
//         });
//     }else {
//         next();
//     }
// };
