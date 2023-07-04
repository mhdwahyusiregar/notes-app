import React from "react";
import ToggleTheme from "../components/ToggleTheme";
import { LocaleConsumer } from "./LocaleContext";

function Content() {
    return (
        <LocaleConsumer>
            {
                ({ locale, toggleLocale }) => {
                    return (
                        <nav className="navigation">
                            <ul>
                                <li><button onClick={toggleLocale} className="toggle-locale">{locale === 'id' ? 'en' : 'id'}</button></li>
                                <li><ToggleTheme /></li>
                            </ul>
                        </nav>
                    )
                }
            }
        </LocaleConsumer>
    )
}




export default Content;