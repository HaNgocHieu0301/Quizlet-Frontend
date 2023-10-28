import style from "./style.module.css";

import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type propsType = {
  title: String;
  icon?: boolean;
};

function HeaderLink({ title, icon }: propsType) {
  return (
    <span className={clsx(style.span, "font-bold")}>
      {title}{" "}
      {icon && (
        <FontAwesomeIcon className="px-2" size="sm" icon={faChevronDown} />
      )}
    </span>
  );
}

export default HeaderLink;
