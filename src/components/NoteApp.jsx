import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import NoteDetailPage from "../pages/NoteDetailPage";
import NoteNotFound from "../pages/NoteNotFound";

function NoteApp() {
  return (
    <div className="note-app">
      <header className="note-app__header">
        <h1>Aplikasi Catatan</h1>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
          <Route path="*" element={<NoteNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default NoteApp;
