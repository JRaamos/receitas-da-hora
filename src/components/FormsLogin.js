function FormsLogin() {
  return (
    <div>
      <form>
        <h1>Login</h1>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default FormsLogin;
