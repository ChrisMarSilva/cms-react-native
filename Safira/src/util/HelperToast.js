
import { WModal, WToast, WSnackBar } from 'react-native-smart-tip'

const displayMessage = ( text = 'Falha Geral', cor = '#3aafff' ) => {
    WSnackBar.show({data: text, position: WSnackBar.position.TOP, duration: WSnackBar.duration.LONG, textColor: '#ffffff', backgroundColor: cor, height: 70 })
}

export const displayMsgSuccess = ( text = '' ) => {
    displayMessage(text, '#059918')
}

export const displayMsgError = (text = '' ) => {
    displayMessage(text, '#c94040')
}

export const displayMsgInfo = (text = '' ) => {
    displayMessage(text, '#3aafff')
}

export const displayMsgWarning = (text = '' ) => {
    displayMessage(text, '#ffcb06')
}


// Sucesso    - this.props.txtMsgSuccess  - '#18ab2b' '#059918'  '#09b700'
// Erro       - this.props.txtMsgError    - '#c94040'
// Informação - this.props.txtMsgInfo     - '#3aafff'
// Aviso      - this.props.txtMsgWarning  - '#ffcb06' '#ff490b'  '#444444'

// WToast.show({data: this.props.txtErroLogin, textColor: '#fff', backgroundColor: '#c94040', position: WToast.position.BOTTOM, duration: WToast.duration.LONG, icon: <FontAwesome name="close" color={'#fff'} size={30} />}) 
// WSnackBar.show({ data: this.props.txtErroLogin, position: WSnackBar.position.TOP, duration: WSnackBar.duration.LONG, textColor: '#ffffff', backgroundColor: '#c94040', height: 70, /* actionText: 'OK', actionTextColor: '#ffffff', onActionHide: (isSlideHide) => { WToast.show({data:isSlideHide ? 'Sliding hide' : 'Click to hide'}) }, */ })
// WModal.show({data: this.props.txtErroLogin, textColor: '#fff', backgroundColor: '#3aafff', position: WModal.position.CENTER, icon: <FontAwesome name="close" color={'#fff'} size={30} />, onRequestClose: ()=>{ }, })
// setTimeout(function(){ WModal.hide() }, 3000)
