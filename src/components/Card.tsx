import { majorScale, Pane } from 'evergreen-ui';
import React from 'react';

interface IProps {
  children: JSX.Element | string;
  height?: number | string;
  display?: string;
  alignItems?: string;
  paddingTop?: number | string;
  flexDirection?: number | false | "inherit" | "initial" | "-moz-initial" | "revert" | "unset" | "row" | "column" | "column-reverse" | "row-reverse" | null | undefined;
  borderRadius?: number;
  backgroundColor?: string;
  marginBottom?: number;
}

const Card = (props: IProps) => {
  return (
    <Pane      
      borderRadius={props.borderRadius || 6} 
      elevation={2} 
      paddingX={majorScale(2)}
      paddingY={majorScale(1)}
      backgroundColor={props.backgroundColor}
      marginBottom={props.marginBottom}
      {...props}
    >
      {props.children}
    </Pane>
  );
};

export default Card;