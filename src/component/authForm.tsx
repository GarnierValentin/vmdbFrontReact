import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';

import '../css/AuthForm.css';

interface AuthFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const registerBtnRef = useRef<HTMLButtonElement>(null);
  const loginBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const registerBtn = registerBtnRef.current;
    const loginBtn = loginBtnRef.current;

    const handleRegisterClick = () => {
      if (container) container.classList.add('active');
    };

    const handleLoginClick = () => {
      if (container) container.classList.remove('active');
    };

    if (registerBtn) registerBtn.addEventListener('click', handleRegisterClick);
    if (loginBtn) loginBtn.addEventListener('click', handleLoginClick);

    return () => {
      if (registerBtn) registerBtn.removeEventListener('click', handleRegisterClick);
      if (loginBtn) loginBtn.removeEventListener('click', handleLoginClick);
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Auth Modal"
      className="auth-modal"
    >
      <main>
        <div className="container" id="container" ref={containerRef}>
          <div className="form-container sign-up">
            <form>
              <h1>Inscription</h1>
              <input type="text" name="nickname" id="signup_nickname" placeholder="Identifiant" />
              <input type="email" name="email" id="signup_email" placeholder="Email" />
              <input type="password" name="password" id="signup_password" placeholder="Mot de passe" />
              <input type="password" name="passwordConfirm" id="signup_passwordConfirm" placeholder="Confirmer le mot de passe" />
              <button type="submit" className="button button-block" id="signup_button">Inscription</button>
            </form>
          </div>

          <div className="form-container sign-in">
            <form>
              <h1>Connexion</h1>
              <input type="email" name="email" id="connect_email" placeholder="Email" />
              <input type="password" name="password" id="connect_password" placeholder="Mot de passe" />
              <button type="submit" className="button button-block" id="connect_button">Connexion</button>
            </form>
          </div>

          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back !</h1>
                <p>Enter your personal details</p>
                <button className="hidden" id="login" ref={loginBtnRef}>Connexion</button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello</h1>
                <p>Register with your personal details</p>
                <button className="hidden" id="register" ref={registerBtnRef}>Inscription</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Modal>
  );
};

export default AuthForm;