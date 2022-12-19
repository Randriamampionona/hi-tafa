import Image from "next/legacy/image";
import { Sidebar } from "../../components/Sidebar";
import { FaCamera, FaRegEdit } from "react-icons/fa";
import { Post } from "../../components/common";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import nookies from "nookies";
import admin from "./../../lib/firebaseAdmin.config";

const variants = {
	initial: { y: "-6rem", opacity: 0 },
	animate: {
		y: 0,
		opacity: 1,
	},
	exit: { y: "-6rem", opacity: 0 },
};

const UserProfilePage = ({ user }) => {
	const [showProfileBar, SetShowProfileBar] = useState(false);

	useEffect(() => {
		window?.addEventListener("scroll", () => {
			window.scrollY >= 440
				? SetShowProfileBar(true)
				: SetShowProfileBar(false);
		});
	}, []);

	console.log(user);

	return (
		<main className="relative flex w-full min-h-screen overflow-x-hidden">
			<section className="fixed top-0 w-auto h-auto max-h-screen hidden lg:block">
				<Sidebar />
			</section>

			<section className="relative flex-grow flex-shrink w-full p-2 ml-0 md:p-3 lg:w-[calc(100%-24rem)] lg:ml-96 lg:p-4">
				{/* profile block */}
				<div className="relative flex items-center justify-between w-full">
					{/* cover picture */}
					<div className="relative w-full h-[13.5rem] rounded overflow-hidden after:z-10 after:absolute after:bottom-0 after:w-full after:h-28 after:bg-gradient-to-b after:from-transparent after:to-darkBlue sm:h-[15.5rem] md:h-[18.5rem]">
						<Image
							src="/assets/picture.jpg"
							alt="picture.jpg"
							layout="fill"
							objectFit="cover"
						/>
						<button className="z-30 absolute bottom-4 right-4 flex items-center gap-x-1 p-2 rounded-md bg-lightWhite text-darkBlue hover:bg-lightWhite/90">
							<span>
								<FaCamera />
							</span>
							<span className="hidden sm:block">
								Edit cover photo
							</span>
						</button>
					</div>

					<div className="z-20 absolute left-0 bottom-[-16.5rem] flex flex-col items-center justify-center w-full px-4 md:flex-row md:items-end md:justify-between md:bottom-[-7rem]">
						{/* profile */}
						<div className="order-1 flex flex-col items-center justify-center space-y-4 space-x-0 md:flex-row md:items-end md:justify-start md:space-y-0 md:space-x-4">
							<figure className="relative w-36 h-36 rounded-full border-4 border-greenBlue">
								<Image
									src="/assets/profile/SHIN YU.png"
									alt="/assets/profile/SHIN YU.png"
									layout="fill"
									objectFit="cover"
									className="w-full h-full !rounded-full hover:brightness-90"
								/>
								<button className="z-10 absolute bottom-[7px] right-[3px] p-2 rounded-full shadow shadow-darkBlue bg-darkBlue text-lightWhite hover:bg-darkBlue/90">
									<span>
										<FaCamera />
									</span>
								</button>
							</figure>

							<div className="flex flex-col text-center leading-none !mb-6 md:text-start">
								<h1 className="text-darkBlue text-2xl font-bold">
									@Shin Yu
								</h1>
								<h3 className="font-normal text-base text-darkBlue/75 cursor-default hover:text-greenBlue">
									email
								</h3>
							</div>
						</div>

						{/* counts */}
						<div className="order-3 flex-grow flex-shrink flex items-center justify-evenly gap-x-8 md:gap-x-0 md:order-2 md:mb-6">
							<div className="flex flex-col items-center justify-center text-center md:space-x-2 md:flex-row">
								<span className="text-darkBlue text-lg font-medium">
									0
								</span>
								<span className="text-sm text-darkBlue/50">
									Chats
								</span>
							</div>
							<div className="flex flex-col items-center justify-center text-center md:space-x-2 md:flex-row">
								<span className="text-darkBlue text-lg font-medium">
									0
								</span>
								<span className="text-sm text-darkBlue/50">
									Followers
								</span>
							</div>
							<div className="flex flex-col items-center justify-center text-center md:space-x-2 md:flex-row">
								<span className="text-darkBlue text-lg font-medium">
									0
								</span>
								<span className="text-sm text-darkBlue/50">
									Likes
								</span>
							</div>
						</div>

						{/* btns */}
						<div className="order-2 mb-3 md:order-3 md:mb-6">
							<button className=" flex items-center gap-x-1 px-4 py-2 rounded-md text-lightWhite shadow shadow-darkBlue bg-darkBlue hover:bg-darkBlue/90">
								<span>
									<FaRegEdit />
								</span>
								<span>Edit profile</span>
							</button>
						</div>
					</div>
				</div>

				{/* profile bar */}
				<AnimatePresence mode="wait">
					{showProfileBar && (
						<motion.div
							variants={variants}
							initial="initial"
							animate="animate"
							exit="exit"
							className="z-50 fixed left-0 top-0 flex items-center justify-between bg-lightWhite shadow shadow-darkBlue w-full h-14 px-2 md:px-3 lg:px-4 lg:w-[calc(100%-24rem)] lg:ml-96">
							<div className="flex items-center space-x-2">
								<Image
									src="/assets/profile/SHIN YU.png"
									alt="/assets/profile/SHIN YU.png"
									placeholder="blur"
									blurDataURL="/assets/picture.jpg"
									objectFit="cover"
									width={38}
									height={38}
									className="rounded-full hover:brightness-90"
								/>
								<div className="flex flex-col text-start leading-none">
									<h1 className="text-darkBlue text-md font-bold">
										@Shin Yu
									</h1>
									<h3 className="font-normal text-sm text-darkBlue/75 cursor-default hover:text-greenBlue">
										{email}
									</h3>
								</div>
							</div>

							<button className="flex items-center gap-x-1 px-4 py-2 rounded-md text-lightWhite shadow shadow-darkBlue bg-darkBlue hover:bg-darkBlue/90">
								<span>
									<FaRegEdit />
								</span>
								<span>Edit profile</span>
							</button>
						</motion.div>
					)}
				</AnimatePresence>

				{/* photos (posts) */}
				<div className="grid grid-cols-3 gap-2 mx-auto mt-80 sm:mt-80 md:mt-44 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
					{Array(12)
						.fill("/assets/picture.jpg")
						.map((post, i) => (
							<Post key={i} post={post} />
						))}
				</div>
			</section>
		</main>
	);
};

export default UserProfilePage;

export const getServerSideProps = async (ctx) => {
	try {
		const cookies = nookies.get(ctx);
		const token = await admin.auth().verifyIdToken(cookies.user_token);

		if (token) {
			const { userID } = ctx.query;

			const docRef = admin.firestore().collection("users").doc(userID);
			const doc = await docRef.get();

			return {
				props: {
					user: {
						...doc.data(),
					},
				},
			};
		}
	} catch (error) {
		return { props: {} };
	}
};
