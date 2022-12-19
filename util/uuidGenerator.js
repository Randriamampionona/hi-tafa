const uuidGenerator = () => {
	return require("crypto").randomBytes(3).toString("hex");
};

export default uuidGenerator;
