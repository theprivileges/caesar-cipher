/* @flow */
import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const { useState, useEffect } = React;

type ThemeObject = {
    spacing: (number) => string,
    palette: {
        text: {
            secondary: string
        }
    }
};

type useStylesObject = {
    paper: {
        padding: string,
        color: string,
    },
    delta: {
        padding: string,
        textAlign: string,
    }
};

type useStylesFunction = (void) => { delta: string, paper: string};

const makeStylesCb = (theme: ThemeObject) : useStylesObject => ({
    delta: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
})


const useStyles: useStylesFunction = makeStyles(makeStylesCb);


const upper = (delta: number) => (letter: string) => String.fromCharCode((letter.charCodeAt(0) + delta - 65) % 26 + 65);
const lower = (delta: number) => (letter: string) => String.fromCharCode((letter.charCodeAt(0) + delta - 97) % 26 + 97);
const encrypt = (text: string, delta: number) => text.replace(/[A-Z]/g, upper(delta)).replace(/[a-z]/g, lower(delta));

const shiftValues = [...Array(24).keys()];

function App(): React.Node {
    const classes = useStyles();
    const [text: string, setText] = useState('');
    const [encrypted: string, setEncrypted] = useState('');
    const [delta: number, setDelta] = useState(0);

    const handleDeltaChange = (e: SyntheticInputEvent<HTMLSelectElement>) : void => {
        const value = Number.parseInt(e.target.value, 10);
        setDelta(value);
    }

    const handleTextChange = (e: SyntheticInputEvent<HTMLInputElement>) : void => {
        const { value } = e.target;
        setText(value);
        setEncrypted(encrypt(value, delta));
    }

    const handleEncryptedChange = (e: SyntheticInputEvent<HTMLInputElement>) : void => {
        const { value } = e.target;
        setEncrypted(value);
        setText(encrypt(value, delta));
    }

    // Reset Text and Encrypted if we change the delta
    useEffect(() => {
        setText('')
        setEncrypted('')
    }, [delta])

    return (
        <Container size="sm">
            <Typography align="center" component="h1" variant="h2" gutterBottom>
                Caesar Cipher
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.delta} elevation={0}>
                        <FormControl>
                            <InputLabel htmlFor="delta">Delta</InputLabel>
                            <Select
                                id="delta"
                                name="delta"
                                value={delta}
                                onChange={handleDeltaChange}
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
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={0}>
                        <TextField
                            id="plain"
                            name="plain"
                            label="Plain Text"
                            value={text}
                            onChange={handleTextChange}
                            fullWidth />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={0}>
                        <TextField
                            id="encrypted"
                            name="encrypted"
                            label="Encrypted Text"
                            value={encrypted}
                            onChange={handleEncryptedChange}
                            fullWidth />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
  );
}

export default App;
