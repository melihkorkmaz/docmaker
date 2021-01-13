import { Heading, majorScale, Text, useTheme } from 'evergreen-ui';
import React from 'react';

interface IPageTitleProps {
  children: JSX.Element | string,
  subTitle?: string,
}

const PageTitle = ({ children, subTitle }: IPageTitleProps) => {
  const theme = useTheme();
  
  return (
    <Heading size={700} fontWeight={600} color={theme.scales.neutral.N9} marginBottom={majorScale(2)}>
      {children}
      {subTitle && <Text display="block">{subTitle}</Text>}
    </Heading>
  );
};

export default PageTitle;