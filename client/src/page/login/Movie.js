import React, { Fragment } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
const Movie = () => {
  const PATH =
    "data:image/jpeg;base64,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";
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
      padding: 30,
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
      width: "10%",
    },
    section_3_2_2: {
      width: "40%",
    },
    section_3_2_3: {
      width: "15%",
    },
    section_3_2_4: {
      width: "17.5%",
      textAlign: "right",
    },
    section_3_2_5: {
      width: "17.5%",
      textAlign: "right",
    },
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
      height: "15%",
      padding: 20,
    },
    section_4_1: {
      backgroundColor: "transparent",
      width: "70%",
      fontSize: 10,
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
      height: "15%",
    },
    image: {
      width: "100%",
      height: "50%",
    },
    text_casa_matriz: {
      marginBottom: 4,
    },
    title_data: {
      fontWeight: "bolder",
      fontSize: 10,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.section_1}>
            <View style={styles.section_1_1}>
              <Image style={styles.image} source={PATH} />
              <Text>LUNA FELIZ</Text>
              <Text style={styles.text_casa_matriz}>CASA MATRIZ new 3</Text>
              <Text>Zona la portada</Text>
              <Text>Calle 2 Bascones</Text>
              <Text>La Paz Bolvia</Text>
              <Text>+589 7894456</Text>
            </View>
            <View style={styles.section_1_2}>
              <Text>Sucursal 1</Text>
              <Text>Calle 2 Bascones</Text>
              <Text>Central</Text>
              <Text>La Paz Bolivia</Text>
              <Text style={styles.text_title}>Factura</Text>
            </View>
            <View style={styles.section_1_3}>
              <View style={styles.container_bill}>
                <Text>NIT 12345678</Text>
                <Text>NUMERO DE FACTURA 1</Text>
                <Text>Numero de Autorización : 123</Text>
              </View>
              <View style={styles.container_activity}>
                <Text style={styles.tipe_bill}>Copia</Text>
                <Text style={styles.title_activity}>Actividad Economica</Text>
                <Text style={styles.activity_economic}>
                  Venta de Galletas y productos en general
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.section_2}>
            <View style={styles.section_2_1}>
              <View style={styles.section_2_1_1}>
                <Text style={styles.title_data}>FECHA : </Text>
                <Text> 24/05/2021</Text>
              </View>
              <View style={styles.section_2_1_1}>
                <Text style={styles.title_data}>RAZON SOCIAL : </Text>
                <Text> Bolivia Joven</Text>
              </View>
            </View>
            <View style={styles.section_2_1_1}>
              <Text style={styles.title_data}>NIT/CI : </Text>
              <Text> 12345677</Text>
            </View>
          </View>
          <View style={styles.section_3}>
            <View style={styles.section_3_1}>
              <Text>DETALLE DE LA FACTURA</Text>
            </View>
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
            <View style={styles.section_3_3}>
              <Text>IMPORTE TOTAL FACTURA : (Bs)</Text>
            </View>
          </View>
          <View style={styles.section_4}>
            <View style={styles.section_4_1}>
              <View style={styles.section_2_1_1_1}>
                <Text style={styles.title_data}>SON: </Text>
                <Text> Doce Bolivianos</Text>
              </View>
              <View style={styles.section_2_1_1_1}>
                <Text style={styles.title_data}>CODIGO DE CONTROL : </Text>
                <Text> ER-SD-12-SD</Text>
              </View>
              <View style={styles.section_2_1_1_1}>
                <Text style={styles.title_data}>
                  FECHA LIMITE DE EMISION :{" "}
                </Text>
                <Text> 24/28/201</Text>
              </View>
              <View style={styles.section_2_1_1_1}>
                <Text style={styles.title_data}>Usuario : </Text>
                <Text> 7892qwer</Text>
              </View>
            </View>
            <View style={styles.section_4_2}>
              <Image style={styles.image} source={PATH} />
            </View>
          </View>
          <View style={styles.section_5}>
            <Text>
              ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS. EL USO ILÍCITO DE
              ÉSTA SERÁ SANCIONADO DE ACUERDO A LEY
            </Text>
            <Text>Legenda 453 : Nurestros camvbios de estructura</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Movie;
