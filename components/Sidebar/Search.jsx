import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase.config";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { AciveStatus } from "../common";
import { GlobalContext } from "../../store/context/GlobalContext";
import useSelectChat from "../../hooks/useSelectChat";
import { useRouter } from "next/router";

const Search = () => {
	const { toogleSidebar } = GlobalContext();
	const { selectChatFun } = useSelectChat();
	const { push } = useRouter();
	const [inpValue, setInpValue] = useState("");
	const [searchResults, setSearchResults] = useState(null);

	const resetHandler = () => {
		setSearchResults(null);
		setInpValue("");
	};

	const submitSearchHandler = async (e) => {
		e.preventDefault();
		if (!!inpValue.trim()) {
			const collectionRef = collection(db, "users");
			const q = query(
				collectionRef,
				where("email", "==", inpValue)
			);
			const resultDoc = await getDocs(q);

			if (resultDoc.empty) {
				setInpValue("");
				return setSearchResults("Empty result, try something else");
			}

			setInpValue("");
			return setSearchResults(resultDoc.docs.map((doc) => doc.data()));
		}
	};

	const selectChatHandler = async (selectedUser) => {
		toogleSidebar();
		await selectChatFun(selectedUser);

		resetHandler();
		push("/");
	};

	return (
		<div className="relative w-full bg-darkBlue pt-3">
			<form
				className="flex items-center justify-between px-3 mx-auto w-[calc(100%-1.5rem)] h-9 rounded-full bg-darkWhite/10"
				onSubmit={submitSearchHandler}>
				<span>
					<FiSearch />
				</span>
				<input
					type="search"
					placeholder="Search by email"
					className="flex-grow px-3 bg-transparent border-0 outline-0"
					value={inpValue}
					onChange={(e) => setInpValue(e.target.value)}
					onFocus={resetHandler}
				/>
			</form>

			{/* search result */}
			{searchResults && (
				<div className="z-40 absolute top-14 left-0 w-full">
					<div className="mx-auto w-[calc(100%-1.5rem)] border border-[#36485a] p-3 rounded-md shadow-md shadow-darkBlue bg-[#2f4052] space-y-6 cursor-default">
						<div className="flex items-center justify-between">
							<h1>Result(s)</h1>
							<span
								className="text-lightWhite/60 p-1 rounded-full hover:text-lightWhite"
								onClick={resetHandler}>
								<FaTimes />
							</span>
						</div>

						<div className="flex flex-col w-full hover:bg-[#36485a]">
							{typeof searchResults === "object"
								? searchResults?.map((user) => (
										<div
											key={user?.userID}
											className="flex items-center justify-between space-x-4 py-2">
											<div
												className="flex items-center gap-x-2"
												onClick={() =>
													selectChatHandler(user)
												}>
												<div className="relative flex w-[52px] h-[52px]">
													<Image
														src={
															user?.img
																?.profilePicture
														}
														alt={user?.username}
														width={52}
														height={52}
														style={{
															objectFit: "cover",
														}}
														className="rounded-full border-2 border-greenBlue bg-darkWhite/10"
													/>
													<AciveStatus
														isActive={user?.active}
													/>
												</div>

												<div>
													<p className="font-bold text-lg leading-none cursor-pointer">
														{user?.username}
													</p>
													<h3 className="font-normal text-sm text-darkWhite cursor-default hover:text-greenBlue">
														{user?.email}
													</h3>
												</div>
											</div>
										</div>
								  ))
								: typeof searchResults === "string" && (
										<p>{searchResults}</p>
								  )}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Search;
