import { useEffect } from "react";
const SelectTheme = (props) => {
  /* use data-theme for whole page */
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", props.theme);
  }, []);
  return;
};

export default SelectTheme;
