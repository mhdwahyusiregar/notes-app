import React from "react";
import PropTypes from "prop-types";
import NoteItemBody from "./NoteItemBody";
// import DeleteButton from "./DeleteButton";

function NoteItem({ title, createdAt, body, id }) {
  return (
    <article className="note-item">
      <NoteItemBody title={title} createdAt={createdAt} body={body} id={id} />
      {/* <DeleteButton id={id} onDelete={onDelete} /> */}
    </article>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  // owner: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
