// Install all components

import {MainLayout } from "./Layout";
import { CenterLoader, Card, Datatable, BaseInput, Multiselect, AjaxPagination, Modal } from "@/App/Common/Helpers/Components";

export default {
  install: function(Vue) {
    //layout
    Vue.component("main-layout", MainLayout);

  //  components
    Vue.component("center-loader", CenterLoader);
    Vue.component("card", Card);
    Vue.component("datatable", Datatable);
    Vue.component("BaseInput", BaseInput);
    Vue.component("SelectInput", Multiselect);
    Vue.component("AjaxPagination", AjaxPagination);
    Vue.component("Modal", Modal);

  }
};
