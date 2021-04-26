//-----------------------------------------------------------------
//

const generateInvoice = (valor1, valor2, valor3, valor4, valor5, valor6, valor7, valor8, valor9, valor10, valor11, valor12, valor13, valor14, valor15, valor16, valor17, valor18, valor19, valor20, valor21, valor22, valor23, valor24, valor25) => {    
    
    let htmlCode = '';
    let htmlCodeEnd = '';
    let key = 1;
    const datosProducts = valor19.split('|');
    console.log(datosProducts);
    datosProducts.map( e => {
        let date = e.split('&')
        htmlCode = `
            <tr>
              <td>${key}</td>
              <td>${date[0]} (${date[1]})</td>
              <td>${date[2]}</td>
              <td>${date[3]}</td>
              <td>${date[4]}</td>
            </tr>
        `;
        htmlCodeEnd = htmlCodeEnd + htmlCode;
        key = key + 1;
    })
    
    // valor19.map( e => {
    //     htmlCode = `
    //         <p>${e}</p>
    //     `;
    //     htmlCodeEnd = htmlCodeEnd + htmlCode;
    //     console.log(e);
    // })
    const content = `
        <!doctype html>
            <html>
               <head>
                    <meta charset="utf-8">
                    <title>PDF Result Template</title>
                    <style>
                    .container{
                        width: 960px;
                        height: 1210px;
                        padding : 40px 20px;
                        border: dotted 2px black;
                        font-family: Arial, Helvetica, sans-serif;
                    }
                    .row-1{
                        height: 250px;
                    }
                    .row-2{
                        height: 60px;
                    }
                    .row-3{
                        height: 650px;
                    }
                    .row-4{
                        height: 200px;
                    }
                    .row-5{
                        height: 50px;
                    }
                    /*  */
                    .hijos-0 {
                        width: 385px;
                        height: 250px;
                        float: left;
                        text-align: center;
                        font-size: 12px;
                    }
                    .hijos-1 {
                        width: 190px;
                        height: 250px;
                        float: left;
                        text-align: center;
                        font-size: 12px;
                    }
                    .hijos-2 {
                        width: 355px;
                        height: 250px;
                        float: left;
                        padding-right: 15px;
                        padding-left: 15px;
                        text-align: center;
                        font-size: 12px;
                    }
                    /*  */
                    .hijos-3 {
                        width: 600px;
                        height: 60px;
                        padding-left: 40px;
                        float: left;
                        line-height: 20px;
                    }
                    .hijos-4 {
                        width: 320px;
                        height: 60px;
                        float: left;
                    }
                    /*  */
                    .hijos-5{
                        width: 695px;
                        height: 188px;
                        padding-right: 15px;
                        padding-left: 30px;
                        float: left;
                        margin-bottom: 10px;
                        border-top: dashed 1px black;
                        border-bottom: dashed 1px black;

                    }
                    .hijos-6{
                        width: 220px;
                        height: 200px;
                        float: left;
                        text-align: center;
                    }
                    /*  */
                    .text-company{
                        font-size: 17px;
                    }
                    /*  */
                    .text-invoice{
                        font-size: 26px;
                    }
                    /*  */
                    .nit strong{
                        font-size: 16px;
                    }
                    .container-number-nit{
                        padding: 10px;
                        border: dashed 1px black;
                        border-radius: 10px;
                        font-size: 13px;
                        line-height: 30px;
                    }
                    /*  */
                    .container-reason{
                        font-size: 14px;
                    }
                    .container-nit-client{
                        font-size: 14px;
                    }
                    /*  */
                    .text-activity-economic{
                        font-size: 15px;
                    }
                    .text-activity-economic-text{
                        font-size: 14px;
                    }
                    /*  */
                    .detail-invoice{
                        border-top:  dashed 1px black;
                        border-bottom: dashed 1px black;
                        text-align: center;
                        font-size: 16px;
                        padding-top: 10px;
                        padding-bottom: 10px;
                    }
                    /*  */
                    .table-invoice table{
                        width: 100%;
                        text-align: left;
                        margin-top: 15px;
                        padding-left: 30px;
                        padding-right: 30px;
                    }
                    table th {
                        border-top: 1px solid black;
                        border-bottom: 1px solid black;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        font-size: 15px;
                    }
                    table td{
                        padding-top: 5px;
                        font-size: 13px;
                    }
                    .table-1{
                        width: 100px;
                    }
                    .table-2{
                        width: 100px;
                    }
                    .table-3{
                        width: 400px;
                    }
                    .table-4{
                        width: 150px;
                    }
                    .table-5{
                        width: 150px;
                    }
                    .total{
                        text-align: right;
                        font-size: 14px;
                    }
                    /*  */
                    .container-footer-text{
                        line-height: 40px;
                        font-size: 14px;
                    }
                    .user{
                        font-size: 12px;
                    }
                    /*  */
                    .container-footer-unique{
                        text-align: center;
                        font-size: 13px;
                        line-height: 20px;
                    }
                    /* 
                            TEXT COMPANY                    17PX
                            SUCURSALES                      12PX
                            FACTURA                         26PX
                            NIT                             18PX
                            CONTAINER INVOCE                15PX
                            TITUTO ACTIVIDAD ECONOMICA      17PX
                            NIT                             20PX
                     */
                    </style>
                </head>
            <body>
                <div class="container">
                    <div class="row-1">
                        <div class="hijos-0">
                                <img src="data:image/png;base64,${valor1}" alt="" width="280px" height="100px">
                                <div class="text-company"><strong>${valor3}</strong> </div>
                                <div class="text-company"><strong>CASA MATRIZ</strong> </div><br>
                                <div>${valor4}</div>
                                <div>${valor5}</div>
                                <div>${valor6} - Bolivia</div><br>
                                <div>${valor7}</div>
                        </div>
                        <div class="hijos-1">
                            <div class="seccion-2">
                                <div>${valor8}</div>
                                <div>${valor9}</div>
                                <div>${valor10}</div>
                                <div>${valor11} - Bolivia</div><br><br>
                                <div class="text-invoice"><strong>FACTURA</strong></div>
                            </div>
                        </div>
                        <div class="hijos-2">
                                <div class="container-number-nit">
                                    <div class="nit"><strong>NIT ${valor12}</strong></div>
                                    <div><strong>NUMERO DE FACTURA N°: </strong>${valor13}</div>
                                    <div><strong>NUMERO AUTORIZACION N°: </strong>${valor14}</div>
                                </div><br>
                                <div><strong>ORIGINAL</strong></div><br>
                                <div class="text-activity-economic"><strong>ACTIVIDAD ECONOMICA</strong></div><br>
                                <div class="text-activity-economic-text">${valor15}</div>
                        </div>
                    </div>
                    <div class="row-2">
                        <div class="hijos-3">
                            <div class="container-reason">
                                <div><strong>FECHA : </strong>${valor16}</div>
                                <div><strong>Razon Social : </strong>${valor17}</div>
                            </div>
                        </div>
                        <div class="hijos-4">
                            <div class="container-nit-client">
                                <div><strong>NIT/CI : </strong>${valor18}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row-3">
                        <div class="detail-invoice"><strong>DETALLE DE FACTURA</strong></div>
                        <div class="table-invoice">
                            <table>
                                <tr class="subtitulo-table">
                                  <th class="table-1">Nro</th>
                                  <th class="table-3">DESCRIPCION</th>
                                  <th class="table-2">CANTIDAD</th>
                                  <th class="table-4">P/UNIT</th>
                                  <th class="table-5">TOTAL</th>
                                </tr>
                                ${htmlCodeEnd}
                                <tfoot class="footer-table">
                                    <tr>
                                      <th class="total" colspan="4">IMPORTE TOTAL DE LA FACTURA Bs :</th>
                                      <th> ${valor20}</th>
                                    </tr>
                                </tfoot>
                              </table>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div class="row-4">
                        <div class="hijos-5">
                            <div class="container-footer-text">
                                <div><strong>SON : </strong>${valor21}</div>
                                <div><strong>CODIGO CONTROL : </strong>${valor22}</div>
                                <div><strong>FECHA LIMITE DE EMISION : </strong>${valor23}</div>
                                <div class="user"><strong>Usuario : </strong>${valor24}</div>
                            </div>
                        </div>
                        <div class="hijos-6">
                            <img src="${valor2}" alt="" width="200px" height="200px">
                        </div>
                    </div>
                    <div class="row-5">
                        <div class="container-footer-unique">
                           <div><strong>"ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS. EL USO ILÍCITO DE ÉSTA SERÁ SANCIONADO DE ACUERDO A LEY"</strong></div>
                           <div><strong>Ley Nro 453:</strong>  ${valor25}</div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `;
    return content;
}

module.exports.generateInvoice = generateInvoice;