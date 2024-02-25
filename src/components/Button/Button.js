import React from "react";
import './Button.scss';

const Button = ({ className = "", type = "button", children, onClick, ...rest }) => {

  let Button = 'button';

  const classes = className ? "btn " + className : "btn"

  const props = {
    onClick,
    ...rest,
  };

  return (
    <div>
        <Button className={classes} {...props}>
          {props?.leftIcon} 
          <span>{children}</span>
          {props?.rightIcon}
        </Button>
    </div>
  );
};

export default Button;
