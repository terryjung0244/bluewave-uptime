import { Button as MuiButton } from "@mui/material";
import PropTypes from "prop-types";

const levelConfig = {
  primary: {
    variant: "contained",
    color: "primary",
  },
  secondary: {
    variant: "outlined",
    color: "secondary",
  },
  tertiary: {
    variant: "text",
    color: "tertiary",
  },
  error: {
    variant: "contained",
    color: "error",
  },
  imagePrimary: {
    color: "primary",
    variant: "text",
  },
  imageSecondary: {
    color: "secondary",
    variant: "text",
  },
  imageTertiary: {
    color: "tertiary",
    variant: "text",
  },
};

/**
 * @component
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'tertiary' | 'error' | 'imagePrimary' | 'imageSecondary' | 'imageTertiary'} props.level - The level of the button
 * @param {string} props.type - The type of the button
 * @param {string} props.label - The label of the button
 * @param {React.ReactNode} props.img - Image for button
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @param {function} props.onClick - Function to run when the button is clicked
 * @param {Object} props.sx - Styles for the button
 * @returns {JSX.Element}
 * @example
 * // Render an error button
 * <Button type="submit" level="error" label="Error" disabled sx={{marginTop: "1rem"}}/>
 */

const Button = ({ type, level, label, disabled, img, onClick, sx }) => {
  const { variant, color } = levelConfig[level];
  return (
    <MuiButton
      type={type}
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
      sx={{
        textTransform: "none",
        "&:focus": {
          outline: "none",
        },
        ...sx,
      }}
    >
      {img && img}
      {label}
    </MuiButton>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  level: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  img: PropTypes.node,
  onClick: PropTypes.func,
  sx: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;
