import { configureStore } from "@reduxjs/toolkit";


export interface IinitialProps {
   
}

const initialState: IinitialProps = {
    
};

interface stateStore {
    type: string;
}

const changeState = (state = initialState, {type, ...rest}: stateStore) => {
    switch (type) {
        case 'set':
            return {...state, ...rest};
        default:
            return state;
    }
};

const store = configureStore({reducer: changeState});
export default store;