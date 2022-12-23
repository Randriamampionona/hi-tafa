import { Post } from "../common";

const Posts = ({ userProfileInfos, isCurrentUser }) => {
	return (
		<div className="grid grid-cols-3 gap-2 mx-auto mt-80 sm:mt-80 md:mt-44 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
			{Array(4)
				.fill("/assets/picture.jpg")
				.map((post, i) => (
					<Post key={i} post={post} />
				))}
		</div>
	);
};

export default Posts;
