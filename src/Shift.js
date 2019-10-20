/* @flow */
import * as React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const shiftValues = [...Array(24).keys()];

type Props = {
    value: number,
    onChange: <T>(SyntheticInputEvent<HTMLSelectElement>) => void,
}

const shouldUpdate = (prevProps: Props, nextProps: Props) : bool => prevProps.value === nextProps.value;

const Shift = ({value, onChange}: Props): React.Node => (
    <FormControl>
        <InputLabel htmlFor="delta">Delta</InputLabel>
        <Select
            id="delta"
            name="delta"
            value={value}
            onChange={onChange}
        >
            <MenuItem value={0}>
                <em>None</em>
            </MenuItem>
            {shiftValues.map((idx) => (
                <MenuItem key={idx} value={idx + 1}>{idx + 1}</MenuItem>
            ))}
        </Select>
        <FormHelperText>How many letters to shift.</FormHelperText>
    </FormControl>
);

export default React.memo<Props>(Shift, shouldUpdate);