//Importamos CONSTANTES DE DIRECCION 
import {IP_SERVER} from './constants';

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
export const direction_admin_business_create= `${IP_SERVER}/admin-bus/business-all-create`;
export const direction_admin_business_read= `${IP_SERVER}/admin-bus/business-all-read`;
export const direction_admin_business_update= `${IP_SERVER}/admin-bus/business-all-update`;
export const direction_admin_business_delete= `${IP_SERVER}/admin-bus/business-all-delete`;

//****************************************************************
//DIRECTION TOOLS
export const direction_admin_tool_read= `${IP_SERVER}/admin-tool/tool-all-read`;

//****************************************************************
//DIRECTION USER
export const direction_admin_user_create = `${IP_SERVER}/admin/admin-all-create`;
export const direction_admin_user_read = `${IP_SERVER}/admin/admin-all-read`;
export const direction_admin_user_update = `${IP_SERVER}/admin/admin-all-update`;
export const direction_admin_user_delete = `${IP_SERVER}/admin/admin-all-delete`;
