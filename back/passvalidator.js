const numeric = "0123456789"
const alpha = "abcdefghijklmnopqrstuvwxyz";
module.exports = function passValidator (str) {
	if (!str || str.length < 8)
		return (false);
	let n = false;
	let a = false;
	for (i in str)
	{
		if (numeric.indexOf(str[i]) == -1 && alpha.indexOf(str[i]) == -1)
			return (false);
		else if (numeric.indexOf(str[i]) != -1)
			n = true;
		else
			a = true;
	}
	if (n && a)
		return (true);
	return (false);
}
