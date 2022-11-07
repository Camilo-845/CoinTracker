//LS (Local Storage)
import * as LS from '../../utils/LocalStorageData';

const initialState = {
  activos: [],
  allactivos: [],
  newsAll: [],
  allNews: [],
  detailsActivos: {},
  historyDataActivo:{},
  historyCoinsDataValue:[],
  walletData:[],
  main_chart_data:[],
  detailsNews: {},
  seeMore: false,
  myAssets:[],
  currentAssetView:"myAssets",
  cotizaciones:[],
  userExchangeHistory: [],
  userReminders: [],
  notificationsNumber: 0,


  user: localStorage.getItem(LS.UserKey)
    ? JSON.parse(localStorage.getItem(LS.UserKey) as string)
    : {},

  userID: localStorage.getItem(LS.UserIdKey)
  ? JSON.parse(localStorage.getItem(LS.UserIdKey) as string)
  : {},
  userToken: localStorage.getItem(LS.TokenKey)
    ? JSON.parse(localStorage.getItem(LS.TokenKey) as string)
    : '',
};

function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_USER':
      LS.persistLocalStore(LS.UserKey, action.payload);
      return {
        ...state,
        user:action.payload,
      };
    case 'SET_USER_TOKEN':
      LS.persistLocalStore(LS.TokenKey, action.payload);
      return {
        ...state,
        userToken: action.payload,
      };


    case "GET_USERID":
      LS.persistLocalStore(LS.UserIdKey, action.payload);
      return {
        ...state,
        userID: action.payload,
      };
    case 'GET_ACTIVOS':
      return {
        ...state,
        activos: action.payload,
        allactivos: action.payload,
      };
    case 'GET_NAME_ACTIVOS':
      return {
        ...state,
        activos: action.payload,
      };

    case 'POST_MAIL':
      return {
        ...state,
      };
    case 'GET_DETAILS_ACTIVOS': {
      let filter = state.allactivos.filter(
        (el: any) => el.id.toString() === action.payload
      );

      return {
        ...state,
        detailsActivos: filter[0],
      };
    }
    case 'GET_NEWS': {
      const news: any = action.payload[0].new;
      return {
        ...state,
        newsAll: news,
      };
    }
    case 'GET_DETAILS_NEWS': {
      let filterNews = state.allNews.filter(
        (el: any) => el.id === action.payload
      );
      return {
        ...state,
        detailsNews: filterNews,
      };
    }
    case 'GET_SEEMORE': {
      return {
        ...state,
        seeMore: !state.seeMore,
      };
    }
    case "GET_ACTIV_HISTORY_VALUE":{
      let newHistoryData= state.historyCoinsDataValue.filter(el=>{
        return el.coinId!=action.payload.coinId||el.belongsWallet!=action.payload.belongsWallet
      }).concat(action.payload);
      return {
        ...state,
        historyCoinsDataValue: newHistoryData,
      }
    }
    case "SET_HISTORY_DATA_ACTIVO":{
      var data =[]
      if(action.payload.belongsWallet===false){
        data = state.historyCoinsDataValue.filter(el=>{
        return el.coinId==action.payload.coinId&&el.belongsWallet==action.payload.belongsWallet
      })
      if(data.length===0){
        data=[{
          labels:[],
          datasets:[]
        }]
      }}else{
        data=[state.main_chart_data]
      }
      return {
        ...state,
        historyDataActivo: data[0],
      }
    }
    case "GET_WALLET_DATA":{
      return{
        ...state,
        walletData:action.payload[0],
        main_chart_data:action.payload[1],
        historyDataActivo:action.payload[1]
      }
    }
    case "SET_CURRENT_ASSET_VIEW":{
      return {
        ...state,
        currentAssetView:action.payload,
      }
    }
    case "SET_MY_ASSETS":{
      return {
        ...state,
        myAssets:[...state.myAssets,action.payload]
      }
    }
    case 'GET_COTIZACIONES':
      return {
        ...state,
        cotizaciones: action.payload,
      };

    case 'RESET': {
      localStorage.clear();
      state = initialState;

    }

    case 'SET_EXCHANGE_HISTORY':
      return {
        ...state,
        userExchangeHistory: action.payload,
      };

    case 'GET_REMINDERS':
      return {
        ...state,
        userReminders: action.payload,
      };

    case 'SET_NOTIFICATIONS_NUMBER':
      return {
        ...state,
        notificationsNumber: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
