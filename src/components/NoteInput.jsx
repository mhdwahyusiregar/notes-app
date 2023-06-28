import React from "react";
import PropTypes from "prop-types";
import { FiSave } from "react-icons/fi";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    // inisialisasi state
    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <form
        className="add-new-page__input"
        onSubmit={this.onSubmitEventHandler}
      >
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder="Catatan sangat rahasia"
          value={this.state.title}
          onChange={this.onTitleChangeEventHandler}
        />
        <textarea
          className="add-new-page__input__body"
          type="text"
          placeholder="Sebenarnya saya adalah ..."
          value={this.state.body}
          onChange={this.onBodyChangeEventHandler}
        />
        <button className="action-add" type="submit">
          <FiSave />
        </button>
      </form>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
