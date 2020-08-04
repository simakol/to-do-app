const initalState = {
  noteArr: [],
  activeFilterBtn: "all"
};

function notesReduser(state = initalState, action) {
  switch (action.type) {
    case "NOTE_READY": {
      const id = action.id;
      const newNoteArr = [...state.noteArr];
      newNoteArr[id].isReady = !newNoteArr[id].isReady;
      newNoteArr[id].favClassActive = newNoteArr[id].isReady
        ? (newNoteArr[id].favClassActive = "fa-check-square")
        : (newNoteArr[id].favClassActive = "fa-square-o");
      return {
        ...state,
        noteArr: [...newNoteArr]
      };
    }
    case "NOTE_DELETE": {
      const newNoteArr = [...state.noteArr];
      const id = action.id;
      for (let i = id; i < newNoteArr.length; i++) {
        newNoteArr[i].id--;
      }
      newNoteArr.splice(id, 1);
      return {
        ...state,
        noteArr: [...newNoteArr]
      };
    }
    case "IMPORTANT_NOTE": {
      const newNoteArr = [...state.noteArr];
      const id = action.id;
      newNoteArr[id].isImportant = !state.noteArr[id].isImportant;
      return {
        ...state,
        noteArr: [...newNoteArr]
      };
    }
    case "CREATE_NEW_NOTE": {
      const note = action.note;
      document.getElementById("createNoteField").value = "";
      document.getElementById("createNoteField").style.border =
        "2px solid transparent";
      if (note === "" || note.length <= 2) {
        document.getElementById("createNoteField").style.border =
          "2px solid red";
        return {
          ...state
        };
      }
      const newNoteArr = [...state.noteArr];
      const pushObj = {
        id: state.noteArr.length,
        text: note,
        isReady: false,
        isImportant: false,
        favClassActive: "fa-square-o"
      };
      newNoteArr.push(pushObj);
      return {
        ...state,
        noteArr: newNoteArr
      };
    }

    case "NOTE_SEARCH": {
      return {
        ...state,
        searchText: action.text
      };
    }
    case "SHOW_ALL_NOTE": {
      return {
        ...state,
        activeFilterBtn: "all"
      };
    }
    case "SHOW_READY_NOTE": {
      return {
        ...state,
        activeFilterBtn: "ready"
      };
    }
    case "SHOW_IMPORTANT_NOTE": {
      return {
        ...state,
        activeFilterBtn: "important"
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default notesReduser;
