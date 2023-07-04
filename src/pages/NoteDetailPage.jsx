import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import NoteDetail from "../components/DetailNote/NoteDetail";
import { getNote, deleteNote } from "../utils/network-data";
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
      note: null,
      initializing: true,
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getNote(this.props.id);

    this.setState(() => {
      return {
        note: data,
        initializing: false,
      };
    });
  }

  async onDeleteHandler(id) {
    await deleteNote(id);
    this.props.navigate("/");
  }

  render() {
    if (this.state.initializing) {
      return null;
    }
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
