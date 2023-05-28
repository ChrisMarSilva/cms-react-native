import { combineReducers } from 'redux';

import NavReducer       from './NavReducer';
import AuthReducer      from './AuthReducer';
import HomeReducer      from './HomeReducer';
import PortfolioReducer from './PortfolioReducer';
import OperacoesReducer from './OperacoesReducer';
import ProventosReducer from './ProventosReducer';
import ApuracaoReducer  from './ApuracaoReducer';
import AnaliseReducer  from './AnaliseReducer';

export default combineReducers({
    nav: NavReducer,
    AuthReducer,
    HomeReducer,
    PortfolioReducer,
    OperacoesReducer,
    ProventosReducer,
    ApuracaoReducer,
    AnaliseReducer
});