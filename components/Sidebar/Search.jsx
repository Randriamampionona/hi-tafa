import { FiSearch } from "react-icons/fi";

const Search = () => {
	return (
		<div className="w-full bg-darkBlue pt-3">
			<form className="flex items-center justify-between px-3 mx-auto w-[calc(100%-1.5rem)] h-9 rounded-full bg-darkWhite/10">
				<span>
					<FiSearch />
				</span>
				<input
					type="search"
					placeholder="Search"
					className="flex-grow px-3 bg-transparent border-0 outline-0"
				/>
			</form>
		</div>
	);
};

export default Search;
