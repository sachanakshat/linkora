"use client";

import axios, { Axios, AxiosResponse } from "axios";
import { UserFeedback } from "@/app/api/v1/getReviews/route";
import FeedbackCard from "./FeedbackCard";
import { useEffect, useState } from "react";

export default function AllFeedbacks() {
    // let recentFeedbacks = axios.get(
    //     "http://localhost:3000/api/v1/getReviews/all"
    // );
    // console.log(recentFeedbacks);

    // const axios = require("axios");
    // Add type safety here

    const [fetchedData, setData] = useState<UserFeedback[]>([]);

    

    // let config = {
    //     method: "post",
    //     maxBodyLength: Infinity,
    //     url: "http://localhost:3000/api/v1/getReviews",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     data: data,
    // };

    // let respose: any = [];

    // axios
    //     .request(config)
    //     .then((response: AxiosResponse<UserFeedback[]>) => {
    //         // data = JSON.stringify(response.data);
    //         data = response.data;
    //         console.log(data);


    //         return (
    //             <>
    //                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
    //                     Recent Feedbacks
    //                     {data.data.map(
    //                         (username: string, userId: string, feedback: string) => (
    //                             <FeedbackCard
    //                                 key={userId}
    //                                 userId={userId}
    //                                 username={username}
    //                                 feedback={feedback}
    //                             />
    //                         )
    //                     )}
    //                 </h1>
    //             </>
    //         );



    //     })
    //     .catch((error: any) => {
    //         console.log(error);
    //     });

    useEffect(() => {
        let data: any = JSON.stringify({
            type: "all",
        });
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
            .then((response: AxiosResponse<UserFeedback[]>) => {
                // data = JSON.stringify(response.data);
                data = response.data;
                setData(data.data);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, []);

    console.log(fetchedData);

    return (
        <>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Recent Feedbacks
            </h1>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-hidden">
            {fetchedData.map(
                            (item: UserFeedback) => (
                                <FeedbackCard
                                    key={Math.random()}
                                    userId={item.userId}
                                    username={item.username}
                                    feedback={item.feedback}
                                />
                            )
                        )}
            </div>
            
        </>
    );
}
