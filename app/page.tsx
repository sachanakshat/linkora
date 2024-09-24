import Login from "./login/page"
import SignupPage from "./signup/page"
import CreateReview from "./createReview/page"
import LandingComponent from "@/components/LandingComponent";
import FeedbackCard from "@/components/FeedbackCard";
import AllFeedbacks from "@/components/AllFeedbacks";

export default function Home() {
  return (
    // <Login/>
    // <LandingComponent/>
    // <SignupPage/>
    // <CreateReview/>
    // <FeedbackCard userId="sachanakshat" username="Akshat Sachan" feedback="Hello World"/>
    <AllFeedbacks/>
  );
}
