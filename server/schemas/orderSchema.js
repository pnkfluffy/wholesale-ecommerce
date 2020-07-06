const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "product"
    },
    shipment_address: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    }
})