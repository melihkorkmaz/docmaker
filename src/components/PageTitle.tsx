import { Heading, majorScale, useTheme } from 'evergreen-ui';

interface IPageTitleProps {
  children: JSX.Element | string
}

export default ({ children }: IPageTitleProps) => {
  const theme = useTheme();
  
  return (
    <Heading size={700} color={theme.scales.neutral.N9} marginBottom={majorScale(2)}>
      {children}
    </Heading>
  );
};