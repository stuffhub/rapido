import { createStore } from 'redux';
import rapidoReducer from './reducers';

import shortid from "shortid";

const initialState = {
    rapidoResult: [],
    rapidoFieldsValue: [],
    rapidoActiveNumbers: [],
    rapidoFields: [
        {
            id: shortid.generate(),
            title: "Поле 1",
            hint: "Отметьте 8 чисел.",
            sum: 19,
            limit: 8,
            numbersList: [],
            counter: 0
        },
        {
            id: shortid.generate(),
            title: "Поле 2",
            hint: "Отметьте 1 число.",
            sum: 2,
            limit: 1,
            numbersList: [],
            counter: 0
        }
    ],
    isWinner: false
};

export const store = createStore(rapidoReducer, initialState);