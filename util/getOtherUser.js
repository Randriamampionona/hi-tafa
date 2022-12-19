const getOtherUser = (users, currentUser) => {
	return users?.find((u) => u.userID !== currentUser?.uid);
};

export default getOtherUser;
