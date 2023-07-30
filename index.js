const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const reduxLogger = require("redux-logger")


const applyMiddleware = redux.applyMiddleware

const logger = reduxLogger.createLogger()
const BUY_CAKE = "BUY_CAKE"
const BUY_ICECREAM = "BUY_ICECREAM"

function BuyCake() {
    return {
        type: BUY_CAKE,
        info: "First redux action"
    }
}
function BuyIceCream() {
    return {
        type: BUY_ICECREAM,
        info: "First redux action"
    }
}

const initialCakeState = {
    numOfCakes: 10,
}
const initialIceCreamState = {
    numOfIceCreams: 10
}


const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default: return state
    }
}
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger))

console.log("initial state", store.getState())
const unsubscribe = store.subscribe(() => console.log('updated store', store.getState()))
store.dispatch(BuyCake())
store.dispatch(BuyCake())
store.dispatch(BuyIceCream())
store.dispatch(BuyIceCream())
store.dispatch(BuyIceCream())
unsubscribe()
