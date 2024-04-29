const Cart = require('../models/cartModel');
exports.getCart = async (req, res) => {
    try {
        console.log(req.body)
        const cart = await Cart.find({user:req.body.user});
        console.log("cart ",cart)
        return res.json({ status: 'ok', info: cart })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
      }
}
exports.addToCart = async(req,res) =>{
    try {
        console.log(req.body)
        const cart = await Cart.findOne({ user: req.body.user });
        console.log(cart&&cart.products.length)
        if (cart) {
            cart.products.push(req.body.product);
            await cart.save();
            res.status(200).json({ status: "ok", infoMsg: "Product added to cart" });
        } else {
            const newCart = new Cart({ user: req.body.user, products: [req.body.product] });
            await newCart.save();
            res.status(201).json({ status: "ok", infoMsg: "Cart created and added" });
        }
    } catch (error) {
        console.log(error)
        res.status(501).json({status:"no",infoMsg:"Product not added to cart"})
    }
}
exports.removeFromCart = async(req,res) =>{
    try {
        console.log(req.body.data.user)
        const cart = await Cart.findOne({ user: req.body.data.user });
        if (cart) {
            const index = cart.products.findIndex(product => product.id === req.body.data.productId);
            if (index !== -1) {
                cart.products.splice(index, 1);
                await cart.save();
                res.status(200).json({ status: "ok", infoMsg: "Product removed from cart" });
            } else {
                res.status(404).json({ status: "no", infoMsg: "Product not found in cart" });
            }
        } else {
            res.status(404).json({ status: "no", infoMsg: "Cart not found" });
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}