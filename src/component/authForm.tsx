import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import CryptoJS from 'crypto-js';

import '../css/AuthForm.css';

interface AuthFormProps {
  isOpen: boolean;
  onClose: () => void;
  handleSetUser: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isOpen, onClose, handleSetUser }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const signUpNicknameRef = useRef<HTMLInputElement>(null);
  const signUpEmailRef = useRef<HTMLInputElement>(null);
  const signUpPasswordRef = useRef<HTMLInputElement>(null);
  const signUpPasswordConfirmRef = useRef<HTMLInputElement>(null);

  const signInEmailRef = useRef<HTMLInputElement>(null);
  const signInPasswordRef = useRef<HTMLInputElement>(null);

  const [signUpNickname, setSignUpNickname] = useState<string>('');
  const [signUpEmail, setSignUpEmail] = useState<string>('');
  const [signUpPassword, setSignUpPassword] = useState<string>('');
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState<string>('');

  const [signInEmail, setSignInEmail] = useState<string>('');
  const [signInPassword, setSignInPassword] = useState<string>('');

  const apiBaseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:4040'
    : 'https://api.valentin-garnier.fr:4040';

  const handleSubmitSignIn = async () => {
    const email = signInEmail;
    const password = signInPassword;
    const combinedString = email + password;

    const hash = CryptoJS.SHA256(combinedString).toString(CryptoJS.enc.Hex);

    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: hash,
        }),
      })
      if (response.ok) {
        const data = await response.json();
        handleSetUser(data.email, data.password);
      }
    }
    catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  }

useEffect(() => {
  const regex = new RegExp('^[a-zA-Z0-9]{3,20}$');
  if (signUpNickname === "" && signUpNicknameRef.current) {
    signUpNicknameRef.current!.style.border = "1px solid #ccc";
    signUpNicknameRef.current!.title = "";
  } else if (!signUpNickname.match(regex) && signUpNicknameRef.current) {
    signUpNicknameRef.current!.style.border = "1px solid red";
    signUpNicknameRef.current.title = "Votre identifiant doit contenir entre 3 et 20 caractères alphanumériques";
  } else {
    if (signUpNicknameRef.current) {
      signUpNicknameRef.current!.style.border = "1px solid #ccc";
      signUpNicknameRef.current!.title = "";
    }
  }
}, [signUpNickname]);

useEffect(() => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (signUpEmail === "" && signUpEmailRef.current) {
    signUpEmailRef.current!.style.border = "1px solid #ccc";
    signUpEmailRef.current!.title = "";
  } else if (!signUpEmail.match(regex) && signUpEmailRef.current) {
    signUpEmailRef.current!.style.border = "1px solid red";
    signUpEmailRef.current.title = "Votre email doit être valide";
  } else {
    if (signUpEmailRef.current) {
      signUpEmailRef.current!.style.border = "1px solid #ccc";
      signUpEmailRef.current!.title = "";
    }
  }
  console.log(signUpEmail.match(regex));

}, [signUpEmail]);

useEffect(() => {

  if (signUpPassword === "" && signUpPasswordRef.current) {
    signUpPasswordRef.current!.style.border = "1px solid #ccc";
    signUpPasswordRef.current!.title = "";
  } else if ((signUpPassword.length < 8 || signUpPassword.length > 64) && signUpPasswordRef.current) {
    signUpPasswordRef.current!.style.border = "1px solid red";
    signUpPasswordRef.current.title = "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial";
  } else {
    if (signUpPasswordRef.current) {
      signUpPasswordRef.current!.style.border = "1px solid #ccc";
      signUpPasswordRef.current!.title = "";
    }
  }
}, [signUpPassword]);

useEffect(() => {
  if (signUpPasswordConfirm === "" && signUpPasswordConfirmRef.current) {
    signUpPasswordConfirmRef.current!.style.border = "1px solid #ccc";
    signUpPasswordConfirmRef.current!.title = "";
  } else if (signUpPassword !== signUpPasswordConfirm && signUpPasswordConfirmRef.current) {
    signUpPasswordConfirmRef.current!.style.border = "1px solid red";
    signUpPasswordConfirmRef.current.title = "Les mots de passe ne correspondent pas";
  } else {
    if (signUpPasswordConfirmRef.current) {
      signUpPasswordConfirmRef.current!.style.border = "1px solid #ccc";
      signUpPasswordConfirmRef.current!.title = "";
    }
  }
}, [signUpPassword, signUpPasswordConfirm]);


return (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Auth Modal"
    className="auth-modal"
  >
    <main>
      <div className={isActive ? "container active" : "container"} id="container">
        <div className="form-container sign-up">
          <div className="form">
            <h1>Inscription</h1>
            <input onChange={(e) => setSignUpNickname(e.target.value)} type="text" name="nickname" id="signup_nickname"
              placeholder="Identifiant" value={signUpNickname} ref={signUpNicknameRef} />
            <input onChange={(e) => setSignUpEmail(e.target.value)} type="email" name="email" id="signup_email"
              placeholder="Email" value={signUpEmail} ref={signUpEmailRef} />
            <input onChange={(e) => setSignUpPassword(e.target.value)} type="password" name="password" id="signup_password"
              placeholder="Mot de passe" value={signUpPassword} ref={signUpPasswordRef} />
            <input onChange={(e) => setSignUpPasswordConfirm(e.target.value)} type="password" name="passwordConfirm" id="signup_passwordConfirm"
              placeholder="Confirmer le mot de passe" value={signUpPasswordConfirm} ref={signUpPasswordConfirmRef} />
            <button type="submit" className="button button-block" id="signup_button">Inscription</button>
          </div>
        </div>

        <div className="form-container sign-in">
          <form>
            <h1>Connexion</h1>
            <input onChange={(e) => setSignInEmail(e.target.value)} type="email" name="email" id="connect_email"
              placeholder="Email" value={signInEmail} ref={signInEmailRef} />
            <input onChange={(e) => setSignInPassword(e.target.value)} type="password" name="password" id="connect_password"
              placeholder="Mot de passe" value={signInPassword} ref={signInPasswordRef} />
            <button type="submit" className="button button-block" id="connect_button">Connexion</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>De retour ?</h1>
              <p>Enter your personal details</p>
              <button className="hidden" id="login" onClick={() => setIsActive(false)}>Connexion</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>VMDB</h1>
              <p>Connecte toi avec tes données personnelles</p>
              <button className="hidden" id="register" onClick={() => setIsActive(true)}>Inscription</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Modal>
);
};

export default AuthForm;