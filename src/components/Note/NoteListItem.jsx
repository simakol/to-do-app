import React from "react";

function NoteListItem(props) {
  const isReady = props.isReady ? "ready" : "none";
  const isImportant = props.isImportant ? "important" : "none";
  const favClass = props.favClassActive || "fa-square-o";
  const exlClass = props.isImportant ? "exl-active" : "";
  const exlClassSymbol = props.isImportant ? "exl-active-symbol" : "";
  let text = "";
  if (props.text.length > 8) {
    text = props.text
      .split("")
      .map((el, i) => {
        if (!(i % 8) && i !== 0) return (el += " ");
        return el;
      })
      .join("");
  } else text = props.text;
  return (
    <div className="note-item-container">
      <p
        data-title={`${text}`}
        className={`note-text ${isReady} ${isImportant} ${exlClass} ${exlClassSymbol}`}
        id={props.id}>
        {text}
      </p>
      <div>
        <i onClick={props.ready} className={`fa ${favClass} check`} />
        <i
          onClick={props.important}
          className={`fa fa-exclamation exclamation ${exlClass}`}
        />
        <i className="fa fa-trash trash" onClick={props.delete} />
      </div>
    </div>
  );
}

export default NoteListItem;
