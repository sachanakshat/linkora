import { NextRequest, NextResponse } from "next/server";
import { userModelMongo } from "@/db/userModel";

export interface UserFeedback {
    userId: string;
    username: string;
    feedback: string;
    socials?: {
        linkedin?: SocialLink[];
        twitter?: SocialLink[];
        email?: SocialLink[];
        phone?: SocialLink[];
        moreLinks?: SocialLink[];
        facebook?: SocialLink[];
    };
}

interface SocialLink {
    link: string;
    count: number;
}

interface User {
    userId: string;
    username: string;
    socials: {
        linkedin?: SocialLink[];
        twitter?: SocialLink[];
        email?: SocialLink[];
        phone?: SocialLink[];
        moreLinks?: SocialLink[];
        facebook?: SocialLink[];
    };
    feedbacks: string[];
}

// Adding CORS headers to the response
const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(req: NextRequest) {
    const requestBody = await req.json();

    if (requestBody.type === "all") {
        let feedbacks: UserFeedback[] = [];

        // Fetch all users
        const existingUsers = await userModelMongo.find({});

        // Process each user
        for (let user of existingUsers) {
            for (let feedback of user.feedbacks) {
                // Create an object for each feedback with the user's social links
                feedbacks.push({
                    username: user.username,
                    userId: user.userId,
                    feedback: feedback,
                    socials: user.socials, // Include social links
                });
            }
        }

        // Return the response with feedbacks and social links
        return NextResponse.json(
            {
                message: "Received all in response",
                data: feedbacks,
            },
            {
                status: 200,
                headers: corsHeaders, // Add CORS headers
            }
        );
    }

    return NextResponse.json(
        {
            message: "Received something else",
        },
        {
            status: 200,
            headers: corsHeaders, // Add CORS headers
        }
    );
}

// Handle the OPTIONS request for CORS preflight
export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}
