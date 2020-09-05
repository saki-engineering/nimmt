import React, { useContext } from 'react';
import { AppContext } from '../contexts/appContexts';
import { multiOnButton } from '../actions/actionCreaters';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0.5),
        height: '100%',
    },
}));

function DropBox () {
    const { dispatch } = useContext(AppContext);
    const classes = useStyles();


    const handleOnDrop = (acceptFiles) => {
        var reader = new FileReader();

        acceptFiles.forEach(file => {
            reader.readAsDataURL(file);
            reader.onload = function() {
                var dataUrl = reader.result;
                multiOnButton(dispatch, dataUrl);
            };
        });
    }

    return (
        <DropzoneAreaBase
            acceptedFiles={['image/png']}
            dropzoneText={"Drag and drop an image here or click"}
            onDrop={(files) => handleOnDrop(files)}
            onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
            dropzoneClass={classes.root}
        />
    );
}

export default DropBox;