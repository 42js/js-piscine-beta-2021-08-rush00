const list = "0123456789abcdefghijklmnopqrstuvwxyz";
module.exports = function idValidator (str) {

	if (!str || str.length <= 0 || str.length > 8)
		return (false);
	for (i in str)
	{
		if (list.indexOf(str[i]) == -1)
			return (false);
	}
	return (true);
}
