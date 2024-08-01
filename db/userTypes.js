const { z } = require("zod");

// Define the Zod schema for the social links with counts
const linkSchema = z.object({
    link: z.string().url(),
    // count: z.number().nonnegative().default(0),
});

// Define the Zod schema for the socials
// const socialsSchema = z.object({
//     linkedin: z.array(linkSchema).optional(),
//     facebook: z.array(linkSchema).optional(),
//     twitter: z.array(linkSchema).optional(),
//     email: z.array(linkSchema).optional(),
//     phone: z.array(linkSchema).optional(),
//     moreLinks: z.array(linkSchema).optional(),
// });

const socialsSchema = z.object({
    linkedin: z.string(),
    facebook: z.string(),
    twitter: z.string(),
    email: z.string(),
    phone: z.string(),
    moreLinks: z.string(),
});

// Define the main user Zod schema
const userParser = z.object({
    // userId: z.string().optional(),
    username: z.string(),
    socials: socialsSchema,
    feedbacks: z.string().optional(),
});

// Define the Zod schema to hold multiple users
const usersParser = z.object({
    users: z.record(userParser),
});

module.exports = {
    userParser,
    usersParser,
};
