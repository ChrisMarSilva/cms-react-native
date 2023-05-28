import 'react-native-console-time-polyfill';

export const entrada = ( nome ) => {
    console.log(nome+'.Inicio');
    console.time(nome);
}

export const saida = ( nome ) => {
    console.timeEnd(nome);
    console.log(nome+'.Fim');
}

export const erro = ( nome, erro ) => {
    console.log(nome+'.Erro: ',erro);
}

export const texto = ( nome, texto ) => {
    console.log(nome+'.Texto: ',texto);
}

