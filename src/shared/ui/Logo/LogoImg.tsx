import classes from "./logo.module.scss";
import Logo from "@/assets/logo.svg";
import {useNavigate} from "react-router";
import {ReactElement} from "react";

interface Props {
  link?: string;
}

export const LogoImg = ({link}: Props): ReactElement => {
  const navigate = useNavigate();
  return <img onClick={() => link && navigate(link)} src={Logo} alt="Logo" className={classes.logo} />;
};
