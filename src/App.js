/* @flow */
import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { encrypt } from './utils/index'
import Shift from './Shift';
import PlainText from './PlainText';
import EncryptedText from './EncryptedText';

const { useReducer } = React;

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

const initialState = {
    shift: 0,
    text: '',
    encrypted: '',
};

// Actions
const SHIFT_UPDATE = 'SHIFT_UPDATE';
const TEXT_UPDATE = 'TEXT_UPDATE';
const ENCRYPTED_UPDATE = 'ENCRYPTED_UPDATE';

// Reducer
const reducer = (state, action) => {
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

// Action Creators
const updateShift = (shift) => ({
    type: SHIFT_UPDATE,
    payload: { shift },
});

const updateText = (text) => ({
    type: TEXT_UPDATE,
    payload: { text },
});

const updateEncrypted = (encrypted) => ({
    type: ENCRYPTED_UPDATE,
    payload: { encrypted }
});


function App(): React.Node {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { text, encrypted, shift } = state;

    const handleDeltaChange = (e: SyntheticInputEvent<HTMLSelectElement>) : void => {
        const value = Number.parseInt(e.target.value, 10);
        dispatch(updateShift(value))
    };

    const handleTextChange = (e: SyntheticInputEvent<HTMLInputElement>) : void => {
        const { value } = e.target;
        dispatch(updateText(value))
        dispatch(updateEncrypted(encrypt(value, shift)));
    };

    const handleEncryptedChange = (e: SyntheticInputEvent<HTMLInputElement>) : void => {
        const { value } = e.target;
        const unshift = (26 - shift) % 26;
        dispatch(updateEncrypted(value));
        dispatch(updateText(encrypt(value, unshift)));
    };

    return (
        <Container size="sm">
            <Typography align="center" component="h1" variant="h2" gutterBottom>
                Caesar Cipher
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.delta} elevation={0}>
                        <Shift value={shift} onChange={handleDeltaChange}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={0}>
                        <PlainText value={text} onChange={handleTextChange}/> 
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={0}>
                        <EncryptedText value={encrypted} onChange={handleEncryptedChange}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
  );
}

export default App;
