import { Button, Heading, majorScale, Pane, TextInputField, useTheme } from 'evergreen-ui';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userOperations, userSelectors } from '../../store/user';

const CreateTenant = () => {
  const theme = useTheme(); 
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const hasUserTenant = useSelector(userSelectors.hasUserTenant);
  
  const handleRegister = (formData: { organization: string }) => {
    dispatch(userOperations.createTenant(formData.organization));
  };
  
  useEffect(() => {
    if (hasUserTenant) {
      history.push('/app/dashboard');
    }
  }, [hasUserTenant, history]);

  return (
    <Pane
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundColor={theme.palette.neutral.lightest}
    >
    <Pane
      elevation={3}
      width={majorScale(50)}
      border="default"
      marginTop={majorScale(12)}
      borderRadius={3}
      paddingX={majorScale(2)}
      paddingY={majorScale(3)}
      backgroundColor={theme.palette.neutral.lightest}
    >
      <Heading
        color={theme.palette.green.base}
        size={700}
        textAlign="center"
        marginBottom={majorScale(2)}
        fontWeight={600}>
          Create Organization
      </Heading>
      
      <form onSubmit={handleSubmit(handleRegister)}>
        <TextInputField
          label="Organization"
          placeholder="Enter your organization name"
          ref={register({ required: true })}
          name="organization"
          isInvalid={!!errors.organization}
          validationMessage={errors.organization ? 'Please enter your organization!' : null}
        />
        
        <Button type="submit" intent="success" appearance="primary" width="100%" height={majorScale(5)} display="block">
          Create
        </Button>
      </form>
    </Pane>
  </Pane>
  );
};

export default CreateTenant;