import React, { Fragment, useContext } from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";
// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const ReportPdf = ({ arrayinformation, arrayinformationbill }) => {
  let total = 0;
  //-------------------------------------------------------
  //
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      padding: 25,
    },
    //
    section_1: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "12%",
    },
    section_1_1: {
      width: "30%",
      textAlign: "center",
      fontSize: 10,
    },
    title_company: {
      fontSize: 15,
      fontWeight: "bolder",
      marginTop: 10,
    },
    //
    section_2: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "3%",
      textAlign: "center",
    },
    title_arqueo: {
      fontSize: 13,
    },
    //
    section_3: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "3%",
      padding: 5,
      textAlign: "left",
    },
    title_name_business: {
      fontSize: 11,
      fontWeight: "bolder",
    },
    //1
    //
    section_4: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "3%",
      padding: 5,
      textAlign: "center",
    },
    title_date: {
      fontSize: 10,
      fontWeight: "bolder",
    },
    //
    section_5: {
      display: "flex",
      flexDirection: "column",
      fontSize: 10,
      textAlign: "center",
      padding: 10,
      width: "100%",
    },
    section_5_1: {
      width: "100%",
      flexDirection: "row",
      fontWeight: "bolder",
      backgroundColor: "#D7D5D5",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "black",
      fontSize: 9,
      padding: 9,
    },
    section_5_1_1: {
      width: "10%",
    },
    section_5_1_2: {
      width: "20%",
    },
    section_5_1_3: {
      width: "20%",
      textAlign: "center",
    },
    section_5_1_4: {
      width: "30%",
      textAlign: "center",
    },
    section_5_1_5: {
      width: "20%",
      textAlign: "right",
    },
    //
    section_5_2: {
      width: "100%",
      flexDirection: "row",
      fontSize: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 4,
    },
    section_5_2_1: {
      width: "10%",
      textAlign: "center",
    },
    section_5_2_2: {
      width: "20%",
    },
    section_5_2_3: {
      width: "20%",
      textAlign: "center",
    },
    section_5_2_4: {
      width: "30%",
      textAlign: "center",
    },
    section_5_2_5: {
      width: "20%",
      textAlign: "right",
    },
    section_5_3: {
      textAlign: "right",
      fontWeight: "bolder",
      borderStyleTop: "solid",
      borderWidth: 1,
      borderColor: "black",
      fontSize: 10,
      padding: 6,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.section_1}>
            <View style={styles.section_1_1}>
              <Text style={styles.title_company}>
                {arrayinformation[0].namecom}
              </Text>
              <Text>{arrayinformation[0].placebus}</Text>
              <Text>{arrayinformation[0].directionbus}</Text>
              <Text>{arrayinformation[0].citybus} - Bolivia</Text>
              <Text>{arrayinformation[0].telephonecom}</Text>
            </View>
          </View>
          <View style={styles.section_2}>
            <Text style={styles.title_arqueo}>ARQUEO DE CAJA</Text>
          </View>
          <View style={styles.section_3}>
            <Text style={styles.title_name_business}>
              {arrayinformation[0].namebus}
            </Text>
          </View>
          <View style={styles.section_4}>
            <Text style={styles.title_date}>
              Arqueo de mes {arrayinformation[0].month} de la gestion{" "}
              {arrayinformation[0].year}
            </Text>
          </View>
          <View style={styles.section_5}>
            {/* ------------------------- ********** ------------------------- */}
            <View style={styles.section_5_1}>
              <View style={styles.section_5_1_1}>
                <Text>Fecha</Text>
              </View>
              <View style={styles.section_5_1_2}>
                <Text>Numero de Factura</Text>
              </View>
              <View style={styles.section_5_1_3}>
                <Text>Nit</Text>
              </View>
              <View style={styles.section_5_1_4}>
                <Text>Razon Social</Text>
              </View>
              <View style={styles.section_5_1_5}>
                <Text>Total</Text>
              </View>
            </View>
            {/* ------------------------- ********** ------------------------- */}

            {arrayinformationbill.map((e) => {
              total = parseFloat(total) + parseFloat(e.totalbill);
              return (
                <View style={styles.section_5_2}>
                  <View style={styles.section_5_2_1}>
                    <Text>
                      {moment(e.datepresentbill).format("DD/MM/YYYY")}
                    </Text>
                  </View>
                  <View style={styles.section_5_2_2}>
                    <Text>{e.numberbill}</Text>
                  </View>
                  <View style={styles.section_5_2_3}>
                    <Text>{e.nitbill}</Text>
                  </View>
                  <View style={styles.section_5_2_4}>
                    <Text>{e.reasonbill}</Text>
                  </View>
                  <View style={styles.section_5_2_5}>
                    <Text>{e.totalbill}</Text>
                  </View>
                </View>
              );
            })}
            <View style={styles.section_5_3}>
              <Text>Importe Total (Bs): {parseFloat(total).toFixed(2)} </Text>
            </View>
            {/* -------------------------------------------------------------- */}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReportPdf;
