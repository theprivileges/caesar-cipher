/* @flow */
import * as React from 'react';

const { createContext, useReducer } = React;

type Action = { type: 'SHIFT_UPDATE', payload: { shift: number} } | { type: 'TEXT_UPDATE', payload: { text: string} } | { type: 'ENCRYPTED_UPDATE', payload: { encrypted: string } };
type State = { shift: number, text: string, encrypted: string };
type Dispatch = (action: Action) => void
type StateProviderProps = { children: React.Node }

const initialState: State = {
    shift: 0,
    text: '',
    encrypted: '',
};

const StateContext = createContext<State | void>(undefined);
const StateDispatchContext = createContext<Dispatch | void>(undefined);


// Actions
const SHIFT_UPDATE = 'SHIFT_UPDATE';
const TEXT_UPDATE = 'TEXT_UPDATE';
const ENCRYPTED_UPDATE = 'ENCRYPTED_UPDATE';

// Action Creators
const updateShift = (shift: number) => ({
    type: SHIFT_UPDATE,
    payload: { shift },
});

const updateText = (text: string) => ({
    type: TEXT_UPDATE,
    payload: { text },
});

const updateEncrypted = (encrypted: string) => ({
    type: ENCRYPTED_UPDATE,
    payload: { encrypted }
});

// Reducer
const reducer = (state: State, action: Action) => {
    switch(action.type) {
        case SHIFT_UPDATE:
            const { shift } = action.payload;
            return { shift, text: '', encrypted: ''};
        case TEXT_UPDATE:
            const { text } = action.payload;
            return { ...state, text };
        case ENCRYPTED_UPDATE:
            const { encrypted } = action.payload;
            return { ...state, encrypted };
        default:
            return {...state};
    }
};

const StateProvider = ({ children } : StateProviderProps) => {
    const [state, dispatch] = useReducer<State, Action>(reducer, initialState);
    return (
        <StateContext.Provider value={state}>
            <StateDispatchContext.Provider value={dispatch}>
                {children}
            </StateDispatchContext.Provider>
        </StateContext.Provider>
    )
};

const useAppStateContext = () => {
    const context = React.useContext(StateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within a StateProvider');
    }
    return context;
};

const useAppDispatchContext = () => {
    const context = React.useContext(StateDispatchContext);
    if (context === undefined) {
        throw new Error('useAppDispatch must be used withint a StateProvider');
    }
    return context;
};

const useAppState = () => [useAppStateContext, useAppDispatchContext];

export {
    useAppState,
    StateProvider,
    updateShift,
    updateText,
    updateEncrypted,
}