import { NextRequest, NextResponse } from "next/server";
import { signupModelMongo } from "@/db/models";
import { signupParser } from "@/db/types";

export async function POST(req: NextRequest) {
  const unparsedBody = await req.json();

  // const createPayload = req.body;
  const parsedPayload = signupParser.safeParse(unparsedBody);
  if (!parsedPayload.success) {
    return NextResponse.json(
      {
        message: "Error in parsing the inputs",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await signupModelMongo.create({
      email: unparsedBody.email,
      password: unparsedBody.password,
    });
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

  await signupModelMongo.create({
    email: unparsedBody.email,
    password: unparsedBody.password,
  });

  return NextResponse.json({
    msg: "User created",
    email: unparsedBody.email,
  });
}
