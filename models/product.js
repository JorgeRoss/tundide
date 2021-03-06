let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProductSchema = mongoose.Schema({
    id: { type: Schema.Types.ObjectId },
    barCode: Number
});

/**
 * Mongoose model for Product.
 *
 * @class Product
 * @memberof module:AppointmentCenter
 * @property {ObjectId}              id                            - Id of ticket
 * @property {Number}                barCode                       - The bar codeof the product
 */
module.exports = mongoose.model('Product', ProductSchema);