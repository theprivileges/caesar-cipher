/* @flow */
import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { useAppState, updateEncrypted, updateText } from './context/app';
import { encrypt } from './utils/index';


const EncryptedText = () => {
    const [state, dispatch] = useAppState();
    const { encrypted, shift } = state;

    const onChange = (e: SyntheticInputEvent<HTMLInputElement>) : void => {
        const { value } = e.target;
        dispatch(updateEncrypted(value));
        dispatch(updateText(encrypt(value, shift)));
    };

    return ( 
        <TextField
            id="encrypted"
            name="encrypted"
            label="Encrypted Text"
            value={encrypted}
            onChange={onChange}
            fullWidth />
    );
 };

export default EncryptedText;