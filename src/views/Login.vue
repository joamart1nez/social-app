<template>
  <div>
    <div id="nav" class="navbar navbar-dark bg-dark mb-3 py-0 px-2 shadow-lg">
      <a class="navbar-brand" style="cursor: pointer">JoaApp</a>
      <div class="ml-auto">
        <span class="badge badge-white badge-pill text-white ml-1 shadow" style="cursor: pointer" @click="showForms(true)"><strong class="m-2">Login</strong></span>
        <span class="badge badge-white badge-pill text-white ml-1 shadow" style="cursor: pointer" @click="showForms(false)"><strong class="m-2">Register</strong></span>
      </div>
    </div>
    <div class="container my-4">
      <div class="row">
        <div class="col-7 mx-auto shadow bg-white py-2" v-if="showForm">
          <h3>Login</h3>
          <p class="m-0 p-0" :class="[status.color]">{{ status.error }}</p>
          <form class="form-group">
            <fieldset>
              <label class="control-label">Email</label>
              <input type="text" class="form-control mb-3" placeholder="Email" v-model="userLogin.email" autocomplete="off" />
            </fieldset>
            <fieldset>
              <label class="control-label w-100 d-flex justify-content-between">
                Password
                <i class="fa fa-eye mr-2 text-secondary" aria-hidden="true" @click="showPassw(false)" v-if="showPass"></i>
                <i class="fa fa-eye-slash mr-2 text-secondary" aria-hidden="true" @click="showPassw(true)" v-else></i>
              </label>
              <input :type="showPass === true ? 'text' : 'password'" class="form-control mb-3" placeholder="Password" v-model="userLogin.password" autocomplete="off" />
            </fieldset>
            <button @click.prevent="login()" class="btn btn-info btn-block mb-3">Login</button>
            <router-view></router-view>
          </form>
        </div>
        <div class="col-7 mx-auto shadow bg-white py-2" v-else>
          <h3>Register</h3>
          <p class="m-0 p-0" :class="[status.color]">{{ status.error ? status.error : status.status }}</p>
          <form class="form-group">
            <fieldset>
              <label class="control-label">Name</label>
              <input type="text" class="form-control mb-3" placeholder="Name" autocomplete="off" v-model="userRegister.name" />
            </fieldset>
            <fieldset>
              <label class="control-label">Email</label>
              <input type="text" class="form-control mb-3" placeholder="Email" autocomplete="off" v-model="userRegister.email" />
            </fieldset>
            <fieldset>
              <label class="control-label w-100 d-flex justify-content-between">
                Password
                <i class="fa fa-eye mr-2 text-secondary" aria-hidden="true" @click="showPassw(false)" v-if="showPass"></i>
                <i class="fa fa-eye-slash mr-2 text-secondary" aria-hidden="true" @click="showPassw(true)" v-else></i>
              </label>
              <input :type="showPass === true ? 'text' : 'password'" class="form-control mb-3" placeholder="Password" autocomplete="off" v-model="userRegister.password" />
            </fieldset>
            <button @click.prevent="register()" class="btn btn-info btn-block mb-3">Create an account</button>
            <router-view></router-view>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      userLogin: {
        email: "joa@gmail.com",
        password: "123456",
      },
      userRegister: {
        name: "",
        email: "",
        password: "",
      },
      status: "",
      showForm: true,
      showPass: false,
    };
  },
  methods: {
    ...mapActions(["login", "getToken"]),

    ...mapMutations(["setToken"]),

    async login() {
      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.userLogin),
      });
      const userData = await res.json();

      if (userData.error === null || userData.error === false) {
        this.status = "";
        this.setToken(userData.data.token);
        localStorage.setItem("token", userData.data.token);
        await this.$router.push("/user");
      } else if (userData.error) {
        this.status = userData;
      }
    },
    async register() {
      const res = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.userRegister),
      });
      const data = await res.json();
      this.status = data;
      if (this.status.error === null) {
        this.userLogin.email = this.userRegister.email;
        this.userLogin.password = this.userRegister.password;
        this.userRegister = {
          name: "",
          email: "",
          password: "",
        };
        this.status = {
          error: "You have already been registered, Login!",
          color: "text-success",
        };
        setTimeout(() => (this.showForm = true), 1000);
      }
    },
    showForms(boolean) {
      this.status = "";
      this.showForm = boolean;
    },
    showPassw(boolean) {
      this.showPass = boolean;
    },
  },
  created() {
    this.getToken();
  },
};
</script>
