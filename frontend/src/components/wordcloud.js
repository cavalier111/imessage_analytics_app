import React, {Component} from 'react';
import './wordcloud.css';

class Wordcloud extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    fileAttached = file => {
      this.setState({
        uploadStatus: `${file.name} attached, click upload to upload your file`,
        uploadText : "Drag your files here or click in this area to replace current file.",
        file: file,
        uploadEmpty: true,
      });
    }
    

    render() {
        return (
            
        );
    }
}

export default Wordcloud;