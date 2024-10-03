import { NextRequest, NextResponse } from "next/server";
import { userParser } from "@/db/userTypes"; // Adjust this import path
import { userModelMongo } from "@/db/userModel"; // Adjust this import path

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { success, error } = userParser.safeParse(body);

        if (!success) {
            return NextResponse.json(
                { message: "Please check your inputs. Refer to the docs for input guidelines." },
                { status: 411 }
            );
        }

        const username = body.username;
        const userId = username.replace(/\s/g, "") + Math.floor(Math.random() * 100000);
        const socials: Record<string, Array<{ link: string; count: number }>> = {};

        // Validate that at least one social link is provided
        let hasAtLeastOneSocial = false;
        for (const key in body.socials) {
            if (body.socials[key]) {
                socials[key] = [{ link: body.socials[key], count: 1 }];
                hasAtLeastOneSocial = true;
            }
        }

        if (!hasAtLeastOneSocial) {
            return NextResponse.json(
                { message: "At least one social link must be provided." },
                { status: 400 }
            );
        }

        const feedback = [body.feedback];

        // Check if any social handle matches an existing record
        const socialKeys = Object.keys(body.socials);
        let existingUser = null;

        for (const key of socialKeys) {
            const searchCriteria = {
                [`socials.${key}.link`]: body.socials[key],
            };

            existingUser = await userModelMongo.findOne(searchCriteria);

            if (existingUser) break;
        }

        if (existingUser) {
            // Update existing user record
            for (const key in body.socials) {
                const socialLink = body.socials[key];
                if (!socialLink) continue; // Skip empty social links

                const socialRecord = existingUser.socials[key].find(
                    (s: any) => s.link === socialLink
                );

                if (socialRecord) {
                    socialRecord.count += 1;
                } else {
                    existingUser.socials[key].push({
                        link: socialLink,
                        count: 1,
                    });
                }
            }

            existingUser.feedbacks.push(body.feedback);
            existingUser.username = username;

            await existingUser.save();

            return NextResponse.json(
                { message: "User updated successfully", user: existingUser },
                { status: 200 }
            );
        } else {
            // Create a new user record
            const newUser = await userModelMongo.create({
                userId: userId,
                username: username,
                socials: socials,
                feedbacks: feedback,
            });

            return NextResponse.json(
                { message: "User created successfully", user: newUser },
                { status: 201 }
            );
        }
    } catch (error) {
        console.error("Exception at createReview:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
