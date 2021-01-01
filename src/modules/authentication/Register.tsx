import { Button, Heading, majorScale, Pane, TextInputField, useTheme } from 'evergreen-ui';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// Interfaces
import { IRegisterRequest } from '../../utility/interfaces';

// Actions
import { userOperations, userSelectors } from '../../store/user';

const Register = () => {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const isAuthenticated = useSelector(userSelectors.isAuthenticated);
  
  const handleRegister = (formData: IRegisterRequest) => {
    dispatch(userOperations.register(formData));
  };
  
  useEffect(() => {
    if(isAuthenticated) {
      history.push('/app/dashboard');
    }
  }, [isAuthenticated, history]);
  
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
          Register to Docmaker
      </Heading>
      
      <form onSubmit={handleSubmit(handleRegister)}>
        <TextInputField
          label="Name"
          required={true}
          placeholder="Enter your name"
          ref={register({ required: true })}
          name="name"
          isInvalid={!!errors.name}
          validationMessage={errors.name ? 'Please enter your name!' : null}
        />
        
        <TextInputField
          label="E-Mail"
          required={true}
          placeholder="Enter your e-mail"
          ref={register({ required: true })}
          name="email"
          isInvalid={!!errors.email}
          validationMessage={errors.email ? 'Please enter your email!' : null}
        />

        <TextInputField
          label="Password"
          type="password"
          required={true}
          placeholder="Enter your password."
          ref={register({ required: true })}
          name="password"
          isInvalid={!!errors.password}
          validationMessage={errors.password ? 'Please enter your password!' : null}
        />
        
        <Button type="submit" intent="success" appearance="primary" width="100%" height={majorScale(5)} display="block">
          Sign Up Now!
        </Button>
      </form>
      <Button
        marginTop={majorScale(2)}
        width="100%"
        display="block"
        textAlign="center"
        is={Link} 
        appearance="minimal" 
        to="/sign-in">
          Do you have already an account? Click here to login!
      </Button>
    </Pane>
  </Pane>
  );
};

export default Register;