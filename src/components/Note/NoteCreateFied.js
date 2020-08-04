import React, { Component } from "react";
import { connect } from "react-redux";

class NoteCreateField extends Component {
  render() {
    return (
      <>
        <input
          placeholder="Note"
          className="input mb-3"
          id="createNoteField"
          required
        />
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={() => {
            const note = document.getElementById("createNoteField").value;
            this.props.createNewNote(note);
          }}>
          Create
        </button>
        <button
          type="button"
          onClick={this.props.close}
          className="btn btn-danger mb-3 ml-1">
          Close
        </button>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewNote: note => dispatch({ type: "CREATE_NEW_NOTE", note })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NoteCreateField);
