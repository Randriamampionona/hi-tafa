import moment from "moment/moment";

const dateFormator = (date, format = "ago") => {
	if (format !== "ago") {
		return moment(date).format("lll");
	}
	return moment(date).fromNow();
};

export default dateFormator;
