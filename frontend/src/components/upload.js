import React, {Component} from 'react';
import ReactFileReader from 'react-file-reader';
import axios from 'axios';

class Upload extends Component {
    // constructor(props) {
    //     super(props);
        
    //     this.initialState = {
    //         name: '',
    //         job: ''
    //     };

    //     this.state = this.initialState;
    // }

    // handleChange = event => {
    //     const { name, value } = event.target;

    //     this.setState({
    //         [name] : value
    //     });
    // }

    onFormSubmit = (event) => {
        event.preventDefault();
        
        
    }

    handleFiles = files => {

      var reader = new FileReader();
      reader.onload = function(e) {
          axios.post('/api/texts/upload/', JSON.stringify({data: reader.result}))
          alert(reader.result);
          console.log((reader.result));
      }
      reader.readAsText(files[0]);
    }

    render() {
        return (
            <div>
              <h1> Upload a csv </h1>
              <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                  <button className='btn'>Upload</button>
              </ReactFileReader>
            </div>
        );
    }
}

export default Upload;