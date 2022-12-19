import { Sidebar } from "../../components/Sidebar";
import { useCallback, useEffect, useState } from "react";
import nookies from "nookies";
import admin from "./../../lib/firebaseAdmin.config";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase.config";
import { Posts, ProfileBlock, TopBar } from "../../components/Profile";

const UserProfilePage = ({ profileID, SSR__userProfileInfos }) => {
	const [showTopBar, SetTopBar] = useState(false);
	const [client__userProfileInfos, SetClient__UserProfileInfos] =
		useState(null);

	// toogle top bar on scroll
	useEffect(() => {
		window?.addEventListener("scroll", () => {
			window.scrollY >= 440 ? SetTopBar(true) : SetTopBar(false);
		});
	}, []);

	// get profile snapshot
	useEffect(() => {
		const getProfile = () => {
			const docRef = doc(db, "users", profileID);
			const unsub = onSnapshot(docRef, (snapshot) => {
				if (snapshot.exists()) {
					SetClient__UserProfileInfos(snapshot.data());
				}
			});

			return () => {
				unsub();
			};
		};
		profileID && getProfile;
	}, [profileID]);

	// swich between SSR inito CLIENT
	const getUserProfileInfos = useCallback(() => {
		if (client__userProfileInfos) return client__userProfileInfos;

		return SSR__userProfileInfos;
	}, [SSR__userProfileInfos, client__userProfileInfos]);

	return (
		<main className="relative flex w-full min-h-screen overflow-x-hidden">
			<section className="fixed top-0 w-auto h-auto max-h-screen hidden lg:block">
				<Sidebar />
			</section>

			<section className="relative flex-grow flex-shrink w-full p-2 ml-0 md:p-3 lg:w-[calc(100%-24rem)] lg:ml-96 lg:p-4">
				{/* profile block */}
				<ProfileBlock userProfileInfos={getUserProfileInfos?.()} />

				{/* top bar */}
				<TopBar
					userProfileInfos={getUserProfileInfos?.()}
					showTopBar={showTopBar}
				/>

				{/* photos (posts) */}
				<Posts userProfileInfos={getUserProfileInfos?.()} />
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

			const docRef = doc(db, "users", userID);
			const userDoc = await getDoc(docRef);

			if (userDoc.exists()) {
				return {
					props: {
						profileID: userID,
						SSR__userProfileInfos: userDoc.data(),
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
			props: {
				profileID: userID,
				SSR__userProfileInfos: null,
			},
		};
	}
};
