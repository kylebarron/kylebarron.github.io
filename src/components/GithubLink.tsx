import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Language colors from:
// https://github.com/ozh/github-colors/blob/master/colors.json
const LANGUAGES = {
  cython: {
    color: "#fedf5b",
    name: "Cython",
  },
  py: {
    color: "#3572A5",
    name: "Python",
  },
  python: {
    color: "#3572A5",
    name: "Python",
  },
  js: {
    color: "#f1e05a",
    name: "JavaScript",
  },
  ts: {
    color: "#3178c6",
    name: "TypeScript",
  },
  stata: {
    color: "#1a5f91",
    name: "Stata",
  },
  java: {
    color: "#b07219",
    name: "Java",
  },
  bash: {
    color: "#89e051",
    name: "Bash",
  },
  rust: {
    color: "#dea584",
    name: "Rust",
  },
  glsl: {
    color: "#5686a5",
    name: "GLSL",
  },
};

export default function GithubLink(props) {
  const { href, languages = [], linkText = "Source" } = props;
  if (!href) return;

  return (
    <span>
      {languages.map((language) => (
        <span>
          <LanguageDot color={LANGUAGES[language].color} />{" "}
          {LANGUAGES[language].name}{" "}
        </span>
      ))}
      {/* Styled.a gives the link the same styling as other links in the theme: https://theme-ui.com/api#styled */}
      <a href={href} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} /> {linkText}
      </a>
    </span>
  );
}

function LanguageDot(props) {
  const { width = 12, color = "#cccccc" } = props;
  return (
    <svg width={width} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <g color={color}>
        <circle fill="currentColor" cx="5" cy="5" r="5" />
      </g>
    </svg>
  );
}
