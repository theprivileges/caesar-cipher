/* @flow */
import * as React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useAppState, updateShift } from './context/app'

const shiftValues = [...Array(25).keys()];


const Shift = () => {
    const [state, dispatch] = useAppState();
    const { shift } = state;

    const onChange = (e: SyntheticInputEvent<HTMLSelectElement>) : void => {
        const value = Number.parseInt(e.target.value, 10);
        dispatch(updateShift(value))
    };

    return (
        <FormControl>
            <InputLabel htmlFor="delta">Delta</InputLabel>
            <Select
                id="delta"
                name="delta"
                value={shift}
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
 };

export default Shift;