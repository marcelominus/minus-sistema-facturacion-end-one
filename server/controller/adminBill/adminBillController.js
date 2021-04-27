//Importamos las variables de entorno
require('dotenv').config({ path : '../const.env'});
const qrcode  = require('qrcode');
const shortid = require('shortid');
const pdf = require('html-pdf');
const fs = require('fs');
const options = { 
    format: 'Letter',
};
//Importamos OP de SEQUELIZE para las operaciones OR y AND
const Op = require('Sequelize').Op;
//Importamos el MODELL
const LoginModel = require('../../model/login/loginModel');
const AdminCompanyModel = require('../../model/adminCompany/adminCompanyModel');
const AdminBusinessModel = require('../../model/adminBusiness/adminBusinessModel');
const AdminDosageModel = require('../../model/adminDosage/adminDosageModel');
const AdminBillModel = require('../../model/adminBill/adminBillModel');
const AdminProductModel = require('../../model/adminProduct/adminProductModel');
//Importamos los SERVICE 
const generateCode = require('../../service/adminBill/generateCodeControl');
const generateInvoceNew = require('../../service/adminBill/generateInvocePhysical');
const generateNumberLetras  = require('../../service/adminBill/generateNumberString');
//Importamos las variables de constantes
//=================================================
exports.createBill = async (req,res) => {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;  //*****DATO 1
    const role = req.user.role;
    
    try {
        //-----------------------------------------------------------------
        //Variables de entrada INPUT
        const {identifiercom, identifierbus, nitbill, datepresentbill, reasonbill, paymenttypebill, productsbill, conditionbill} = req.body;

        //-----------------------------------------------------------------
        //Verificacion de USER y ROL
        const consultationUser = await LoginModel.findAll({
            where : {
                identifier : identifier,
                role : role
            },
            raw : true
        });
        if( consultationUser == 0 ){
            res.json({ response : 'empty'});
        }else{
            //-----------------------------------------------------------------
            //CODE identificacion de BILL generador de identifierbill
            const identifierBillEnd  = `${shortid.generate()}-bill`;

            //-----------------------------------------------------------------
            //Consulta de datos de compañia
            const consultationDataCompany  = await AdminCompanyModel.findAll({
                where : {
                    identifiercom : identifiercom
                },
                attributes : ['namecom', 'nitcom', 'citycom', 'placecom', 'directioncom', 'directionimgcom', 'telephonecom'],
                raw : true
            });
            //-----------------------------------------------------------------
            //Consulta de datos de BUSINESS
            const consultationDataBusiness = await AdminBusinessModel.findAll({
                where : {
                    identifierbus : identifierbus
                },
                attributes : [ 'namebus', 'citybus', 'placebus', 'directionbus', 'economicactivitybus' ],
                raw : true
            })
            //-----------------------------------------------------------------
            //Consulta de datos de DOSAGE
            const consultationDataDosage = await AdminDosageModel.findAll({
                where :{
                    identifierbus : identifierbus,
                    conditiondos : 'active'
                },
                attributes : ['identifierdos', 'dateenddos', 'numberauthorizationdos', 'dosagedos', 'legenddos'],
                raw : true,
                order: [
                    ['iddosage', 'DESC'],
                ],
                limit : 1
            })
            //-----------------------------------------------------------------
            //Extraemos el valor de identifierdos para saber el NUMBER de BILL
            const identifierDosEnd = consultationDataDosage[0].identifierdos;
            const consultationNumberBill  = await AdminBillModel.count({
                where : {
                    identifierbus : identifierbus,
                    identifierdos : identifierDosEnd
                },
                raw : true
            })
            const numberBill = consultationNumberBill + 1;
            // const numberBill = 1503;

            //-----------------------------------------------------------------
            //Introducimos los valores de los productos y realizamos el proceso de suma total de precios de PRODUCT
            let productsEncoded = '';
            let total = 0;
            //-----------------------------------------------------------------
            //Convierte los productos en STRING ademas que se tienr el TOTAL
            productsbill.map( element => {
                total = total + element.subtotal;
                productsEncoded = `${productsEncoded}|${element.shortdescription}&${element.unitmeasure}&${element.amount}&${element.price}&${element.subtotal}`;
            })
            const productsEncodedEnd = productsEncoded.substring(1);

            //-----------------------------------------------------------------
            //Convierte el valor de la fecha en numeros ordinarios
            const arrayDate = datepresentbill.split("/");   
            const datepresentbillEnd = `${arrayDate[2]}${arrayDate[0]}${arrayDate[1]}`;

            //-----------------------------------------------------------------
            //Preparamos las variables par generar el codigo de control CODIGO DE CONTROL
            const authorizationNumber = consultationDataDosage[0].numberauthorizationdos;
            const invoiceNumber = numberBill.toString();
            const nitci = nitbill;  
            const dateOfTransaction = datepresentbillEnd;
            const amountTransaction = total.toString();
            const dosageKey = consultationDataDosage[0].dosagedos;

            const codeGenerate = generateCode.generateCodeControl(authorizationNumber, invoiceNumber, nitci, dateOfTransaction, amountTransaction, dosageKey);

            //-----------------------------------------------------------------
            //Extraemos el NIT  de la compania para generar la IMAGEN QR
            const nitcom = consultationDataCompany[0].nitcom;
            
            const qrcodegenerate = `${nitcom}|${invoiceNumber}|${authorizationNumber}|${datepresentbill}|${amountTransaction}|${amountTransaction}|${codeGenerate}|${nitci}|0|0|0|0`;
            const imageAsBase64Qr = await qrcode.toDataURL( qrcodegenerate );

            //-----------------------------------------------------------------
            //Convertimos las imagenes en BASE 64 para poder imprimirlo en el PDF
            const nameImageLogo = consultationDataCompany[0].directionimgcom.split('/');
            const imageAsBase64Company =await fs.readFileSync(`./public/img/company/${nameImageLogo[6]}`, 'base64');
            const imageAsBase64CompanyEnd = `data:image/png;base64,${imageAsBase64Company}`;

            if( consultationDataCompany.length == 0  || consultationDataBusiness.length == 0 ){
                res.json({ response : 'empty'})
            }else{
                //-----------------------------------------------------------------
                //
                const numberString = generateNumberLetras.numeroALetras(parseInt(amountTransaction), {
                    plural: "BOLIVIANOS",
                    singular: "BOLIVIANO",
                    centPlural: "CENTAVOS",
                    centSingular: "CENTAVO"
                });
                
                //-----------------------------------------------------------------
                //
                const namecom = consultationDataCompany[0].namecom;
                const directioncom = consultationDataCompany[0].directioncom;
                const placecom = consultationDataCompany[0].placecom; 
                const citycom = consultationDataCompany[0].citycom;
                const telephonecom = consultationDataCompany[0].telephonecom;
                const namebus= consultationDataBusiness[0].namebus;
                const directionbus = consultationDataBusiness[0].directionbus;
                const placebus = consultationDataBusiness[0].placebus;
                const citybus = consultationDataBusiness[0].citybus;
                const activityeconomic = consultationDataBusiness[0].economicactivitybus;
                const dateenddos = consultationDataDosage[0].dateenddos;
                const legenddos = consultationDataDosage[0].legenddos;

                const content = generateInvoceNew.generateInvoice(imageAsBase64Company, imageAsBase64Qr, namecom, directioncom, placecom, citycom, telephonecom, namebus, directionbus, placebus, citybus, nitcom, invoiceNumber, authorizationNumber,  activityeconomic, datepresentbill, reasonbill, nitbill, productsEncodedEnd, amountTransaction, numberString, codeGenerate, dateenddos, identifier, legenddos);
                console.log(imageAsBase64CompanyEnd);
                const responsedata = { 
                    imagecompany : `http://localhost:4001/state/img/company/${nameImageLogo[6]}`, 
                    imageqr : imageAsBase64Qr,
                    namecom : namecom,
                    directioncom : directioncom,
                    placecom : placecom,
                    citycom : citycom,
                    telephonecom : telephonecom,
                    namebus : namebus,
                    directionbus : directionbus,
                    placebus : placebus,
                    citybus : citybus,
                    nitcom :nitcom,
                    invoicenumber : invoiceNumber,
                    authorizationNumber : authorizationNumber,
                    activityeconomic : activityeconomic,
                    datepresentbill : datepresentbill,
                    reasonbill : reasonbill,
                    nitbill : nitbill,
                    productsencoded : productsEncodedEnd,
                    amounttransaction : amountTransaction,
                    numberstring : numberString,
                    codegenerate : codeGenerate,
                    dateenddos : dateenddos,
                    identifier : identifier,
                    legenddos : legenddos
                }
                
                res.json({ response : 'success' , data : responsedata});

            }
        
        }

    } catch (error) {
        console.log(error);
        res.json({ response : 'fail-server'});
    }
}

