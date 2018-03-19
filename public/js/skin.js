var skin = localStorage.getItem("skinChoice");

switch (skin) {
	case "girly":
		$("head").append('<link rel="stylesheet" href="/stylesheets/skins/dennis/girlboss.css" type="text/css" />');
		break;
	case "christmas":
		$("head").append('<link rel="stylesheet" href="/stylesheets/skins/dennis/xmas.css" type="text/css" />');
		break;
	case "urban":
		$("head").append('<link rel="stylesheet" href="/stylesheets/skins/dennis/brickhouse.css" type="text/css" />');
		break;
	case "msdos":
		$("head").append('<link rel="stylesheet" href="/stylesheets/skins/will/msdos.css" type="text/css" />');
		break;
	default:
		$("head").append('<link rel="stylesheet" href="/stylesheets/skins/will/msdos.css" type="text/css" />');
		break;
}