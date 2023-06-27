import PropTypes from "prop-types";

function NoteDetail({ id, title, body, createdAt, archived, onDelete }) {
  return (
    <div className="section">
      <div className="content">
        <h2>{title}</h2>
        <p>{createdAt}</p>
        <p>{body}</p>
        <p>{archived}</p>
        <div className="buttons">
          <button className="button is-danger" onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteDetail;