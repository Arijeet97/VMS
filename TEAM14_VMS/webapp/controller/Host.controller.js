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
	return Controller.extend("inc.inktn.pro.TEAM14_VMS.controller.Host", {
		onInit: function () {
			var comboData = {
				"sSelect": "",
				"UpcomingVisibility": true,
				"CheckedInVisibility": false,
				"CheckedOutVisibility": false,
				"TotalVisitorVisibility": false,
				"list": [

					{
						"Identity": "Aadhar Card"
					}, {
						"Identity": "PassPort"
					}, {
						"Identity": "Driving License"
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
			var oLoginModel = this.getOwnerComponent().getModel("oLoginModel");
			this.getView().setModel(oLoginModel, "oLoginModel");
			var flex = this.byId(sap.ui.core.Fragment.createId("idAddItemFrag", "idFB"));

		},

		_data: {
			"date": new Date()
		},

		onAdd: function () {
			this.bFlag = true;
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("idAddItemFrag", "inc.inktn.pro.TEAM14_VMS.fragments.Host.PreRegForm", this);
			}
			this.getView().addDependent(this._oDialog);
			// var oDataModel = this.getView().getModel("oModel2");
			// oDataModel.setProperty("/selectedValue", {});
			// Fragment.byId("idAddItemFrag", "idProdId").setEditable(true);
			// Fragment.byId("idAddItemFrag", "idQuality").setVisible(false);
			this._oDialog.open();

		},
		onSave: function () {
			var name = sap.ui.core.Fragment.byId("idAddItemFrag", "idVisName").getValue();
			// var name = this.getView().byId("idVisName").getValue();
			var email = sap.ui.core.Fragment.byId("idAddItemFrag", "idEmail").getValue();
			var phone = sap.ui.core.Fragment.byId("idAddItemFrag", "idPhone").getValue();
			var identity = sap.ui.core.Fragment.byId("idAddItemFrag", "idPerIDNum").getValue();
			var visCount = sap.ui.core.Fragment.byId("idAddItemFrag", "idVisCount").getValue();
			var purpose = sap.ui.core.Fragment.byId("idAddItemFrag", "idVisPurp").getValue();
			var organisation = sap.ui.core.Fragment.byId("idAddItemFrag", "idVisOrg").getValue();
			var sTime = sap.ui.core.Fragment.byId("idAddItemFrag", "idMeetStart").getValue();
			var eTime = sap.ui.core.Fragment.byId("idAddItemFrag", "idMeetEnd").getValue();
			var obj1 = {
				Name: name,
				Email: email,
				ContactNumber: phone,
				// "Personal ID type": "",
				IdentityNumber: identity,
				NumofVisitors: visCount,
				Purpose: purpose,
				Organisation: organisation,
				Starttime: sTime,
				Endtime: eTime
			};
			var oPreRegForm = this.getView().byId("HostVisitor").getModel("oPreRegForm");
			var item = oPreRegForm.getProperty("/PreRegFormData");
			item.push(obj1);
			oPreRegForm.setData({
				"PreRegFormData": item
			});
			oPreRegForm.refresh();
			this._oDialog.destroy();
			this._oDialog = null;
			this._oDialog.close();
		},
		onCancel: function () {
			// if (this.bFlag === true) {

			// } else {
			// 	var oTableModel = this.getView().getModel("oModel2");
			// 	oTableModel.setProperty("/ProductCollection", this.sBackUp);
			// }
			this._oDialog.destroy();
			this._oDialog = null;
			this._oDialog.close();

		},
		handleChange: function (oEvent) {
			var oText = this.byId("T1"),
				oTP = oEvent.getSource(),
				sValue = oEvent.getParameter("value"),
				bValid = oEvent.getParameter("valid");
			this._iEvent++;
			oText.setText("Change - Event " + this._iEvent + ": TimePicker " + oTP.getId() + ":" + sValue);
			if (bValid) {
				oTP.setValueState(ValueState.None);
			} else {
				oTP.setValueState(ValueState.Error);
			}
		},
		onUpcoming: function () {

			this.getView().getModel("oViewModel").setProperty("/UpcomingVisibility", true);
			this.getView().getModel("oViewModel").setProperty("/CheckedInVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedOutVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/TotalVisitorVisibility", false);

		},
		onCheckedIn: function () {
		var that = this;
			var oLoginModel = that.getOwnerComponent().getModel("oLoginModel");
			var sUrl1 = "JAVA_SERVICE_CF/employee/getCheckedInVisitors?eId=" + oLoginModel.getProperty("/eId") + "&date=" + oLoginModel.getProperty(
				"/date");
			$.ajax({
				url: sUrl1,
				data: null,
				async: true,
				cache: false,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				error: function (err) {
					sap.m.MessageToast.show("Destination Failed");
				},
				success: function (data) {
					oLoginModel.setProperty("/CheckedIn", data);
					sap.m.MessageToast.show("Data Successfully Loaded");
				},
				type: "GET"
			});
			this.getView().getModel("oViewModel").setProperty("/UpcomingVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedInVisibility", true);
			this.getView().getModel("oViewModel").setProperty("/CheckedOutVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/TotalVisitorVisibility", false);

		},
		onCheckedOut: function () {
			this.getView().getModel("oViewModel").setProperty("/UpcomingVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedInVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedOutVisibility", true);
			this.getView().getModel("oViewModel").setProperty("/TotalVisitorVisibility", false);

		},
		onTotalVisittor: function () {
			this.getView().getModel("oViewModel").setProperty("/UpcomingVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedInVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/CheckedOutVisibility", false);
			this.getView().getModel("oViewModel").setProperty("/TotalVisitorVisibility", true);

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
		},
		addInput: function () {
			var oInput1 = new sap.m.Input();
			var oInput2 = new sap.m.Input();
			var oInput3 = new sap.m.Input();
			var oInput4 = new sap.m.Input();
			var delIcon = new sap.ui.core.Icon({
				src: "sap-icon://delete"
			});
			var Layout = new sap.m.FlexBox({
				alignItems: "Center",
				justifyContent: "Start",
				items: [oInput1, oInput2, oInput3, oInput4, delIcon]
			});
			this.flex.addContent(Layout);
		}

	});

});