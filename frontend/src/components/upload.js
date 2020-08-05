import React, {Component} from 'react';
import './upload.css';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        uploadText: "Drag your files here or click in this area.",
        uploadStatus: '',
        file: null,
        uploadEmpty: false,
      };
    }

    // handleChange = event => {
    //     const { name, value } = event.target;

    //     this.setState({
    //         [name] : value
    //     });
    // }

    fileAttached = file => {
      this.setState({
        uploadStatus: `${file.name} attached, click upload to upload your file`,
        uploadText : "Drag your files here or click in this area to replace current file.",
        file: file,
        uploadEmpty: true,
      });
    }
    uploadFile =  ()  => {
      fetch('/api/texts/upload/', {
        // content-type header should not be specified!
        method: 'POST',
        body: this.state.file,
      })
        .then(response => response.json())
        
        .catch(error => console.log(error))
        .then(success => {
          this.setState({
            uploadStatus: "Successfully Uploaded"
          });
        });
    }

    

    render() {
        return (
            <div className="uploadContainer">
              <Dropzone onDrop={acceptedFiles => {
                if (acceptedFiles.length == 1) {
                  this.fileAttached(acceptedFiles[0])
                } else {
                  alert("You must only drop one file")
                }
              }}>
                {({getRootProps, getInputProps}) => (
                  
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                          <div className="dropContainer">
                            <p className = "inputP">{this.state.uploadStatus}</p>
                            <p className = "inputP">{this.state.uploadText}</p>
                          </div>
                      </div>
                    </section>
                )}
              </Dropzone>
              <button className = "inputButton" type="submit" disabled={!this.state.uploadEmpty} onClick={ () => this.uploadFile()}>Upload <FontAwesomeIcon icon={faUpload} /></button>
            </div>
        );
    }
}

export default Upload;