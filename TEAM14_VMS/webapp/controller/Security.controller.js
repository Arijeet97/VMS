sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/base/Log",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/m/library",
	"sap/ui/Device",
	"sap/ui/core/Fragment"
], function (Controller, MessageBox, MessageToast, JSONModel, Log, Popover, Button, library, Device, Fragment) {
	"use strict";
	var ButtonType = library.ButtonType,
		PlacementType = library.PlacementType;
	return Controller.extend("inc.inktn.pro.TEAM14_VMS.controller.Security", {
		onInit: function () {
			var comboData = {
				"sSelect": "",
				"CheckedInVisibility": true,
				"CheckedOutVisibility": false,
				"list": [

					{
						"Type": "Signature Required"
					}, {
						"Type": "No Signature Required"
					}
				]
			};
			var oModel1 = new JSONModel(comboData);
			this.getView().setModel(oModel1, "oViewModel");
			var oModel2 = new JSONModel(this._data);
			this.getView().setModel(oModel2);
			var oModel3 = new JSONModel("model/data.json");
			this.getView().setModel(oModel3, "oGlobalModel");
			var oModel4 = new JSONModel("model/VisitorDetails.json");
			this.getView().setModel(oModel4, "oPreRegForm");
		},

		_data: {
			"date": new Date()

		},
		onAdd: function () {
			this.bFlag = true;
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("idNewDelivery", "inc.inkthn.neo.NEO_VMS.fragments.NewDelivery", this);
			}
			this.getView().addDependent(this._oDialog);
			this._oDialog.open();

		},
		onCancel: function () {

			this._oDialog.destroy();
			this._oDialog = null;
			this._oDialog.close();

		},
		onSave: function () {
			var empId = sap.ui.core.Fragment.byId("idNewDelivery", "idEmpId").getValue();
			var delivType = sap.ui.core.Fragment.byId("idNewDelivery", "idDelivType").getValue();
			var obj1 = {
				EmployeeId: empId,
				DeliveryType: delivType
			};
			var oNewDelivery = this.getView().byId("SecurityDelivery").getModel("oPreRegForm");
			var item = oNewDelivery.getProperty("/DeliveryData");
			item.push(obj1);
			oNewDelivery.setData({
				"DeliveryData": item
			});
			oNewDelivery.refresh();
			this._oDialog.destroy();
			this._oDialog = null;
			this._oDialog.close();
		},
		onPreRegistered: function () {
			this.bFlag = true;
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("idPreRegistered", "inc.inkthn.neo.NEO_VMS.fragments.PreRegParking", this);
			}
			this.getView().addDependent(this._oDialog);
			this._oDialog.open();
		},
		onSpotRegister: function () {
			this.bFlag = true;
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("idSpotRegister", "inc.inkthn.neo.NEO_VMS.fragments.SpotRegParking", this);
			}
			this.getView().addDependent(this._oDialog);
			this._oDialog.open();
		},
		onCheckedIn: function () {
			this.getView().getModel("oViewModel").setProperty("/CheckedInVisibility", true);
			this.getView().getModel("oViewModel").setProperty("/CheckedOutVisibility", false);
		},
		onCheckedOut: function () {
			this.getView().getModel("oViewModel").setProperty("/CheckedInVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedOutVisibility", true);
		},
		onAvailableSlots: function () {
			MessageBox.information("There are 65 Slots Available in Parking Area.");
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