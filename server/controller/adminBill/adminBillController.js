//Importamos las variables de entorno
require('dotenv').config({ path : '../const.env'});
const qrcode  = require('qrcode');
const shortid = require('shortid');
const pdf = require('html-pdf');
const fs = require('fs');
const options = { 
    format: 'Letter',
};
const moment = require('moment');
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
                productsEncoded = `${productsEncoded}|${element.shortdescription}&${element.unitmeasure}&${element.amount}&${parseFloat(element.price).toFixed(2)}&${parseFloat(element.subtotal).toFixed(2) }`;
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

                // const content = generateInvoceNew.generateInvoice(imageAsBase64Company, imageAsBase64Qr, namecom, directioncom, placecom, citycom, telephonecom, namebus, directionbus, placebus, citybus, nitcom, invoiceNumber, authorizationNumber,  activityeconomic, datepresentbill, reasonbill, nitbill, productsEncodedEnd, amountTransaction, numberString, codeGenerate, dateenddos, identifier, legenddos);

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
                    amounttransaction : parseFloat(amountTransaction).toFixed(2),
                    numberstring : numberString,
                    codegenerate : codeGenerate,
                    dateenddos : dateenddos,
                    identifier : identifier,
                    legenddos : legenddos,
                    conditionbill : conditionbill
                }
                const createBill = await AdminBillModel.create({
                    identifierbill : identifierBillEnd,
                    identifierbus : identifierbus,
                    identifierdos : identifierDosEnd,
                    numberbill : numberBill,
                    nitbill : nitbill,
                    reasonbill : reasonbill,
                    datepresentbill : datepresentbill,
                    paymenttypebill : paymenttypebill,
                    productsbill : productsEncodedEnd,
                    totalbill : parseFloat(amountTransaction).toFixed(2),
                    controlcodebill : codeGenerate,
                    conditionbill : conditionbill,
                });
                if(createBill){
                    res.json({ response : 'success', data : responsedata});
                }else{
                    res.json({ response : 'fail-create'});
                }
            }
        
        }

    } catch (error) {
        console.log(error);
        res.json({ response : 'fail-server'});
    }
}

//=================================================================
//Lectura de la informacion de Login Usuario
exports.readBill = async(req, res) => {
    // res.json({ uno : req.usuario});
    const role = req.user.role;
    const identifier = req.user.identifier;

    const {identifierbus} = req.body;
    //
    try {
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
             // LECTURA DE INFORMACION SOLO ALL => ADMIN, USER / (super admin)
            const consultationBill  = await AdminBillModel.findAll({
                where : {
                    identifierbus : identifierbus,
                },
                raw : true
            });
            if( consultationBill.length === 0 ){
                res.json({ response : 'empty'})
            }else{
                res.json({ response : 'success' , data : consultationBill});
            }
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}

//=================================================================
//Lectura de la informacion de Login Usuario
exports.readBillUnique = async(req, res) => {
    // res.json({ uno : req.usuario});
    const role = req.user.role;
    const identifier = req.user.identifier;

    const {identifierbill} = req.body;
    //
    try {
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
             // LECTURA DE INFORMACION SOLO ALL => ADMIN, USER / (super admin)
            const consultationBillUnique  = await AdminBillModel.findAll({
                where : {
                    identifierbill : identifierbill,
                },
                raw : true
            });

            //Realizamos la peticion para pedir informacion de la sucursal
            const consultationDataBusiness = await AdminBusinessModel.findAll({
                where : {
                    identifierbus : consultationBillUnique[0].identifierbus
                },
                raw : true
            })

            //REalizamos la peticion para pedir informacion de la Empresa
            const consultationDataCompany = await AdminCompanyModel.findAll({
                where : {
                    identifiercom : consultationDataBusiness[0].identifiercom
                },
                raw : true
            })
            
            //Realizamos la peticion para pedir informacion de la Dosificacion
            const consultationDataDosage = await AdminDosageModel.findAll({
                where : {
                    identifierdos : consultationBillUnique[0].identifierdos
                },
                raw : true
            })

            //-----------------------------------------------------------------
            //
            const numberString = generateNumberLetras.numeroALetras(parseFloat(consultationBillUnique[0].totalbill).toFixed(2), {
                plural: "BOLIVIANOS",
                singular: "BOLIVIANO",
                centPlural: "CENTAVOS",
                centSingular: "CENTAVO"
            });

            //-----------------------------------------------------------------
            //
            const qrcodegenerate = `${consultationDataCompany[0].nitcom}|${consultationBillUnique[0].numberbill}|${consultationDataDosage[0].numberauthorizationdos}|${moment(consultationBillUnique[0].datepresentbill).format('MM/DD/YYYY')}|${parseFloat(consultationBillUnique[0].totalbill).toFixed(2)}|${parseFloat(consultationBillUnique[0].totalbill).toFixed(2)}|${consultationBillUnique[0].controlcodebill}|${consultationBillUnique[0].nitbill}|0|0|0|0`;
            const imageAsBase64Qr = await qrcode.toDataURL( qrcodegenerate );

            const responsedata = { 
                imagecompany : consultationDataCompany[0].directionimgcom, 
                imageqr : imageAsBase64Qr,
                namecom : consultationDataCompany[0].namecom,
                directioncom : consultationDataCompany[0].directioncom,
                placecom : consultationDataCompany[0].placecom,
                citycom : consultationDataCompany[0].citycom,
                telephonecom : consultationDataCompany[0].telephonecom,
                namebus : consultationDataBusiness[0].namebus,
                directionbus : consultationDataBusiness[0].directionbus,
                placebus : consultationDataBusiness[0].placebus,
                citybus : consultationDataBusiness[0].citybus,
                nitcom : consultationDataCompany[0].nitcom,
                invoicenumber : consultationBillUnique[0].numberbill,
                authorizationNumber : consultationDataDosage[0].numberauthorizationdos,
                activityeconomic : consultationDataBusiness[0].economicactivitybus,
                datepresentbill : moment(consultationBillUnique[0].datepresentbill).format('MM/DD/YYYY') ,
                reasonbill : consultationBillUnique[0].reasonbill,
                nitbill : consultationBillUnique[0].nitbill,
                productsencoded : consultationBillUnique[0].productsbill,
                amounttransaction : parseFloat(consultationBillUnique[0].totalbill).toFixed(2),
                numberstring : numberString,
                codegenerate : consultationBillUnique[0].controlcodebill,
                dateenddos : consultationDataDosage[0].dateenddos,
                identifier : identifier,
                legenddos : consultationDataDosage[0].legenddos,
                conditionbill : consultationBillUnique[0].conditionbill
            }
            if( consultationBillUnique.length === 0 ){
                res.json({ response : 'empty'})
            }else{
                res.json({ response : 'success' , data : responsedata});
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ response : 'fail-server'});
    }
}

//=================================================================
//Lectura de la informacion de Login Usuario
exports.updateBillCondition = async(req, res) => {
    // res.json({ uno : req.usuario});
    const role = req.user.role;
    const identifier = req.user.identifier;

    const {identifierbill, conditionbill} = req.body;
    //
    try {
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
             // LECTURA DE INFORMACION SOLO ALL => ADMIN, USER / (super admin)
             const updateBusiness  = await AdminBillModel.update({
                conditionbill : conditionbill
            }, {
                where : {
                    identifierbill : identifierbill
                }
            })
            if( updateBusiness ){
                res.json({ response : 'success'})
            }else{
                res.json({ response : 'fail-update'})
            }
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}