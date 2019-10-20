/* @flow */
import * as React from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {
    value: string,
    onChange: <T>(SyntheticInputEvent<HTMLInputElement>) => void
}

const shouldUpdate = (prevProps: Props, nextProps: Props) : bool => prevProps.value === nextProps.value;

const EncryptedText = ({value, onChange}: Props) => (
    <TextField
        id="encrypted"
        name="encrypted"
        label="Encrypted Text"
        value={value}
        onChange={onChange}
        fullWidth />
);

export default React.memo<Props>(EncryptedText, shouldUpdate)