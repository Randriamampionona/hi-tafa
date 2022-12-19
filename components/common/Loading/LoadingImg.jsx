import { Fragment } from "react";
import { FaSpinner } from "react-icons/fa";
import useUpdateProfile from "../../../hooks/useUpdateProfile";

const LoadingImg = ({ imgType }) => {
	const { loading } = useUpdateProfile();

	return (
		<Fragment>
			{loading[imgType] ? (
				<div className="z-30 absolute inset-0 grid place-items-center w-full h-full bg-black/60 text-lightWhite">
					<span className="animate-spin">
						<FaSpinner />
					</span>
				</div>
			) : null}
		</Fragment>
	);
};

export default LoadingImg;
