import { Button, Heading, majorScale, Pane, TextInputField, useTheme } from 'evergreen-ui';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { userOperations, userSelectors } from '../../store/user';

// Interfaces
import { ILoginRequest } from '../../utility/interfaces';

const Login = () => {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const isAuthenticated = useSelector(userSelectors.isAuthenticated);
  
  const handleLogin = ({ email, password }: ILoginRequest) => {
    dispatch(userOperations.login({ email, password}));
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
          Login to Docmaker
      </Heading>
      <form onSubmit={handleSubmit(handleLogin)}>
        <TextInputField
          label="E-Mail *"
          placeholder="Enter your e-mail."
          ref={register({ required: true })}
          name="email"
          isInvalid={!!errors.email}
          validationMessage={errors.email ? 'Please enter an e-mail address!' : null}
        />

        <TextInputField
          ref={register({ required: true })}
          name="password"
          isInvalid={!!errors.password}
          validationMessage={errors.password ? 'Please enter a password!' : null}
          label="Password *"
          type="password"
          placeholder="Enter your password."
        />
        
        <Button type="submit" intent="success" appearance="primary" width="100%" height={majorScale(5)} display="block">
          Login
        </Button>
        
        <Button
          marginTop={majorScale(2)}
          width="100%"
          display="block"
          textAlign="center"
          is={Link} 
          appearance="minimal" 
          to="/sign-up">
            Reset Password
        </Button>
        <Button
          width="100%"
          display="block"
          textAlign="center"
          is={Link} 
          appearance="minimal" 
          to="/sign-up">
            Don't you have an account? Click here!
        </Button>
      </form>
    </Pane>
  </Pane>
  );
};

export default Login;