const mongoose = require('../db/conn')

const { Schema } = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        bio: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        nation: { //estado
            type: String,
            required: true
        },
        interest: { //interesse da pessoa no sexo...
            type: String
        },
        delivered: {
            type: Array
        },
        received: {
            type: Array
        }
        /*
        User.match = [{id:1d2xg, name:"Bia",phone:123456},{id:w1s5, name:"Flávia",phone:178945},]
        array de tamanho 2
        */
    }, { timestamps: true })
)

module.exports = User