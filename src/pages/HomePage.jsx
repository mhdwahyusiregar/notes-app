import React from "react";
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { deleteNote, getAllNotes } from "../utils/local-data";
import { FiPlus } from "react-icons/fi";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      keyword: props.defaultKeyword || "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteNote(id);

    // update the note state from data.js
    this.setState(() => {
      return {
        notes: getAllNotes(),
      };
    });
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });
    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <section className="homepage">
        <h2>Catatan Aktif</h2>
        <section className="search-bar">
          <SearchBar
            keyword={this.state.keyword}
            keywordChange={this.onKeywordChangeHandler}
          />
        </section>
        {notes.length === 0 ? (
          <section className="notes-list-empty">
            <p className="notes-list__empty">Tidak ada catatan</p>
          </section>
        ) : (
          <section className="notes-list">
            <NoteList notes={notes} />
          </section>
        )}
        <section className="homepage__action">
          <button className="action" type="button" title="Tambah">
            <FiPlus />
          </button>
        </section>
      </section>
    );
  }
}

// export default HomePage;
export default HomePageWrapper;
