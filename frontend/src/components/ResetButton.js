import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/appContexts';
import { resetButtonTable } from '../actions/actionCreaters';
import { Button, Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0.5),
    },
}));

function ResetButton(props) {
    const {dispatch} = useContext(AppContext);
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const DoReset = () => {
        resetButtonTable(dispatch);
        setOpen(false);
    }

    return (
        <div>
            <Button className={classes.root} onClick={handleClickOpen} variant="contained" color="secondary" size="big">
                Reset
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Do you really want to reset?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once you reset, never to recover.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Not yet
                    </Button>
                    <Button onClick={DoReset} color="primary">
                        Reset
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ResetButton;