// Override specific parts of the theme from the upstream definition

import code from "@lekoarts/gatsby-theme-minimal-blog/src/styles/code";

const newCode = {
  ...code,
  ".prism-code": {
    // @ts-ignore
    ...code[".prism-code"],
    fontSize: 16,
    padding: 1,
  },
  ".gatsby-highlight": {
    // @ts-ignore
    ...code[".gatsby-highlight"],
    "pre[class~='language-bash']:before": {
      content: `'bash'`,
      background: `#89e051`,
    },
    'pre[class~="language-cpp"]:before': {
      content: `"C++"`,
      background: `#f34b7d`,
      color: `white`,
    },
    'pre[class~="language-python"]:before, pre[class~="language-py"]:before': {
      content: `"Python"`,
      background: `#3572A5`,
      color: `white`,
    },
    'pre[class~="language-rust"]:before, pre[class~="language-rs"]:before': {
      content: `"rust"`,
      background: `#dea584`,
      color: `black`,
    },
    'pre[class~="language-sql"]:before': {
      content: `"SQL"`,
      background: `#e38c00`,
      color: `black`,
    },
  },
};
export default newCode;
