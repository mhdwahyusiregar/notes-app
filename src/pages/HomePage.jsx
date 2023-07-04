import React from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { getActiveNotes, deleteNote } from "../utils/network-data";
import { LocaleConsumer } from "../contexts/LocaleContext";

// function HomePage() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [notes, setNotes] = React.useState([]);
//   const [keyword, setKeyword] = React.useState(() => {
//     return searchParams.get("keyword") || "";
//   });
//   // const { locale } = React.useContext(LocaleContext);

//   React.useEffect(() => {
//     getActiveNotes().then(({ data }) => {
//       setNotes(data);
//     });
//   }, []);

//   async function onDeleteHandler(id) {
//     await deleteNote(id);

//     // update the notes state from network.js
//     const { data } = await getActiveNotes();
//     setNotes(data);
//   }

//   function onKeywordChangeHandler(keyword) {
//     setKeyword(keyword);
//     setSearchParams({ keyword });
//   }

//   const filteredNotes = notes.filter((note) => {
//     return note.name.toLowerCase().includes(keyword.toLowerCase());
//   });

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
      notes: [],
      keyword: props.defaultKeyword || "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async onDeleteHandler(id) {
    await deleteNote(id);

    // update the note state from data.js
    const { data } = await getActiveNotes();
    this.setState(() => {
      return {
        notes: data,
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

  async componentDidMount() {
    const { data } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: data,
      };
    });
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <section className="homepage">
              <h2>{locale === "id" ? "Catatan Aktif" : "Notes Active"}</h2>
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
            </section>
          );
        }}
      </LocaleConsumer>
    );
  }
}

SearchBar.propType = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};
// export default HomePage;
export default HomePageWrapper;
