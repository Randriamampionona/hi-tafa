import { useRef } from "react";
import Image from "next/legacy/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegEdit } from "react-icons/fa";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import { LoadingImg } from "../common";

const variants = {
	initial: { y: "-6rem", opacity: 0 },
	animate: {
		y: 0,
		opacity: 1,
	},
	exit: { y: "-6rem", opacity: 0 },
};

const TopBar = ({ userProfileInfos, showTopBar }) => {
	const { updateImgFun } = useUpdateProfile();
	const inpRef = useRef(null);

	const pickFileHandler = async (imgType, file) => {
		await updateImgFun(imgType, file);
	};

	return (
		<AnimatePresence mode="wait">
			{showTopBar && (
				<motion.div
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
					className="z-50 fixed left-0 top-0 flex items-center justify-between bg-lightWhite shadow shadow-darkBlue w-full h-14 px-2 md:px-3 lg:px-4 lg:w-[calc(100%-24rem)] lg:ml-96">
					<div className="flex items-center space-x-2">
						<div className="relative w-auto h-auto bg-darkWhite/10">
							<Image
								src={userProfileInfos?.img.profilePicture}
								alt={userProfileInfos?.username}
								placeholder="blur"
								blurDataURL={
									userProfileInfos?.img.profilePicture
								}
								objectFit="cover"
								width={38}
								height={38}
								className="rounded-full hover:brightness-90"
							/>
							<LoadingImg imgType={"profilePicture"} />
						</div>
						<div className="flex flex-col text-start leading-none">
							<h1 className="text-darkBlue text-md font-bold">
								{userProfileInfos?.username}
							</h1>
							<h3 className="font-normal text-sm text-darkBlue/75 cursor-default hover:text-greenBlue">
								{userProfileInfos?.email}
							</h3>
						</div>
					</div>

					<button
						className="flex items-center gap-x-1 px-4 py-2 rounded-md text-lightWhite shadow shadow-darkBlue bg-darkBlue hover:bg-darkBlue/90"
						onClick={() => inpRef?.current.click()}>
						<span>
							<FaRegEdit />
						</span>
						<span>Edit profile</span>
					</button>

					<input
						hidden
						type="file"
						ref={inpRef}
						className="hidden"
						onChange={(e) =>
							pickFileHandler("profilePicture", e.target.files[0])
						}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default TopBar;
