import { NetInfo } from 'react-native';

import * as HelperLog from './HelperLog';

export const getConnection = async () => {
    //HelperLog.entrada('HelperNet.getConnection');
    try {
        
        await NetInfo.getConnectionInfo();
        const isConnected = await NetInfo.isConnected.fetch();

        HelperLog.texto('HelperNet.getConnection', 'isConnected = ' + ( isConnected ? 'True' : 'False' ) );
        //HelperLog.saida('HelperNet.getConnection');

        return isConnected;

    } catch (error) {
        HelperLog.erro('HelperNet.getConnection', err.message);
        //HelperLog.saida('HelperNet.getConnection');
        return false;  
    }
}