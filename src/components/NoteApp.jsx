import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import NoteDetailPage from "../pages/NoteDetailPage";
import NoteNotFound from "../pages/NoteNotFound";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { getUserLogged, putAccessToken } from "../utils/network-data";
import { LocaleProvider } from "../contexts/LocaleContext";
import Content from "../contexts/Content";
import { ThemeProvider } from "../contexts/ThemeContext";

// Daftar path route
const routes = {
  login: "/*",
  register: "/register",
  home: "/",
  add: "/add",
  noteDetail: "/notes/:id",
  notFound: "*",
};

class NoteApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "dark",
      toggleTheme: () => {
        this.setState((prevState) => {
          // mendapatkan nilai tema baru berdasarkan state sebelumnya
          const newTheme = prevState.theme === "dark" ? "light" : "dark";
          // menyimpan nilai tema baru ke local storage
          localStorage.setItem("theme", newTheme);

          // mengembalikan dengan nilai theme terbaru.
          return {
            theme: newTheme,
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken("");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <ThemeProvider value={this.state}>
          <LocaleProvider value={this.state.localeContext}>
            <div className="note-app">
              <header className="note-app__header">
                <h1>
                  {this.state.localeContext.locale === "id"
                    ? "Aplikasi Catatan"
                    : "Contacts App"}
                </h1>
                <Content />
                {/* <Navigation /> */}
              </header>
              <main>
                <Routes>
                  <Route
                    path={routes.login}
                    element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                  />
                  <Route path={routes.register} element={<RegisterPage />} />
                </Routes>
              </main>
            </div>
          </LocaleProvider>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider value={this.state}>
        <LocaleProvider value={this.state.localeContext}>
          <div className="note-app">
            <header className="note-app__header">
              <h1>
                {this.state.localeContext.locale === "id"
                  ? "Aplikasi Catatan"
                  : "Contacts App"}
              </h1>
              <Navigation
                logout={this.onLogout}
                name={this.state.authedUser.name}
              />
            </header>
            <main>
              <Routes>
                <Route path={routes.home} element={<HomePage />} />
                <Route path={routes.add} element={<AddPage />} />
                <Route path={routes.noteDetail} element={<NoteDetailPage />} />
                <Route path={routes.notFound} element={<NoteNotFound />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
}

export default NoteApp;
