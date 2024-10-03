"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa'; // Importing icons from react-icons
import { Dropdown } from "@/components/ui/dropdown"; // Assuming you have a Dropdown component

// Define the interface for UserFeedback and SocialLink
export interface SocialLink {
    link: string;
    count: number;
}

export interface UserFeedback {
    userId: string;
    username: string;
    feedback: string;
    socials?: {
        linkedin?: SocialLink[];
        twitter?: SocialLink[];
        email?: SocialLink[];
        phone?: SocialLink[];
        facebook?: SocialLink[];
    };
}

export default function ListAllUsersComponent() {
    const [fetchedData, setData] = useState<UserFeedback[]>([]);

    // Fetch data from the API
    useEffect(() => {
        let data = JSON.stringify({ type: "all" });
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:3000/api/v1/getReviews",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response: AxiosResponse<{ data: UserFeedback[] }>) => {
                setData(response.data.data); // Set the fetched data
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, []);

    // Helper function to display social links with icons
    const renderSocialLinks = (socials: UserFeedback["socials"]) => {
        if (!socials) return null;

        const getHighestCountLink = (links: SocialLink[]) => {
            return links.reduce((prev, current) => (prev.count > current.count ? prev : current), links[0]);
        };

        // Collect all links in a single dropdown
        const allLinks: SocialLink[] = [];

        const highestLinks = {
            linkedin: socials.linkedin ? getHighestCountLink(socials.linkedin) : null,
            twitter: socials.twitter ? getHighestCountLink(socials.twitter) : null,
            email: socials.email ? getHighestCountLink(socials.email) : null,
            phone: socials.phone ? getHighestCountLink(socials.phone) : null,
            facebook: socials.facebook ? getHighestCountLink(socials.facebook) : null,
        };

        // Push highest links to the dropdown
        Object.values(highestLinks).forEach(link => {
            if (link) {
                allLinks.push(link);
            }
        });

        // Collect remaining links for the dropdown
        Object.entries(socials).forEach(([key, links]) => {
            if (Array.isArray(links)) {
                const highestLink = getHighestCountLink(links);
                const otherLinks = links.filter(link => link.link !== highestLink.link);
                allLinks.push(...otherLinks);
            }
        });

        return (
            <div className="flex flex-col">
                {Object.values(highestLinks).map((link, index) =>
                    link ? (
                        <a key={index} href={link.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline mb-1">
                            {link.link}
                        </a>
                    ) : null
                )}
                {allLinks.length > 0 && (
                    <Dropdown links={allLinks} />
                )}
            </div>
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Feedbacks</CardTitle>
                <CardDescription>
                    View feedback and social profiles of users.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Feedback</TableHead>
                            <TableHead>Social Links</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fetchedData.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{user.username}</TableCell>
                                <TableCell>{user.feedback}</TableCell>
                                <TableCell>{renderSocialLinks(user.socials)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>{fetchedData.length}</strong> users
                </div>
            </CardFooter>
        </Card>
    );
}
