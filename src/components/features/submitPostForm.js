import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

class submitPostForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.submitForm}>
        <div>
          <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
        </div>

      </form>

    )
  }
}
