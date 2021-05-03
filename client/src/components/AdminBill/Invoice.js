import React, { Fragment, useContext } from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
//****************************************************************
//
import anulate from "../../resource/img/anulado.jpg";
//*******************************************************
//
// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const Invoice = ({ type, arraybillprint }) => {
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  const datosProducts = arraybillprint.productsencoded.split("|");

  //-------------------------------------------------------
  //ZONE USE - CONTEX
  // const { arraybillprint } = useContext(billContext);
  //-------------------------------------------------------
  //
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
      padding: 25,
    },
    //
    section_1: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "transparent",
      width: "100%",
      height: "25%",
    },
    section_1_1: {
      backgroundColor: "transparent",
      width: "40%",
      textAlign: "center",
      justifyContent: "center",
      fontSize: 10,
    },
    section_1_2: {
      backgroundColor: "transparent",
      width: "30%",
      textAlign: "center",
      fontSize: 10,
    },
    section_1_3: {
      backgroundColor: "white",
      width: "40%",
    },
    container_bill: {
      borderStyle: "dashed",
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 2,
      fontSize: 11,
      textAlign: "center",
      padding: 10,
      marginBottom: 10,
    },
    container_activity: {
      fontSize: 10,
      textAlign: "center",
    },
    text_title: {
      fontSize: 20,
      fontWeight: "bolder",
      marginTop: 10,
    },
    tipe_bill: {
      fontSize: 11,
    },
    title_activity: {
      fontSize: 13,
      fontWeight: 900,
      marginBottom: 5,
    },
    activity_economic: {
      fontSize: 10,
      fontWeight: "bolder",
      paddingLeft: 5,
      paddingRight: 5,
    },
    //
    section_2: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "transparent",
      width: "100%",
      height: "5%",
    },
    section_2_1: {
      backgroundColor: "white",
      width: "50%",
    },
    section_2_1_1: {
      display: "flex",
      flexDirection: "row",
      fontSize: 10,
    },
    section_2_1_1_1: {
      display: "flex",
      flexDirection: "row",
      fontSize: 10,
      marginBottom: 10,
    },
    section_2_2: {
      backgroundColor: "blue",
      width: "50%",
    },
    section_3: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "transparent",
      width: "100%",
      height: "45%",
      padding: 5,
    },
    section_3_1: {
      fontSize: 12,
      fontWeight: "bolder",
      width: "100%",
      textAlign: "center",
      paddingBottom: 10,
      paddingTop: 10,
      borderTopStyle: "solid",
      borderWidth: 1,
      borderColor: "black",
    },
    section_3_2: {
      width: "100%",
      flexDirection: "row",
      fontWeight: "bolder",
      backgroundColor: "#D7D5D5",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "black",
      fontSize: 10,
      padding: 10,
    },
    section_3_2_1: {
      width: "5%",
    },
    section_3_2_2: {
      width: "45%",
    },
    section_3_2_3: {
      width: "15%",
      textAlign: "center",
    },
    section_3_2_4: {
      width: "17.5%",
      textAlign: "right",
    },
    section_3_2_5: {
      width: "17.5%",
      textAlign: "right",
    },
    //
    section_3_2_1_1: {
      width: "100%",
      flexDirection: "row",
      fontSize: 9,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 4,
    },
    section_3_2_1_1_1: {
      width: "5%",
      textAlign: "center",
    },
    section_3_2_2_1_1: {
      width: "45%",
    },
    section_3_2_3_1_1: {
      width: "15%",
      textAlign: "center",
    },
    section_3_2_4_1_1: {
      width: "17.5%",
      textAlign: "right",
    },
    section_3_2_5_1_1: {
      width: "17.5%",
      textAlign: "right",
    },
    //1
    section_3_3: {
      textAlign: "right",
      fontWeight: "bolder",
      borderStyleTop: "solid",
      borderWidth: 1,
      borderColor: "black",
      fontSize: 11,
      marginTop: 10,
      padding: 10,
    },
    //
    section_4: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "transparent",
      borderStyleTop: "dashed",
      borderWidth: 1,
      borderColor: "black",
      width: "100%",
      height: "20%",
    },
    section_4_1: {
      backgroundColor: "transparent",
      width: "70%",
      fontSize: 10,
      padding: 20,
    },
    section_4_2: {
      backgroundColor: "transparent",
      width: "30%",
    },
    section_5: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      fontSize: 10,
      textAlign: "center",
      padding: 20,
      width: "100%",
      height: "10%",
    },
    image: {
      width: "100%",
      height: "50%",
    },
    image_qr: {
      width: "80%",
    },
    text_casa_matriz: {
      marginBottom: 4,
    },
    title_data: {
      fontWeight: "bolder",
      fontSize: 10,
    },
    img_anulate: {
      width: "40%",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.section_1}>
            <View style={styles.section_1_1}>
              <Image
                style={styles.image}
                source={arraybillprint.imagecompany}
              />
              <Text>{arraybillprint.namecom}</Text>
              <Text style={styles.text_casa_matriz}>CASA MATRIZ</Text>
              <Text>{arraybillprint.directioncom}</Text>
              <Text>{arraybillprint.placecom}</Text>
              <Text>{arraybillprint.citycom} - Bolivia</Text>
              <Text>{arraybillprint.telephonecom}</Text>
            </View>
            <View style={styles.section_1_2}>
              <Text>{arraybillprint.namebus}</Text>
              <Text>{arraybillprint.directionbus}</Text>
              <Text>{arraybillprint.placebus}</Text>
              <Text>{arraybillprint.citybus} - Bolivia</Text>
              <Text style={styles.text_title}>Factura</Text>
            </View>
            <View style={styles.section_1_3}>
              <View style={styles.container_bill}>
                <Text>NIT {arraybillprint.nitcom}</Text>
                <Text>NUMERO DE FACTURA {arraybillprint.invoicenumber}</Text>
                <Text>
                  Numero de Autorización : {arraybillprint.authorizationNumber}
                </Text>
              </View>
              <View style={styles.container_activity}>
                <Text style={styles.tipe_bill}>{type}</Text>
                <Text style={styles.title_activity}>Actividad Economica</Text>
                <Text style={styles.activity_economic}>
                  {arraybillprint.activityeconomic}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.section_2}>
            <View style={styles.section_2_1}>
              <View style={styles.section_2_1_1}>
                <Text style={styles.title_data}>FECHA : </Text>
                <Text>{arraybillprint.datepresentbill}</Text>
              </View>
              <View style={styles.section_2_1_1}>
                <Text style={styles.title_data}>RAZON SOCIAL : </Text>
                <Text>{arraybillprint.reasonbill}</Text>
              </View>
            </View>
            <View style={styles.section_2_1_1}>
              <Text style={styles.title_data}>NIT/CI : </Text>
              <Text>{arraybillprint.nitbill}</Text>
            </View>
          </View>
          <View style={styles.section_3}>
            <View style={styles.section_3_1}>
              <Text>DETALLE DE LA FACTURA</Text>
            </View>
            {/* ------------------------- ********** ------------------------- */}
            <View style={styles.section_3_2}>
              <View style={styles.section_3_2_1}>
                <Text>Nro</Text>
              </View>
              <View style={styles.section_3_2_2}>
                <Text>DESCRIPCION</Text>
              </View>
              <View style={styles.section_3_2_3}>
                <Text>CANTIDAD</Text>
              </View>
              <View style={styles.section_3_2_4}>
                <Text>P/UNIT</Text>
              </View>
              <View style={styles.section_3_2_5}>
                <Text>TOTAL</Text>
              </View>
            </View>

            {/* ------------------------- ********** ------------------------- */}
            {datosProducts.map((e) => {
              let date = e.split("&");
              return (
                <View style={styles.section_3_2_1_1}>
                  <View style={styles.section_3_2_1_1_1}>
                    <Text>1</Text>
                  </View>
                  <View style={styles.section_3_2_2_1_1}>
                    <Text>
                      {date[0]} ( {date[1]} )
                    </Text>
                  </View>
                  <View style={styles.section_3_2_3_1_1}>
                    <Text>{date[2]}</Text>
                  </View>
                  <View style={styles.section_3_2_4_1_1}>
                    <Text>{date[3]}</Text>
                  </View>
                  <View style={styles.section_3_2_5_1_1}>
                    <Text>{date[4]}</Text>
                  </View>
                </View>
              );
            })}

            {arraybillprint.conditionbill === "anulado" ? (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    color: "red",
                    fontSize: 40,
                  }}
                >
                  ANULADO
                </Text>
              </View>
            ) : null}

            {/* ------------------------- ********** ------------------------- */}
            <View style={styles.section_3_3}>
              <Text>
                IMPORTE TOTAL FACTURA : {arraybillprint.amounttransaction} (Bs)
              </Text>
            </View>
          </View>
          <View style={styles.section_4}>
            <View style={styles.section_4_1}>
              <View style={styles.section_2_1_1_1}>
                <Text style={styles.title_data}>SON: </Text>
                <Text>{arraybillprint.numberstring}</Text>
              </View>
              <View style={styles.section_2_1_1_1}>
                <Text style={styles.title_data}>CODIGO DE CONTROL : </Text>
                <Text>{arraybillprint.codegenerate}</Text>
              </View>
              <View style={styles.section_2_1_1_1}>
                <Text style={styles.title_data}>
                  FECHA LIMITE DE EMISION :{" "}
                </Text>
                <Text>{arraybillprint.dateenddos}</Text>
              </View>
              <View style={styles.section_2_1_1_1}>
                <Text style={styles.title_data}>Usuario : </Text>
                <Text>{arraybillprint.identifier}</Text>
              </View>
            </View>
            <View style={styles.section_4_2}>
              <Image style={styles.image_qr} source={arraybillprint.imageqr} />
            </View>
          </View>
          <View style={styles.section_5}>
            <Text>
              ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS. EL USO ILÍCITO DE
              ÉSTA SERÁ SANCIONADO DE ACUERDO A LEY
            </Text>
            <Text>Legenda 453 : {arraybillprint.legenddos}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
