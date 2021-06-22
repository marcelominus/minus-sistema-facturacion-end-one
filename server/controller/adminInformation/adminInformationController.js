//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});
//****************************************************************
//Importamos la libreria de MOMENT
const moment = require('moment');
//******************************************************************************
//Importamos OP de SEQUELIZE para las operaciones OR y AND
const Op = require('sequelize').Op;
const sequelize = require('sequelize');
//Importamos el MODELL
const LoginModel = require('../../model/login/loginModel');
const BillModel = require('../../model/adminBill/adminBillModel');
const BusinessModel = require('../../model/adminBusiness/adminBusinessModel');
const CompanyModel = require('../../model/adminCompany/adminCompanyModel');
//****************************************************************
//
const shortid = require('shortid');
//Importamos los SERVICE 
const fs = require('fs');
//=================================================================
//Lectura de la informacion de Login Usuario
exports.createInformationPdf = async(req, res) => {
    // res.json({ uno : req.usuario});
    const role = req.user.role;
    const identifier = req.user.identifier;
    //
    const {identifierbus, year, month } = req.body;
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
            //Constantes
            let cadena = '';
            let porcentaje = 0.13;
            let iva = 0;
            let state = '';
            // LECTURA DE INFORMACION SOLO ALL => ADMIN, USER / (super admin)
            const consultationDataAll  = await BillModel.findAll({
                where : {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('MONTH', sequelize.col('datepresentbill')), month), 
                        sequelize.where(sequelize.fn('YEAR', sequelize.col('datepresentbill')), year),
                        {identifierbus : identifierbus},
                    ]
                },
                raw : true
            });
            const consultationDataCompany = await BusinessModel.findAll({
                where : {
                    identifierbus : identifierbus
                },
                raw : true,
                attributes: ['identifiercom', 'namebus', 'placebus', 'directionbus', 'citybus']
            })
            const consultationDataCompanyAll = await CompanyModel.findAll({
                where : {
                    identifiercom : consultationDataCompany[0].identifiercom
                },
                raw : true,
                attributes: ['nitcom', 'namecom', 'telephonecom']
            })
            consultationDataAll.map( element => {
                if(element.conditionbill === 'pagado'){
                    state = 'V';
                }else{
                    state = 'A';
                }
                iva = element.totalbill * porcentaje;
                cadena = `${element.nitbill}|${element.reasonbill}|${element.numberbill}|${consultationDataCompanyAll[0].nitcom}|${moment(element.datepresentbill).format("DD/MM/YYYY").toString().replace(/\b0/g, '')}|${element.totalbill}|0|0|${element.totalbill}|${parseFloat(iva).toFixed(2)}|${state}|${element.controlcodebill}\r\n${cadena}`;
            })
            let directionEndTxt = `ventas${month}${year}${shortid.generate()}.txt`;
            //
            fs.writeFile(`./public/txt/${directionEndTxt}`, cadena, (err) => {
                if (err) throw err;
            });
            //
            const datainformation = [{
                "namecom": consultationDataCompanyAll[0].namecom,
                "namebus": consultationDataCompany[0].namebus,
                "placebus": consultationDataCompany[0].placebus,
                "directionbus": consultationDataCompany[0].directionbus,
                "citybus": consultationDataCompany[0].citybus,
                "telephonecom": consultationDataCompanyAll[0].telephonecom,
                "year" : year,
                "month":month,
                "urltxt": `${process.env.DIRECTION_IMG}${directionEndTxt}` 
            }]
            if( consultationDataAll.length  === 0 ){
                res.json({ response : 'empty'})
            }else{
                res.json({ response : 'success' , information : datainformation, data : consultationDataAll  });
            }
        }
    } catch (error) {
        console.log(error)
        res.json({ response : 'fail-server'});
    }
}

//=================================================================
//Lectura de la informacion de Login Usuario
exports.createInformationTxt = async(req, res) => {
    // res.json({ uno : req.usuario});
    const role = req.user.role;
    const identifier = req.user.identifier;
    //
    const {identifierbus, year, month } = req.body;
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
            let lyrics = 'MARCELO POMA\r\nCALLE';
            // write to a new file named 2pac.txt
            fs.writeFile('2pac.txt', lyrics, (err) => {
                // throws an error, you could also catch it here
                if (err) throw err;
                // success case, the file was saved
                res.json({ response : 'success' });
            });
        }
    } catch (error) {
        console.log(error)
        res.json({ response : 'fail-server'});
    }
}