import React, { Component } from "react";
import { connect } from "react-redux";
import NoteCreateField from "./NoteCreateFied";
import NoteListItem from "./NoteListItem";
import "./note.css";

class Note extends Component {
  render() {
    const createNote = this.props.noteCreateFied ? (
      <NoteCreateField close={this.props.closeField} />
    ) : null;
    let noteArr = [...this.props.newNoteArray];

    switch (this.props.activeFilterBtn) {
      case "all":
        noteArr = [...this.props.newNoteArray];
        break;
      case "ready":
        noteArr = noteArr.filter(item => item.isReady);
        break;
      case "important":
        noteArr = noteArr.filter(item => item.isImportant);
        break;
      default:
        noteArr = [...this.props.newNoteArray];
    }

    const searchText = this.props.searchText;
    let notFoundNoteText = "";
    if (searchText && this.props.newNoteArray.length) {
      noteArr = noteArr.filter(item => {
        const noteText = item.text.toLowerCase().split("");
        const searchInputText = searchText.toLowerCase().split("");
        let note = null;
        let search = null;
        for (let i = 0; i < searchInputText.length; i++) {
          note += noteText[i];
          search += searchInputText[i];
        }

        return note === search;
      });
      if (!noteArr.length)
        notFoundNoteText = (
          <p className="not-found-text">{`"${searchText.toLowerCase()}" note not found`}</p>
        );
    }

    const noteListItem = noteArr.map(item => {
      return (
        <NoteListItem
          key={item.id}
          {...item}
          ready={() => this.props.ready(item.id)}
          delete={() => this.props.delete(item.id)}
          noteArr={this.props.newNoteArray}
          important={() => this.props.important(item.id)}
        />
      );
    });

    let activeNote = 0;
    let doneNote = 0;

    this.props.newNoteArray.forEach(item => {
      return !item.isReady ? activeNote++ : doneNote++;
    });
    return (
      <div className="container">
        <div className="to-do-block">
          <p className="badge badge-secondary todo mt-3">TODO</p>
          <div className="mt-2 counter-notes">
            <p className="badge badge-warning mr-2">{doneNote} Done</p>
            <p className="badge badge-success">{activeNote} Active</p>
            </div>
                      <div className="md-form mt-2">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              id="search"
              onChange={() => {
                const search = document.getElementById("search").value;
                this.props.search(search);
              }}
            />
          </div>
          <div
            className="btn-group btn-filter-block"
            id="btnGroup"
            onClick={({ target, currentTarget }) => {
              Array.from(currentTarget.children).forEach(item =>
                item.classList.remove("active-btn")
              );
              if (target.attributes.id.value === "all") {
                target.classList.toggle("active-btn");
              } else if (target.attributes.id.value === "ready") {
                target.classList.toggle("active-btn");
              } else if (target.attributes.id.value === "important") {
                target.classList.toggle("active-btn");
              }
            }}>
            <button
              id="all"
              className={`btn btn-secondary`}
              onClick={this.props.showAll}>
              All
            </button>
            <button
              id="ready"
              className={`btn btn-secondary`}
              onClick={this.props.showReady}>
              Done
            </button>
            <button
              id="important"
              className={`btn btn-secondary`}
              onClick={this.props.showImportant}>
              Important
            </button>
          </div>
          <button
            className="btn btn-primary btn-lg mt-3 mb-3"
            onClick={this.props.showField}>
            Create note
          </button>
          {createNote}
          <p className="notes-list">Notes list:</p>
          {noteListItem}
          {notFoundNoteText}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    noteCreateFied: state.noteCreateFied.showField,
    newNoteArray: state.notesReduser.noteArr,
    activeFilterBtn: state.notesReduser.activeFilterBtn,
    showNoteArr: state.notesReduser.showNoteArr,
    searchText: state.notesReduser.searchText
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showField: () => {
      dispatch({ type: "OPEN_FIELD" });
    },
    closeField: () => {
      dispatch({ type: "CLOSE_FIELD" });
    },
    ready: id => {
      dispatch({ type: "NOTE_READY", id });
    },
    delete: id => {                                                                                                
      dispatch({ type: "NOTE_DELETE", id });
    },
    search: text => {
      dispatch({ type: "NOTE_SEARCH", text });
    },
    important: id => {
      dispatch({ type: "IMPORTANT_NOTE", id });
    },
    showAll: () => {
      dispatch({ type: "SHOW_ALL_NOTE" });
    },
    showReady: () => {
      dispatch({ type: "SHOW_READY_NOTE" });
    },
    showImportant: () => {
      dispatch({ type: "SHOW_IMPORTANT_NOTE" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
