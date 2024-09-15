import { NextRequest, NextResponse } from "next/server";
import { userModelMongo } from "@/db/userModel";

export async function POST(req: NextRequest) {

    const requestBody = await req.json();
    console.log("START OF MESSAGE");
    console.log(requestBody);
    console.log("END OF MESSAGE");

    if(requestBody.type === "all"){
        console.log("ALL");

        const existingUser = await userModelMongo.find({});
        for (let user of existingUser) {
            for( let feedback of user.feedbacks){
                console.log(feedback);
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
