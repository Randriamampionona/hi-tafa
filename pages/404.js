import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { MetaHead } from "../components/common";

const NotFoundPage = () => {
	const { reload, replace } = useRouter();

	return (
		<Fragment>
			<MetaHead subTitle={"Page not found"} />

			<section className="relative flex flex-col items-center justify-center w-screen h-screen bg-darkWhite">
				<h1 className="text-7xl font-bold text-greenBlue leading-none text-center mb-4">
					Ooooops!
				</h1>
				<p className="text-base text-darkBlue text-center max-w-[80%] sm:max-w-[60%] md:max-w-[45%] lg:max-w-[35%] xl:max-w-[25%]">
					Looks like something went wrong or the page you are trying
					to reach does not exist,{" "}
					<u className="cursor-pointer" onClick={reload}>
						try to refresh this page
					</u>
				</p>

				<button
					className="flex items-center justify-center gap-x-3 rounded mt-10 px-6 py-2 text-white shadow shadow-darkBlue bg-darkBlue hover:bg-darkBlue/95"
					onClick={() => replace("/")}>
					<span>
						<FaArrowLeft />
					</span>
					<span>Take me home</span>
				</button>

				<p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs">
					&copy; 2022 By{" "}
					<a
						href="http://toojrtn.vercel.app"
						target="_blank"
						rel="noopener noreferrer"
						className="underline text-greenBlue">
						toojrtn
					</a>
				</p>
			</section>
		</Fragment>
	);
};

export default NotFoundPage;
