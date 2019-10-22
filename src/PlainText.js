/* @flow */
import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { encrypt } from './utils/index';
import { useAppState, updateText, updateEncrypted } from './context/app';

const PlainText = () => { 
    const [state, dispatch] = useAppState();
    const { text, shift } = state;

    const onChange = (e: SyntheticInputEvent<HTMLInputElement>) : void => {
        const { value } = e.target;
        dispatch(updateText(value))
        dispatch(updateEncrypted(encrypt(value, shift)));
    };

    return (
        <TextField
        id="plain"
        name="plain"
        label="Plain Text"
        value={text}
        onChange={onChange}
        fullWidth />
    );
 };

export default PlainText;