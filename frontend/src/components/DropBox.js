import React from 'react';
import Dropzone from 'react-dropzone';


class DropBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          files: []
        };
    }

    handleOnDrop = (acceptFiles) => {
        var reader = new FileReader();

        var fileList = this.state.files.slice();
        acceptFiles.forEach(file => {
            fileList.push(file);

            reader.readAsDataURL(file);
            reader.onload = function() {
                var dataUrl = reader.result;
                window.wails.Events.Emit("getImage", dataUrl);
            };
        });
        this.setState({files: fileList});

        //仮に、1のボタンのon/offが変わるようにしておいた
        this.props.func(1);
    }

    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
        ));

        return( 
            <Dropzone 
                onDrop={this.handleOnDrop}
                accept="image/jpeg,image/png,image/jpg"
            >
                {({getRootProps, getInputProps}) => (
                    <section className="container">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside>
                            <h4>Files</h4>
                            <ul>{files}</ul>
                        </aside>
                    </section>
                )}
            </Dropzone>
        );
    }
}

export default DropBox;