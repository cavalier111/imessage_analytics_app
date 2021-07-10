import React, {Component} from 'react';
import { connect } from "react-redux";
import './App.css'
import './upload.css';
import Dropzone from 'react-dropzone';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUpload } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../axiosApi'
import { reloadChatsMetaData } from "../redux/actions/word";
import Button from '@material-ui/core/Button';

const mapDispatchToProps = (dispatch) => {
  return {
    reloadChatsMetaData: () => dispatch(reloadChatsMetaData()),
  };
}
class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        uploadText: "Drag your files here or click in this area",
        uploadStatus: "",
        file: null,
        uploadEmpty: false,
        uploaded: false,
      };
    }

    fileAttached = (accepted, rejected) => {
      if(accepted && accepted[0]) {
        this.setState({
          uploadStatus: `${accepted[0].name} attached, click upload to upload your file`,
          uploadText : "Drag your files here or click in this area to replace current file.",
          file: accepted[0],
          uploadEmpty: true,
          errorStatus: ""
        });
      } else if (rejected && rejected[0]) {
        this.setState({
          errorStatus: `Unabled to attach ${rejected[0].name}, please only upload a csv`,
        });
      }
    }
    uploadFile =  ()  => {
      let formData = new FormData();
      formData.append('file', this.state.file);
      var req = new Request('/texts/upload/', {
        method: "POST",
        body: formData
      });
      axiosInstance.post('/texts/upload/', formData)
        .catch(error => {
          this.setState({
            errorStatus: error,
            uploadText: "Drag your files here or click in this area",
            uploadStatus: "",
            file: null,
            uploadEmpty: false,
            uploaded: false,
          });
        })
        .then(success => {
          this.setState({
            uploadStatus: "Successfully Uploaded",
            uploaded: true,
          });
          this.props.reloadChatsMetaData();
        });
    }

    

    render() {
        return (
            <div className="uploadContainer">
              <Dropzone 
                onDrop={(accepted, rejected) => this.fileAttached(accepted, rejected)}
                multiple={false}
                accept=".csv"
                >
                {({getRootProps, getInputProps}) => (
                  
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()}/>
                          <div className="dropContainer">
                            { this.state.errorStatus ? <p className = "inputP">{this.state.errorStatus}</p> : false}
                            { this.state.uploadStatus ? <p className = "inputP">{this.state.uploadStatus}</p> : false}
                            <p className = "inputP">{this.state.uploadText}</p>
                          </div>
                      </div>
                    </section>
                )}
              </Dropzone>
              <div>
                <Button type="submit" className="chat-stat-button button-margin-right" disabled={!this.state.uploadEmpty} onClick={ () => this.uploadFile()}>Upload</Button>
                <Button type="submit" className="chat-stat-button" disabled={!this.state.uploaded} onClick={this.props.viewVizualizations}>Start</Button>
              </div>
            </div>
        );
    }
}
export default connect(null, mapDispatchToProps)(Upload);