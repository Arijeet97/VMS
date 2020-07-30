sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/base/Log",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/Sorter",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/m/library",
	"sap/ui/Device"
], function (Controller, JSONModel, Log, MessageToast, Fragment, Sorter, Popover, Button, library, Device) {
	"use strict";
	var ButtonType = library.ButtonType,
		PlacementType = library.PlacementType;
	return Controller.extend("inc.inktn.pro.TEAM14_VMS.controller.Admin", {
		onInit: function () {
			var comboData = {
				"UpcomingVisibility": true,
				"CheckedInVisibility": false,
				"CheckedOutVisibility": false,
				"FrequentVisitorVisibility": false,
				"RoomRequestVisibility": true,
				"ParkingRequestVisibility": false
			};

			var oModel1 = new JSONModel(comboData);
			this.getView().setModel(oModel1, "oViewModel");
			var oModel2 = new JSONModel(this._data);
			this.getView().setModel(oModel2);
			var oModel3 = new JSONModel("model/data.json");
			this.getView().setModel(oModel3, "oGlobalModel");
		},

		_data: {
			"date": new Date()
		},
		onUpcoming: function () {
			this.getView().getModel("oViewModel").setProperty("/UpcomingVisibility", true);
			this.getView().getModel("oViewModel").setProperty("/CheckedInVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedOutVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/FrequentVisitorVisibility", false);

		},
		onCheckedIn: function () {
			this.getView().getModel("oViewModel").setProperty("/UpcomingVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedInVisibility", true);
			this.getView().getModel("oViewModel").setProperty("/CheckedOutVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/FrequentVisitorVisibility", false);

		},
		onCheckedOut: function () {
			this.getView().getModel("oViewModel").setProperty("/UpcomingVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedInVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedOutVisibility", true);
			this.getView().getModel("oViewModel").setProperty("/FrequentVisitorVisibility", false);

		},
		onFrequentVisittor: function () {
			this.getView().getModel("oViewModel").setProperty("/UpcomingVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedInVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedOutVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/FrequentVisitorVisibility", true);

		},
		onParkingRequest: function () {
			this.getView().getModel("oViewModel").setProperty("/RoomRequestVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/ParkingRequestVisibility", true);
		},
		onRoomRequest: function () {
			this.getView().getModel("oViewModel").setProperty("/RoomRequestVisibility", true);
			this.getView().getModel("oViewModel").setProperty("/ParkingRequestVisibility", false);
		},

		onSideNavButtonPress: function () {
			var oToolPage = this.byId("ToolPage");
			var bSideExpanded = oToolPage.getSideExpanded();
			this._setToggleButtonTooltip(bSideExpanded);
			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},
		_setToggleButtonTooltip: function (bLarge) {
			var oToggleButton = this.byId('sideNavigationToggleButton');
			if (bLarge) {
				oToggleButton.setTooltip('Large Size Navigation');
			} else {
				oToggleButton.setTooltip('Small Size Navigation');
			}
		},
		onItemSelect: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			this.byId("detailContainer").to(this.getView().createId(oItem.getKey()));
		},
		onProfile: function (event) {
			var that = this;
			var oPopover = new Popover({
				showHeader: false,
				placement: PlacementType.Bottom,
				content: [
					new Button({
						text: "Edit Profile",
						type: ButtonType.Transparent
					}),
					new Button({
						text: 'Logout',
						type: ButtonType.Transparent,
						press: function (oEvent) {
							that.onLandingPage(oEvent);
						},
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');
			oPopover.openBy(event.getSource());
		},
		onLandingPage: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteLanding");
		}

	});

});