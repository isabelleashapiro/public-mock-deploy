import { Dispatch, SetStateAction } from 'react';


/**
 * An interface that contains an isLoggedIn field, a boolean representing whether the user is logged in,
 * and a setIsLoggedIn function that sets the isLoggedIn field
 */
interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

/**
 * displays the login/sign out button. On click, this button will cause authenticate, which changes
 * the boolean value of isLoggedIn to represent whether or not the user is logged in
 * 
 * @param props a loginProps interface containing the isLoggedIn field and setIsLoggedIn function
 * @return the LoginButton that is present on the screen at all times, and either displays 'Login'
 * or 'Sign Out'
 */
export function LoginButton(props: loginProps) {

  const authenticate = () => {
    const newValue = !props.isLoggedIn
    props.setIsLoggedIn(newValue)
    return newValue
  }

  if (props.isLoggedIn) {
    return (
      <button aria-label='Sign Out' onClick={authenticate}>Sign out</button>
    )
  } else {
    return (
      <button aria-label='Login' onClick={authenticate}>Login</button>
    )
  }
}