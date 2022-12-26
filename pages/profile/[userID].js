import { Sidebar } from "../../components/Sidebar";
import { Fragment, useCallback, useEffect, useState } from "react";
import nookies from "nookies";
import admin from "./../../lib/firebaseAdmin.config";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../../lib/firebase.config";
import { Posts, ProfileBlock, TopBar } from "../../components/Profile";
import { AuthContext } from "../../store/context/AuthContext";
import { MetaHead } from "../../components/common";

const UserProfilePage = ({
	profileID,
	isCurrentUser,
	SSR__userProfileInfos,
}) => {
	const { currentUser } = AuthContext();
	const [showTopBar, SetTopBar] = useState(false);
	const [client__userProfileInfos, SetClient__UserProfileInfos] =
		useState(null);

	// toogle top bar on scroll
	useEffect(() => {
		window?.addEventListener("scroll", () => {
			window.scrollY >= 440 ? SetTopBar(true) : SetTopBar(false);
		});
	}, []);

	// get profile/followers snapshot
	useEffect(() => {
		const getProfile = () => {
			const docRef = doc(db, "users", profileID);
			const collectionRef = collection(
				db,
				"users",
				profileID,
				"followers"
			);

			const unsub1 = onSnapshot(docRef, (snapshot) => {
				if (snapshot.exists()) {
					SetClient__UserProfileInfos((prev) => ({
						...prev,
						...snapshot.data(),
					}));
				}
			});

			const unsub2 = onSnapshot(collectionRef, (snapshot) => {
				if (snapshot.docs.map((doc) => doc.exists())) {
					const followers = snapshot.docs.map((doc) =>
						doc.exists() ? doc.data() : []
					);

					SetClient__UserProfileInfos((prev) => ({
						...prev,
						followers,
						isFollowed:
							followers.findIndex(
								(f) => f.userID === currentUser.uid
							) !== -1,
					}));
				}
			});

			return () => {
				unsub1();
				SetClient__UserProfileInfos && unsub2();
			};
		};
		currentUser && profileID && getProfile();
	}, [currentUser, profileID]);

	// swich between SSR inito CLIENT
	const getUserProfileInfos = useCallback(() => {
		if (client__userProfileInfos) return client__userProfileInfos;

		return JSON.parse(SSR__userProfileInfos);
	}, [SSR__userProfileInfos, client__userProfileInfos]);

	return (
		<Fragment>
			<MetaHead subTitle={getUserProfileInfos()?.username} />

			<main className="relative flex w-full min-h-screen overflow-x-hidden">
				<section className="fixed top-0 w-auto h-auto max-h-screen hidden lg:block">
					<Sidebar />
				</section>

				<section className="relative flex-grow flex-shrink w-full p-2 ml-0 md:p-3 lg:w-[calc(100%-24rem)] lg:ml-96 lg:p-4">
					{/* profile block */}
					<ProfileBlock
						isCurrentUser={isCurrentUser}
						userProfileInfos={getUserProfileInfos?.()}
					/>

					{/* top bar */}
					<TopBar
						isCurrentUser={isCurrentUser}
						userProfileInfos={getUserProfileInfos?.()}
						showTopBar={showTopBar}
					/>

					{/* photos (posts) */}
					<Posts
						isCurrentUser={isCurrentUser}
						userProfileInfos={getUserProfileInfos?.()}
					/>
				</section>
			</main>
		</Fragment>
	);
};

export default UserProfilePage;

export const getServerSideProps = async (ctx) => {
	try {
		const cookies = nookies.get(ctx);
		const token = await admin
			.auth()
			.verifyIdToken(cookies[process.env.NEXT_PUBLIC_TOKEN_NAME]);

		if (token) {
			const userID = ctx.query.userID;

			const docRef = doc(db, "users", userID);
			const collectionRef = collection(db, "users", userID, "followers");

			const userDoc = await getDoc(docRef);
			const followersDoc = await getDocs(collectionRef);

			const followers = followersDoc.docs.map((doc) =>
				doc.exists() ? doc.data() : []
			);

			if (userDoc.exists()) {
				return {
					props: {
						profileID: userID,
						isCurrentUser: userID === token.uid,
						SSR__userProfileInfos: JSON.stringify({
							...userDoc.data(),
							followers,
							isFollowed:
								followers.findIndex(
									(f) => f.userID === token.uid
								) !== -1,
						}),
					},
				};
			}

			return {
				props: {
					profileID: userID,
					SSR__userProfileInfos: null,
				},
			};
		}
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
