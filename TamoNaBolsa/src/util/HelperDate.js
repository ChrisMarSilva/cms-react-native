//import moment from 'moment';

//moment(date).format('DD-MMM-YYYY')
// moment().format('MMMM Do YYYY, h:mm:ss a'); // setembro 30º 2018, 5:37:36 pm
// moment().format('dddd');                    // Domingo
// moment().format("MMM Do YY");               // set 30º 18
// moment().format('YYYY [escaped] YYYY');     // 2018 escaped 2018
// moment().format();                         

// moment.locale();         // pt-br
// moment().format('LT');   // 17:38
// moment().format('LTS');  // 17:38:29
// moment().format('L');    // 30/09/2018
// moment().format('l');    // 30/9/2018
// moment().format('LL');   // 30 de setembro de 2018
// moment().format('ll');   // 30 de set de 2018
// moment().format('LLL');  // 30 de setembro de 2018 às 17:38
// moment().format('lll');  // 30 de set de 2018 às 17:38
// moment().format('LLLL'); // Domingo, 30 de setembro de 2018 às 17:38
// moment().format('llll');

export const getAnoAtual=()=>{
    let data = new Date();
    return data.getFullYear();	
}

export const getDataAtual=()=>{
    let data = new Date();
    let dia  = ("0" + data.getDate()).substr(-2);
    let mes  = ("0" + (data.getMonth() + 1)).substr(-2) ;
    let ano  = data.getFullYear();
    return [ ano, mes, dia].join('-');	
}

export const getPrimeiraDataMes=()=>{
    let data            = new Date();
    let DataPrimeiroDia = new Date(data.getFullYear(), data.getMonth(), 1);
    let dia             = ("0" + DataPrimeiroDia.getDate()).substr(-2);
    let mes             = ("0" + (DataPrimeiroDia.getMonth() + 1)).substr(-2) ;
    let ano             = DataPrimeiroDia.getFullYear();
    return [ ano, mes, dia].join('-');
}

export const getUltimaDataMes=()=>{
    let data            = new Date();
    let DataUltimoDia   = new Date(data.getFullYear(), data.getMonth() + 1, 0);
    let dia             = ("0" + DataUltimoDia.getDate()).substr(-2);
    let mes             = ("0" + (DataUltimoDia.getMonth() + 1)).substr(-2) ;
    let ano             = DataUltimoDia.getFullYear();
    return [ ano, mes, dia].join('-');		
}

export const getPrimeiraDataAno=()=>{
    let data = new Date();
    let dia  = "01";
    let mes  = "01";
    let ano  = data.getFullYear();
    return  [ ano, mes, dia].join('-');
}

export const getUltimaDataAno=()=>{
    let data = new Date();
    let dia  = "31";
    let mes  = "12";
    let ano  = data.getFullYear();
    return [ ano, mes, dia].join('-');
}

export const tirarFormacataoData=(valor)=>{
    valor = removeLetra(valor, '/');
    valor = removeLetra(valor, '-');  
    valor = removeLetra(valor, ' ');  
    valor = removeLetra(valor, ':');  
    return valor;
}

export const tirarFormacataoDataReact=(valor)=>{
    valor = tirarFormacataoData(valor);   // valor = 15/02/2018 => 15022018
    if ( valor != "" ) valor = valor.substring(4,8) + valor.substring(2,4) + valor.substring(0,2);
    return valor;
}

export const colcarFormacataoData=(valor)=>{
    valor = tirarFormacataoData(valor);   // valor = 20180119
    if ( valor != "" )
      valor = valor.substring(6,8) + "/"+valor.substring(4,6)+ "/" + valor.substring(0,4);
    return valor;
}

export const colcarFormacataoDataRect=(valor)=>{
    valor = tirarFormacataoData(valor);   // 20180119 = 2018-01-19
    if ( valor != "" )
      valor = valor.substring(0,4) + "-"+valor.substring(4,6)+ "-" + valor.substring(6,8);
    return valor;
}

export const tirarFormacataoHora=(valor)=>{
    valor = tirarFormacataoData(valor);    // valor = 105959
    if ( valor != "" )
      valor = valor.substring(0,2) + ":"+valor.substring(2,4)+ ":" + valor.substring(4,6);
    return valor;
}

export const colcarFormacataoDataHora=(valor)=>{
    valor = tirarFormacataoData(valor);// valor = 20180119100000
    let data = valor.substring(0, 8);
    let hora = valor.substring(8,14);
    if ( valor != "" )
      valor = colcarFormacataoData( data ) + " " + tirarFormacataoHora( hora );
    return valor;

}

export const removeLetra=(Texto,Letra)=>{
    let ret="",
    c="",
    s=String(Texto);
    for(var i=0;i<s.length;i++){
        c=s.charAt(i);
        if( c != Letra)
        ret+=s.charAt(i);
    }
    return ret;
}