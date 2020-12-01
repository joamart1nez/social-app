<template>
  <div>
    <div id="nav" class="navbar navbar-dark bg-dark mb-3 py-0 px-2 shadow-lg">
      <a class="navbar-brand" @click="$router.push('/user')" style="cursor: pointer">
        <h4 class="m-0">JoaApp</h4>
      </a>
      <div class="ml-auto d-flex align-items-center">
        <router-link to="/user/profile" title="My profile" class="px-2 d-flex align-items-center shadow m-2 rounded-pill" style="text-decoration: none">
          <i class="fa fa-user text-white shadow mr-1" aria-hidden="true"></i>
          <h5 class="m-0 text-white"><strong>Profile</strong></h5>
        </router-link>
        <button @click="closeSession()" class="btn btn-primary py-0 px-1 my-1">
          <strong>Logout</strong>
        </button>
      </div>
    </div>
    <div class="container p-0">
      <div class="row">
        <div class="col-3 pl-0 pr-4 mt-3">
          <div class="card mb-3 shadow">
            <h4 class="card-header p-2"><strong>Shortcuts</strong></h4>
            <ul class="list-group list-group-flush">
              <router-link to="/user" title="Home" class="mx-0 text-dark list-group-item list-group-item-action p-2" style="text-decoration: none">
                <h5 class="m-0">
                  <i class="fa fa-home text-dark shadow mr-2" aria-hidden="true"></i>
                  Publications
                </h5>
              </router-link>
              <router-link to="/user/friends" title="Home" class="mx-0 text-dark list-group-item list-group-item-action p-2" style="text-decoration: none">
                <h5 class="m-0">
                  <i class="fa fa-users text-dark shadow mr-2" aria-hidden="true"></i>
                  Friends
                </h5>
              </router-link>
              <router-link to="/user" title="Home" class="mx-0 text-dark list-group-item list-group-item-action p-2" style="text-decoration: none">
                <h5 class="m-0">
                  <i class="fa fa-comments text-dark shadow mr-2" aria-hidden="true"></i>
                  Inbox
                </h5>
              </router-link>
              <router-link to="/user" title="Home" class="mx-0 text-dark list-group-item list-group-item-action p-2" style="text-decoration: none">
                <h5 class="m-0">
                  <i class="fa fa-shopping-bag text-dark shadow mr-2" aria-hidden="true"></i>
                  Store
                </h5>
              </router-link>
              <li class="dropdown list-group-item list-group-item-action p-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <h5 class="m-0">
                  <i class="fa fa-gamepad text-dark shadow mr-2" aria-hidden="true"></i>
                  Applications
                </h5>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <router-link to="/user/tasks" title="My profile" class="dropdown-item py-2">
                    <h5 class="m-0">
                      <i class="fa fa-sticky-note text-dark shadow mr-1" aria-hidden="true"></i>
                      My tasks
                    </h5>
                  </router-link>
                  <router-link to="/user/tasks" title="My profile" class="dropdown-item py-2">
                    <h5 class="m-0">
                      <i class="fa fa-trophy text-dark shadow mr-1" aria-hidden="true"></i>
                      League
                    </h5>
                  </router-link>
                  <router-link to="/user/tasks" title="My profile" class="dropdown-item py-2">
                    <h5 class="m-0">
                      <i class="fa fa-paint-brush text-dark shadow mr-1" aria-hidden="true"></i>
                      MultiPaint
                    </h5>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <router-view name="user" class="col-9 px-0" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      search: "",
      showUsers: false,
    };
  },
  computed: {
    ...mapState(["dataUser", "token"]),
  },
  methods: {
    ...mapActions(["logout", "route"]),
    closeSession() {
      this.logout();
      this.$router.go("/");
    },
  },
  async created() {
    await this.route();
  },
};
</script>
