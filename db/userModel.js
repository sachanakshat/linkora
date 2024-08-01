const mongoose = require("mongoose");

// Load environment variables from .env file
require("dotenv").config();

// Access environment variables
// const databaseUrl = process.env.MONGO_URL;
const { DATABASE_URL } = require("../config");

mongoose.connect(DATABASE_URL);

const Schema = mongoose.Schema;

// Define the schema for the social links with counts
const linkSchema = new Schema(
    {
        link: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            default: 0,
        },
    },
    { _id: false }
);

// Define the schema for the socials
const socialsSchema = new Schema(
    {
        linkedin: [linkSchema],
        facebook: [linkSchema],
        twitter: [linkSchema],
        email: [linkSchema],
        phone: [linkSchema],
        moreLinks: [linkSchema],
    },
    { _id: false }
);

// Define the main user schema
const userSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
        },
        socials: socialsSchema,
        feedbacks: [
            {
                type: String,
            },
        ],
    }
);

// Define the schema to hold multiple users
const usersSchema = new Schema({
    users: {
        type: Map,
        of: userSchema,
    },
});

const Users = mongoose.model("Users", userSchema);

module.exports = {
    userModelMongo: Users,
};
