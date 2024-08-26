import { NextRequest, NextResponse } from "next/server";
import { signupModelMongo } from "@/db/signupsModel";
import { signinParser } from "@/db/signupsTypes";
// import { JWT_SECRET } from "@/config/index";
// import "@/config/envConfig";
import jwt from "jsonwebtoken";
import { any } from "zod";

export async function POST(req: NextRequest) {
    const unparsedBody = await req.json();

    console.log("Type of request body= ", typeof unparsedBody);
    console.log(unparsedBody);

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error(
            "JWT_SECRET is not defined in the environment variables."
        );
    }

    // const createPayload = req.body;
    const parsedPayload = signinParser.safeParse(unparsedBody);
    if (!parsedPayload.success) {
        return NextResponse.json(
            {
                message: "Please provide inputs in correct format",
            },
            {
                status: 411,
            }
        );
    }

    try {
        const user = await signupModelMongo.findOne({
            email: unparsedBody.email,
            password: unparsedBody.password,
        });

        if (user) {
            const token = jwt.sign(
                {
                    userId: user._id,
                },
                secret
            );

            return NextResponse.json(
                {
                    status: "Signin Success",
                    email: unparsedBody.email,
                    token: token,
                },
                {
                    status: 200,
                }
            );
        }

        return NextResponse.json(
            {
                status: "Failed",
                message: "User not found!",
            },
            {
                status: 411,
            }
        );
    } catch (error: any) {
        if (error.code === 11000) {
            // Handle duplicate key error
            return NextResponse.json(
                {
                    message: "Email already exists",
                },
                {
                    status: 400,
                }
            );
        } else if (error.name === "ValidationError") {
            // Handle Mongoose validation error
            return NextResponse.json(
                {
                    message: error.errors.email.message || "Validation error",
                },
                {
                    status: 400,
                }
            );
        } else {
            return NextResponse.json(
                {
                    message:
                        "Something is wrong at our servers, please try after sometime",
                },
                {
                    status: 400,
                }
            );
        }
    }

    //     try {
    //       const user = await signupModelMongo.findOne({
    //           email: unparsedBody.email,
    //           password: unparsedBody.password,
    //       });

    //       if (user) {
    //           const token = jwt.sign(
    //               {
    //                   userId: user._id,
    //               },
    //               JWT_SECRET
    //           );

    //           res.status(200).json({
    //               status: "Signin Success",
    //               email: req.body.email,
    //               token: token,
    //           });
    //           return;
    //       }

    //       res.status(411).json({
    //           status: "Failed",
    //           message: "User not found!",
    //       });
    //   } catch (error) {
    //       if (error.code === 11000) {
    //           // Handle duplicate key error
    //           return res.status(400).json({
    //               message: "Email already exists",
    //           });
    //       } else if (error.name === "ValidationError") {
    //           // Handle Mongoose validation error
    //           return res.status(400).json({
    //               message: error.errors.email.message || "Validation error",
    //           });
    //       } else {
    //           console.log(error);
    //           return res.status(400).json({
    //               message:
    //                   "Something is wrong at our servers, please try after sometime",
    //           });
    //       }
    //   }

    await signupModelMongo.create({
        email: unparsedBody.email,
        password: unparsedBody.password,
    });

    return NextResponse.json({
        msg: "User created",
        email: unparsedBody.email,
    });
}
