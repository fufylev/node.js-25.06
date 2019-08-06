Vue.component('register', {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    swapForm() {// показываем либо форму авторизации либо регистрации
      this.$parent.isSignedUp = !this.$parent.isSignedUp;
    },
    auth() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
      fetch(`/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
          .then((result) => result.json())
          .then((data) => {
            if (data.result === 'success') {}
            this.swapForm();
          })
          .catch((error) => console.log(error));
    },
  },
  template: `
    <form class="col-6 text-center border border-light p-5" @submit.prevent="auth">
        <p class="h4 mb-4">Sign up</p>
        <div class="form-row mb-4">
            <div class="col">
                <input type="text" v-model="firstName" id="defaultRegisterFormFirstName" class="form-control" placeholder="First name">
            </div>
            <div class="col">
                <input type="text" v-model="lastName" id="defaultRegisterFormLastName" class="form-control" placeholder="Last name">
            </div>
        </div>
        <input type="email" v-model="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail">
        <input type="password" v-model="password" id="defaultRegisterFormPassword" class="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock">
        <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
            At least 8 characters and 1 digit
        </small>
        <button class="btn btn-info my-4 btn-block" type="submit">Sign up</button>
        <p>Already a member?
              <span class="text-primary" style="cursor: pointer;" @click="swapForm()">Sing in</span>
          </p>
    </form>
  `,
});
