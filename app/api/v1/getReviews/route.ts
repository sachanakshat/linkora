import { NextRequest, NextResponse } from "next/server";
import { userModelMongo } from "@/db/userModel";

export interface UserFeedback {
    userId: string;
    username: string;
    feedback: string;
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

export async function POST(req: NextRequest) {
    const requestBody = await req.json();
    // console.log("START OF MESSAGE");
    // console.log(requestBody);
    // console.log("END OF MESSAGE");

    if (requestBody.type === "all") {

        let feedbacks = [];

        const existingUser = await userModelMongo.find({});
        for (let user of existingUser) {
            let u: Partial<UserFeedback> = {};
            u.username = user.username;
            u.userId = user.userId;
            // console.log(user);
            for (let feedback of user.feedbacks) {
                // console.log(feedback);
                u.feedback = feedback;
                feedbacks.push(u);
            }
            // console.log(user.feedbacks);
        }
        // console.log(existingUser.feedbacks);

        // userModelMongo.find({}).then((users:any) => {
        //     console.log(users.feedbacks);
        // });

        return NextResponse.json(
            {
                message: "Recieved all in response",
                data: feedbacks,
            },
            {
                status: 200,
            }
        );
    }

    return NextResponse.json(
        {
            message: "Recieved something else",
        },
        {
            status: 200,
        }
    );
}
