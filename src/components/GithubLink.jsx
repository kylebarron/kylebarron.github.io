import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Language colors from:
// https://github.com/ozh/github-colors/blob/master/colors.json
const LANGUAGES = {
  py: {
    color: "#3572A5",
    name: "Python",
  },
  js: {
    color: "#f1e05a",
    name: "JavaScript",
  },
};

export default function GithubLink(props) {
  const { href, languages } = props;

  return (
    <span>
      {languages.map(language => (
        <span>
          <LanguageDot color={LANGUAGES[language].color} />{" "}
          {LANGUAGES[language].name}{" "}
        </span>
      ))}
      <a href={href} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} /> Source
      </a>
    </span>
  );
}

function LanguageDot(props) {
  const { width = 12, color } = props;
  return (
    <svg width={width} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g color={color}>
        <circle fill="currentColor" cx="50" cy="50" r="50" />
      </g>
    </svg>
  );
}
