import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    delta: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

const encrypt = (text, delta) => text.replace(/[a-zA-Z]/g, (letter) => String.fromCharCode(letter.charCodeAt() + delta));
const decrypt = (text, delta) => text.replace(/[a-zA-Z]/g, (letter) => String.fromCharCode(letter.charCodeAt() - delta));

const shiftValues = [...Array(24).keys()];

function App() {
    const classes = useStyles();
    const [text, setText] = useState('');
    const [encrypted, setEncrypted] = useState('');
    const [delta, setDelta] = useState('');

    const handleTextChange = (e) => {
        const { value } = e.target;
        setText(value);
        setEncrypted(encrypt(value, delta));
    }

    const handleEncryptedChange = (e) => {
        const { value } = e.target;
        setEncrypted(value);
        setText(decrypt(value, delta));
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
                                onChange={(e) => setDelta(e.target.value)}
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
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
