//================================================================
//
//================================================================
const roundUp = (value) => {        
    //reemplaza (,) por (.)        
    var value2 = value.replace(',', '.');
    //redondea a 0 decimales        
    return Math.round(value2);
}

module.exports.roundUp = roundUp;