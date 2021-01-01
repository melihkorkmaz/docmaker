import { Button, Heading, majorScale, Pane, TextInputField, useTheme } from 'evergreen-ui';
import { useForm } from 'react-hook-form';

const CreateTenant = () => {
  const theme = useTheme();
  const { register, handleSubmit, errors } = useForm();
  
  const handleRegister = (formData: { organization: string }) => {
    // dispatch(userOperations.register(formData));
  };

  return (
    <Pane
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundColor={theme.scales.neutral.N3}
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
          required={true}
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