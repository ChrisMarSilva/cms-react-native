
export const colcarFormacataoInteiro = (nr) => String(nr).split('').reverse().join('').split(/(\d{3})/).filter(Boolean).join('.').split('').reverse().join('');

export const MascaraValor = (valor) => valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");

export const MascaraValorMaior = (valor) => valor.toFixed(10).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");

export const MascaraValorSemLimite = (valor) => valor.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 10}).replace(',00', '');

export const isNumber = (n) => !isNaN( parseFloat(n)) && isFinite(n);

export const GetValorDecimal = (Valor) => {
	try {
		let Resultado = 0;
		Resultado = parseFloat( Valor.replace(/\./g, '').replace(',', '.') ).toFixed(2) || 0;
		if( !isNumber(Resultado) ) return 0;	
		return Resultado;	
	} catch (e) {
		return 0;
	} 
}

export const GetValorDecimalMaior = (Valor) => {
	try {
		let Resultado = 0;
		Resultado = parseFloat( Valor.replace(/\./g, '').replace(',', '.') ) || 0;
		if( !isNumber(Resultado) ) return 0;	
		return Resultado;	
		
	} catch (e) {
		return 0;
	} 
}

export const GetValorInteiro = (Valor) => {
	try {
		let Resultado = 0;
		Resultado = parseInt( Valor.replace(/\./g, '') ) || 0;
		if( !isNumber(Resultado) ) return 0;	
		return Resultado;	
	} catch (e) {
		return 0;
	} 
}

export const GetMascaraValorDecimal = (Valor) => {
	try {
		return Valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
	} catch (e) {
		return 0;
	} 
}

export const GetMascaraValorMaiorDecimal = (Valor) => {
	try {
		return Valor.toFixed(10).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
	} catch (e) {
		return 0;
	} 
}
