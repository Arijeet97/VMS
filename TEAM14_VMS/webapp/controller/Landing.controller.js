sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("inc.inktn.pro.TEAM14_VMS.controller.Landing", {
		onInit: function () {

		},
		onPressGo: function (oEvent) {
			var oDialog = this.byId("BusyDialog");
			oDialog.open();
			setTimeout(function () {
				oDialog.close();
			}, 1000);
			var oValue = this.getView().byId("idEmpNum").getValue();
			if (oValue === "Host") {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteHost");

			} else if (oValue === "Admin") {
				var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter1.navTo("RouteAdmin");
			} else if (oValue === "Security") {
				var oRouter2 = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter2.navTo("RouteSecurity");
			}
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