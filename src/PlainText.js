/* @flow */
import * as React from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {
    value: string,
    onChange: <T>(SyntheticInputEvent<HTMLInputElement>) => void
}

const shouldUpdate = (prevProps: Props, nextProps: Props) : bool => prevProps.value === nextProps.value;

const PlainText = ({value, onChange}: Props) => (
    <TextField
        id="plain"
        name="plain"
        label="Plain Text"
        value={value}
        onChange={onChange}
        fullWidth />
);

export default React.memo<Props>(PlainText, shouldUpdate)