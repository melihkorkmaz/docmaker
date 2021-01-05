import { majorScale, Pane, useTheme } from 'evergreen-ui';

interface IProps {
  children: JSX.Element | string;
  height?: number | string;
  display?: string;
  alignItems?: string;
  paddingTop?: number | string;
  flexDirection?: number | false | "inherit" | "initial" | "-moz-initial" | "revert" | "unset" | "row" | "column" | "column-reverse" | "row-reverse" | null | undefined;
}

export default (props: IProps) => {
  const theme = useTheme();
  
  return (
    <Pane 
      backgroundColor={theme.palette.neutral.lightest} 
      borderRadius={6} 
      elevation={1} 
      paddingX={majorScale(2)}
      paddingY={majorScale(1)}
      {...props}
    >
      {props.children}
    </Pane>
  );
}