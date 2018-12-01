var skin = localStorage.getItem("skinChoice");

switch (skin) {
	case "girly":
		$("head").append('<link rel="stylesheet" href="/stylesheets/skins/girlboss.css" type="text/css" />');
		break;
	case "urban":
		$("head").append('<link rel="stylesheet" href="/stylesheets/skins/brickhouse.css" type="text/css" />');
		break;
	case "msdos":
		$("head").append('<link rel="stylesheet" href="/stylesheets/skins/msdos.css" type="text/css" />');
		break;
	default:
		$("head").append('<link rel="stylesheet" href="/stylesheets/skins/msdos.css" type="text/css" />');
		break;
}
