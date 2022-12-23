import { Fragment } from "react";
import { FaRss } from "react-icons/fa";
import { RiUserUnfollowLine } from "react-icons/ri";
import { ImSpinner2 } from "react-icons/im";
import useFollow from "../../hooks/useFollow";

const FollowBtn = ({ isCurrentUser, userProfileInfos, withCaption = true }) => {
	const { followFunc, loading } = useFollow();

	const followHandler = async () => {
		!isCurrentUser &&
			userProfileInfos &&
			(await followFunc(userProfileInfos?.userID));
	};

	return (
		<button
			disabled={loading}
			className={`flex items-center gap-x-2 px-4 py-2 rounded-md text-lightWhite  ${
				userProfileInfos?.isFollowed
					? "shadow shadow-darkBlue bg-darkBlue hover:bg-darkBlue/90 disabled:cursor-progress"
					: "shadow shadow-greenBlue bg-greenBlue hover:bg-greenBlue/90 disabled:cursor-progress"
			}`}
			onClick={followHandler}>
			{loading ? (
				<span className="animate-spin">
					<ImSpinner2 />
				</span>
			) : (
				<Fragment>
					<span>
						{userProfileInfos?.isFollowed ? (
							<RiUserUnfollowLine />
						) : (
							<FaRss />
						)}
					</span>
					{withCaption && (
						<span>
							{userProfileInfos?.isFollowed
								? "Unfollow"
								: "Follow"}
						</span>
					)}
				</Fragment>
			)}
		</button>
	);
};

export default FollowBtn;
