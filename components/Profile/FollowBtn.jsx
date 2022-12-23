import { Fragment } from "react";
import { FaRss } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import useFollow from "../../hooks/useFollow";

const FollowBtn = ({ isCurrentUser, userProfileInfos }) => {
	const { followFunc, loading } = useFollow();

	const followHandler = async () => {
		!isCurrentUser &&
			userProfileInfos &&
			(await followFunc(userProfileInfos?.userID));
	};

	return (
		<button
			disabled={loading}
			className={`flex items-center gap-x-1 px-4 py-2 rounded-md text-lightWhite  ${
				userProfileInfos?.isFollowed
					? "shadow shadow-darkWhite bg-darkWhite hover:bg-darkWhite/90 disabled:cursor-progress"
					: "shadow shadow-darkBlue bg-darkBlue hover:bg-darkBlue/90 disabled:cursor-progress"
			}`}
			onClick={followHandler}>
			{loading ? (
				<span className="animate-spin">
					<ImSpinner2 />
				</span>
			) : (
				<Fragment>
					<span>
						<FaRss />
					</span>
					{
						<span>
							{userProfileInfos?.isFollowed
								? "Unfollow"
								: "Follow"}
						</span>
					}
				</Fragment>
			)}
		</button>
	);
};

export default FollowBtn;
