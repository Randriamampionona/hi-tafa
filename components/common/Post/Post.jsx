import Image from "next/legacy/image";
import { useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

const Post = ({ post }) => {
	const [like, setLike] = useState(false);

	const likeHandler = () => {
		setLike((prev) => !prev);
	};

	return (
		<div className="group relative rounded w-full h-44 overflow-hidden hover:shadow shadow-darkBlue sm:h-48 md:h-48 lg:h-60">
			<Image
				src={post}
				alt={post}
				layout="fill"
				className="hover:scale-105 hover:contrast-75"
			/>

			<button
				className="absolute top-2 right-2 bg-transparent text-lg text-rose-600 hidden group-hover:block"
				onClick={likeHandler}>
				{like ? (
					<span className="drop-shadow">
						<RiHeartFill />
					</span>
				) : (
					<span className="drop-shadow">
						<RiHeartLine />
					</span>
				)}
			</button>
		</div>
	);
};

export default Post;
