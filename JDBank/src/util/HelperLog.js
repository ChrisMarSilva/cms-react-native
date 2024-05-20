import 'react-native-console-time-polyfill'

export const entrada = (nome) => {
	try {
		console.time(nome)
		const d = new Date()
		const hours = d.getHours()
		const minutes = d.getMinutes()
		const seconds = d.getSeconds()
		const milliseconds = d.getMilliseconds()
		//console.log(nome+'.Inicio');
		//console.log(`${hours}:${minutes}:${seconds},${milliseconds}: ${nome}.Inicio`);
		console.log(`${nome}.Inicio: ${hours}:${minutes}:${seconds},${milliseconds}`)
	} catch (err) {
	} finally {
	}
}

export const saida = (nome) => {
	try {
		console.timeEnd(nome)
		const d = new Date()
		const hours = d.getHours()
		const minutes = d.getMinutes()
		const seconds = d.getSeconds()
		const milliseconds = d.getMilliseconds()
		//console.log(nome+'.Fim');
		//console.log(`${hours}:${minutes}:${seconds},${milliseconds}: ${nome}.Fim`);
		console.log(`${nome}.Fim: ${hours}:${minutes}:${seconds},${milliseconds}`)
	} catch (err) {
	} finally {
	}
}

export const erro = (nome, erro) => {
	try {
		const d = new Date()
		const hours = d.getHours()
		const minutes = d.getMinutes()
		const seconds = d.getSeconds()
		const milliseconds = d.getMilliseconds()
		//console.log(nome+'.Erro: ',erro);
		//console.log(`${hours}:${minutes}:${seconds},${milliseconds}: ${nome}.Erro: ${erro}`);
		console.log(`${nome}.Erro: ${hours}:${minutes}:${seconds},${milliseconds}: ${erro}`)
	} catch (err) {
	} finally {
	}
}

export const texto = (nome, texto) => {
	try {
		const d = new Date()
		const hours = d.getHours()
		const minutes = d.getMinutes()
		const seconds = d.getSeconds()
		const milliseconds = d.getMilliseconds()
		//console.log(nome+'.Texto:',texto);
		//console.log(`${hours}:${minutes}:${seconds},${milliseconds}: ${nome}.Texto: ${texto}`);
		console.log(`${nome}.Texto: ${hours}:${minutes}:${seconds},${milliseconds}: ${texto}`)
	} catch (err) {
	} finally {
	}
}

export const datahora = (nome) => {
	try {
		const d = new Date()
		const hours = d.getHours()
		const minutes = d.getMinutes()
		const seconds = d.getSeconds()
		const milliseconds = d.getMilliseconds()
		console.log(`${nome}.DataHora: ${hours}:${minutes}:${seconds},${milliseconds}`)
	} catch (err) {
		console.log(nome + '.DataHora:', err.messag)
	} finally {
	}
}
