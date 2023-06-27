import React from "react";
import PropTypes from "prop-types";
import NoteItemBody from "./NoteItemBody";
// import DeleteButton from "./DeleteButton";

function NoteItem({ title, createdAt, body }) {
  return (
    <article className="note-item">
      <NoteItemBody title={title} createdAt={createdAt} body={body} />
      {/* <DeleteButton id={id} onDelete={onDelete} /> */}
    </article>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteItem;
