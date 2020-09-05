import React, { useContext } from 'react';
import { AppContext } from '../contexts/appContexts';
import { multiOnButton } from '../actions/actionCreaters';
import { DropzoneAreaBase } from 'material-ui-dropzone';


function DropBox () {
    const { dispatch } = useContext(AppContext)

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
        <section className="container">
            <DropzoneAreaBase
                acceptedFiles={['image/png']}
                dropzoneText={"Drag and drop an image here or click"}
                onDrop={(files) => handleOnDrop(files)}
                onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
            />
        </section>
    );
}

export default DropBox;