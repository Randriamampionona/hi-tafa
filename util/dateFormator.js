import moment from "moment/moment";

const dateFormator = (date) => {
	return moment().calendar(date);
};

export default dateFormator;
