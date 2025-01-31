import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Loading from "./Loading";

import { primaryColors } from "../assets/Colors";

const Button = styled.button`
  background-color: ${(props) => {
    switch (props.display) {
      case "success":
        return primaryColors.Green;
      case "danger":
        return primaryColors.Danger;
      case "info":
        return primaryColors.Info;
      case "warning":
        return primaryColors.Warning;
      case "grey":
        return primaryColors.Grey;
      case "other":
        return primaryColors.black;
      case "none":
        return "transparent";
      default:
        return primaryColors.Purple;
    }
  }};
  height: ${(props) => props.height || ""};
  width: ${(props) => props.width || ""};
  font-size: ${(props) => props.fontSize || "0.8rem"};
  font-weight: ${(props) => props.fontWeight || "400"};
  padding: ${(props) =>
    props.small ? "0.5rem 1rem" : props.nopaddng ? "0" : "0.5rem 2rem"};
  border-radius: 0.5rem;
  color: ${(props) => props.textcolor || "#fff"};
  border: ${(props) => props.border || ""};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    /* background: transparent; */
    background-color: ${(props) => props.hoverbg || "#4D4D4D"};
  }

  ${(props) =>
    props.outline &&
    css`
      background: transparent;
      color: ${(props) => props.backgroundColor || primaryColors.Purple};
      &:hover {
        background: ${(props) => props.hoverColor || "transparent"};
        color: ${(props) => props.hoverColor || primaryColors.Purple};
      }
    `}

  // Disabled styles
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media only screen and (min-width: 320px) and (max-width: 580px) {
    font-size: ${(props) => "0.75rem"};
  }
`;

const Children = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const AppButton = ({
  text,
  backgroundColor,
  textcolor,
  border,
  hoverColor,
  small,
  nopaddng,
  outline,
  disabled = false,
  type,
  loading = false,
  onClick,
  icon,
  display,
  height,
  width,
  fontSize,
  fontWeight,
  hoverbg,
  id,
  className,
  children,
  ...props
}) => {
  return (
    <Button
      className={className}
      backgroundColor={backgroundColor}
      id={id}
      textcolor={textcolor}
      border={border}
      hoverColor={hoverColor}
      small={small ? "true" : undefined}
      nopaddng={nopaddng ? "true" : undefined}
      outline={outline}
      disabled={loading || disabled}
      type={type}
      onClick={onClick}
      height={height}
      width={width}
      fontSize={fontSize}
      fontWeight={fontWeight}
      display={display}
      hoverbg={hoverbg}
      {...props}
    >
      <Children>
        {icon && icon}
        {!loading ? text : <Loading color={primaryColors.White} />}
        {children}
      </Children>
    </Button>
  );
};

AppButton.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  textcolor: PropTypes.string,
  bordercolor: PropTypes.string,
  hoverColor: PropTypes.string,
  small: PropTypes.bool,
  outline: PropTypes.bool,
  type: PropTypes.oneOf([
    "default",
    "success",
    "danger",
    "info",
    "warning",
    "submit",
  ]),
  text: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  icon: PropTypes.element,
};

export default AppButton;
