import PropTypes from "prop-types";
import { FiXOctagon } from "react-icons/fi";
import { showFormattedDate } from "../../utils/index";
function NoteDetail({ id, title, body, createdAt, archived, onDelete }) {
  const formattedDate = showFormattedDate(createdAt);

  return (
    <div className="section">
      <div className="content">
        <h2 className="detail-page__title">{title}</h2>
        <p className="detail-page__createAt">{formattedDate}</p>
        <p className="detail-page__body">{body}</p>
        <p>{archived}</p>
        <div className="detail-page__action">
          <button className="action" type="button" onClick={() => onDelete(id)}>
            <FiXOctagon />
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
