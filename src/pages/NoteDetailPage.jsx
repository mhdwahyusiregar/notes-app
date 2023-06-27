import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import NoteDetail from "../components/DetailNote/NoteDetail";
import { getNote, deleteNote } from "../utils/local-data";
import NoteDetailEmpty from "../components/DetailNote/NoteDetailEmpty";

function NoteDetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <NoteDetailPage id={id} navigate={navigate} />;
}

class NoteDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteNote(id);
    this.props.navigate("/");
  }

  render() {
    if (!this.state.note) {
      return <NoteDetailEmpty />;
    }
    return (
      <section>
        <NoteDetail {...this.state.note} onDelete={this.onDeleteHandler} />
      </section>
    );
  }
}

NoteDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default NoteDetailPageWrapper;
