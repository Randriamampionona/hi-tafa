import { useState } from "react";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import { FiMail, FiLock } from "react-icons/fi";
import { FaSignInAlt, FaUserCircle, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";

const initState = {
	inputs: { email: "", password: "" },
};

const AuthorizationPage = () => {
	const [hasAccount, setHasAccount] = useState(true);
	const [inputVal, setInputVal] = useState(initState.inputs);
	const { replace } = useRouter();

	const changeHandler = (e) => {
		setInputVal((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		replace("/");
	};

	return (
		<main className="flex flex-col items-center justify-center gap-y-4 w-full h-screen">
			<div className="group flex flex-col items-center justify-center max-w-[75%] w-full">
				<Image
					src={logo}
					alt="Hi-Tafa"
					placeholder="blur"
					objectFit="cover"
					title="Become a member and start a conversation with people around
					you."
					className="group-hover:animate-pulse"
				/>
			</div>

			<div className="flex flex-col items-center justify-center gap-y-3 max-w-sm w-full h-auto p-4 rounded shadow-lg shadow-darkBlue/10 border border-greenBlue/10">
				<form
					className="flex flex-col gap-y-2 w-full"
					onSubmit={submitHandler}>
					<div className="pb-4">
						<h1 className="text-3xl font-bold">
							{hasAccount ? "Sign In" : "Sign Up"}
						</h1>
					</div>

					<div className="flex flex-col w-full">
						<LabelInput
							labelFor={"email"}
							labelText={"Email address"}
							required
						/>
						<div className="flex items-center justify-between p-3 border border-darkBlue/20 rounded focus-within:border-greenBlue">
							<span className="text-darkBlue/40">
								<FiMail />
							</span>
							<input
								required
								type="email"
								name="email"
								placeholder="Email address"
								className="flex-grow outline-0 border-0 px-2"
								value={inputVal.email}
								onChange={changeHandler}
							/>
						</div>
					</div>

					<div className="flex flex-col w-full">
						<LabelInput
							labelFor={"password"}
							labelText={"Password"}
							required
						/>
						<div className="flex items-center justify-between p-3 border border-darkBlue/20 rounded focus-within:border-greenBlue">
							<span className="text-darkBlue/40">
								<FiLock />
							</span>
							<input
								required
								type="password"
								name="password"
								placeholder="Password"
								className="flex-grow outline-0 border-0 px-2"
								value={inputVal.password}
								onChange={changeHandler}
							/>
						</div>
					</div>

					<button className="flex items-center justify-center gap-x-3 w-full bg-greenBlue text-lightWhite rounded h-11 shadow hover:bg-greenBlue/90">
						<span>
							{hasAccount ? <FaSignInAlt /> : <FaUserCircle />}
						</span>
						<span>{hasAccount ? "Sing In" : "Sign Up"}</span>
					</button>

					<SwitchForm
						hasAccount={hasAccount}
						setHasAccount={setHasAccount}
					/>

					<div className="relative w-full my-4">
						<hr />
						<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
							or
						</span>
					</div>

					<div className="w-full space-y-2">
						<button
							type="button"
							className="flex items-center justify-center gap-x-3 w-full bg-darkBlue text-lightWhite rounded h-11 shadow hover:bg-darkBlue/90">
							<span>
								<FcGoogle />
							</span>
							<span>Continue with Google</span>
						</button>

						<button
							type="button"
							className="flex items-center justify-center gap-x-3 w-full bg-darkBlue text-lightWhite rounded h-11 shadow hover:bg-darkBlue/90">
							<span>
								<FaGithub />
							</span>
							<span>Continue with GitHub</span>
						</button>
					</div>
				</form>

				<p className="text-xs">
					&copy; 2022 From{" "}
					<a
						href="http://toojrtn.vercel.app"
						target="_blank"
						rel="noopener noreferrer"
						className="underline text-greenBlue">
						toojrtn
					</a>
				</p>
			</div>
		</main>
	);
};

export default AuthorizationPage;

const LabelInput = ({ labelFor, labelText, required }) => {
	return (
		<label htmlFor={labelFor} className="text-sm">
			{labelText} {required && <span className="text-red-400">*</span>}
		</label>
	);
};

const SwitchForm = ({ hasAccount, setHasAccount }) => {
	return (
		<div className="flex items-center justify-between flex-wrap text-sm">
			<p onClick={() => setHasAccount(!hasAccount)}>
				{hasAccount ? "Don't" : "Already"} have an account?{" "}
				<span className="underline cursor-pointer hover:text-greenBlue">
					{hasAccount ? "signup" : "signin"}
				</span>
			</p>

			{hasAccount && (
				<p className="underline cursor-pointer hover:text-greenBlue">
					Forgot password
				</p>
			)}
		</div>
	);
};
