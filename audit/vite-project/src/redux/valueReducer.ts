import {createAction, createReducer } from '@reduxjs/toolkit'

export interface ValueInterface {
    text:string;
    completed:boolean;
    order:number
}


interface ActionRequestInterface<T> {
    type: string;
    data: T;
    isOnline?: boolean;
    token?:string;
}
export const addValue = createAction<ActionRequestInterface<ValueInterface>>('values/add');
export const removeValue = createAction<ActionRequestInterface<number>>('values/remove');


const reducer = createReducer([] as ValueInterface[], (builder) => {
   builder
       .addCase(addValue, (state, action) => {
           return [...state, action.payload.data]
       }) 
       .addCase(removeValue, (state, action) => {
           // if(action.payload.isOnline){
           //     return state
           // }
           return [...state.filter(value => value.order !== action.payload.data)]
       })
});

export default reducer