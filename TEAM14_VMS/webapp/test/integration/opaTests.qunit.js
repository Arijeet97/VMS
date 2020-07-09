/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"inc/inktn/pro/TEAM14_VMS/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});