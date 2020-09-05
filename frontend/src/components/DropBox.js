import React, { useContext } from 'react';
import {useDropzone} from 'react-dropzone';
import { AppContext } from '../contexts/appContexts';
import { multiOnButton } from '../actions/actionCreaters';


function DropBox () {
    const { dispatch } = useContext(AppContext)

    const handleOnDrop = (acceptFiles) => {
        var reader = new FileReader();

        acceptFiles.forEach(file => {
            reader.readAsDataURL(file);
            reader.onload = function() {
                var dataUrl = reader.result;
                window.backend.OCR(dataUrl).then(result => {
                    multiOnButton(dispatch, result);
                });
            };
        });
    }

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: "image/jpeg,image/png,image/jpg",
        onDrop: handleOnDrop
    });
  
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}

export default DropBox;