const signupFormHandler = async (event) => {
  event.preventDefault();

  const usernameInput = document.querySelector('#username-signup');
  const emailInput = document.querySelector('#email-signup');
  const passwordInput = document.querySelector('#password-signup');

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (username && email && password) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        throw new Error('Error creating user');
      }
    } catch (error) {
      alert(error.message);
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);