sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("inc.inktn.pro.TEAM14_VMS.controller.Landing", {
		onInit: function () {
			var oHostModel = this.getOwnerComponent().getModel("oHostModel");
			this.getView().setModel(oHostModel, "oHostModel");
			var oLoginModel = this.getOwnerComponent().getModel("oLoginModel");
			this.getView().setModel(oLoginModel, "oLoginModel");
		},
		onPressGo: function (oEvent) {
			var oDialog = this.byId("BusyDialog");
			oDialog.open();
			setTimeout(function () {
				oDialog.close();
			}, 1000);
		// 	var oValue = this.getView().byId("idEmpNum").getValue();
		// 	if (oValue === "1") {
		// 		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 		oRouter.navTo("RouteHost");

		// 	} else if (oValue === "Admin") {
		// 		var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
		// 		oRouter1.navTo("RouteAdmin");
		// 	} else if (oValue === "Security") {
		// 		var oRouter2 = sap.ui.core.UIComponent.getRouterFor(this);
		// 		oRouter2.navTo("RouteSecurity");
		// 	}
		// },
			var username = this.getView().getModel("oLoginModel").getProperty("/eId");
			var password = this.getView().getModel("oLoginModel").getProperty("/password");
			var that = this;
			var oLoginModel = that.getView().getModel("oLoginModel");
			var sUrl = "JAVA_SERVICE_CF/employee/login";
			var item = {
				"username": username,
				"password": password
			};
			$.ajax({
				url: sUrl,
				type: "post",
				cache: false,
				async: true,
				dataType: "json",
				// data: JSON.stringify(payload),
				data: JSON.stringify(item) ,
				beforeSend: function (xhr) {
					var param = "/JAVA_SERVICE_CF";
					var token = that.getCSRFToken(sUrl, param);
					xhr.setRequestHeader("X-CSRF-Token", token);
					xhr.setRequestHeader("Accept", "application/json");
				},
				contentType: "application/json",
				success: function (oData) {
					sap.m.MessageToast.show("Logged In Successfully!");
					if (oData.status === "true") {
						if (oData.role === "Employee") {
							var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
							oRouter.navTo("RouteHost");
						} else if (oData.role === "Admin") {
							var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
							oRouter1.navTo("RouteAdmin");
						} else if (oData.role === "Security") {
							var oRouter2 = sap.ui.core.UIComponent.getRouterFor(this);
							oRouter2.navTo("RouteSecurity");
						}
					}
				},
				error: function (e) {
					sap.m.MessageToast.show("Internal server Error");
				},

			});

		},
		getCSRFToken: function (url, token) {
			var token = null;
			var sUrl = url;
			$.ajax({
				url: sUrl,
				type: "GET",
				async: false,
				beforeSend: function (xhr) {
					xhr.setRequestHeader("X-CSRF-Token", "Fetch");
				},
				complete: function (xhr) {
					token = xhr.getResponseHeader("X-CSRF-Token");
					sap.m.MessageToast.show("token created");
				}
			});
			return token;
		},

		onNewVisitor: function () {
			var oDialog = this.byId("BusyDialog");
			oDialog.open();
			setTimeout(function () {
				oDialog.close();
			}, 1000);
			var oRouter3 = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter3.navTo("RouteNewVisitor");
			// this.bFlag = true;
			// if (!this._oDialog) {
			// 	this._oDialog = sap.ui.xmlfragment("idAddItemFrag", "inc.inkthn.neo.NEO_VMS.fragments.PreRegForm", this);
			// }
			// this.getView().addDependent(this._oDialog);
			// // var oDataModel = this.getView().getModel("oModel2");
			// // oDataModel.setProperty("/selectedValue", {});
			// // Fragment.byId("idAddItemFrag", "idProdId").setEditable(true);
			// // Fragment.byId("idAddItemFrag", "idQuality").setVisible(false);
			// this._oDialog.open();

		}
	});
});