const fs = require("fs");
const path = require("path");
const commandLineArgs = require("command-line-args");

const flags = JSON.parse(fs.readFileSync(path.join(__dirname, "flags.json"), "utf8"));

function getArgs(flags) {
	flags = flags.map((flag) => {
		if (flag.type === "String") flag.type = String;
		if (flag.type === "Number") flag.type = Number;
		if (flag.type === "Boolean") flag.type = Boolean;
		return flag;
	});
	const argv = commandLineArgs(flags, {
		partial: true
	});
	if (!argv.loglevel) argv.loglevel = "info"; // The default value handling in the library is buggy
	if (argv.loglevel === "verbose") argv.loglevel = "verb";
	if (argv.loglevel === "warning") argv.loglevel = "warn";

	return argv;
}

module.exports = {
	flags,

	run: getArgs(flags.run),
	export: getArgs(flags.export),
};