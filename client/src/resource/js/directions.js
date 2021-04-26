//Importamos CONSTANTES DE DIRECCION
import { IP_SERVER } from "./constants";

//Direccion de URL para el envio de informacion
export const direccion_admin_login = `${IP_SERVER}/login`;
export const direccion_autenticado_user = `${IP_SERVER}/login-read`;
//****************************************************************
//DIRECTION START
export const direction_admin_company_consultation = `${IP_SERVER}/admin-com/company-all-read`;
export const direction_admin_business_consultation = `${IP_SERVER}/admin-bus/business-all-read`;

//****************************************************************
//DIRECTION COMPANY
export const direction_admin_company_create = `${IP_SERVER}/admin-com/company-all-create`;
export const direction_admin_company_read = `${IP_SERVER}/admin-com/company-all-read`;
export const direction_admin_company_update = `${IP_SERVER}/admin-com/company-all-update`;
export const direction_admin_company_delete = `${IP_SERVER}/admin-com/company-all-delete`;

export const direction_admin_company_update_img = `${IP_SERVER}/admin-com/company-all-update-img`;

//****************************************************************
//DIRECTION BUSINESS
export const direction_admin_business_create = `${IP_SERVER}/admin-bus/business-all-create`;
export const direction_admin_business_read = `${IP_SERVER}/admin-bus/business-all-read`;
export const direction_admin_business_update = `${IP_SERVER}/admin-bus/business-all-update`;
export const direction_admin_business_delete = `${IP_SERVER}/admin-bus/business-all-delete`;

//****************************************************************
//DIRECTION TOOLS
export const direction_admin_tool_read = `${IP_SERVER}/admin-tool/tool-all-read`;

//****************************************************************
//DIRECTION USER
export const direction_admin_user_create = `${IP_SERVER}/admin/admin-all-create`;
export const direction_admin_user_read = `${IP_SERVER}/admin/admin-all-read`;
export const direction_admin_user_update = `${IP_SERVER}/admin/admin-all-update`;
export const direction_admin_user_delete = `${IP_SERVER}/admin/admin-all-delete`;

//*******************************************************
//DIRECTION DOSAGE
export const direction_admin_dosage_create = `${IP_SERVER}/admin-dos/dosage-all-create`;
export const direction_admin_dosage_read = `${IP_SERVER}/admin-dos/dosage-all-read`;
export const direction_admin_dosage_update = `${IP_SERVER}/admin-dos/dosage-all-update`;
export const direction_admin_dosage_delete = `${IP_SERVER}/admin-dos/dosage-all-delete`;
export const direction_admin_dosage_read_current = `${IP_SERVER}/admin-dos/dosage-all-read-current`;
//DIRECTION DOSAGE
export const direction_admin_measure_create = `${IP_SERVER}/admin-mea/measure-all-create`;
export const direction_admin_measure_read = `${IP_SERVER}/admin-mea/measure-all-read`;
export const direction_admin_measure_update = `${IP_SERVER}/admin-mea/measure-all-update`;
export const direction_admin_measure_delete = `${IP_SERVER}/admin-mea/measure-all-delete`;

//DIRECTION PRODUCT
export const direction_admin_product_create = `${IP_SERVER}/admin-pro/product-all-create`;
export const direction_admin_product_read = `${IP_SERVER}/admin-pro/product-all-read`;
export const direction_admin_product_update = `${IP_SERVER}/admin-pro/product-all-update`;
export const direction_admin_product_delete = `${IP_SERVER}/admin-pro/product-all-delete`;

//DIRECTION BILL
export const direction_admin_bill_create = `${IP_SERVER}/admin-bill/bill-all-create`;