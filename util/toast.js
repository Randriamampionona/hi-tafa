import toast from "react-hot-toast";

const toastNotify = (type, message) => {
	return toast[type](message);
};

export default toastNotify;
