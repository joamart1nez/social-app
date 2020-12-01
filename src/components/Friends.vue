<template>
  <div class="container">
    <h1 class="m-0"><strong>My friends</strong></h1>
    <hr />
    <div class="row">
      <div class="col-6">
        <h4><strong>My friends</strong></h4>
      </div>
      <div class="col-6">
        <h4><strong>Search all users</strong></h4>
        <input type="text" class="form-control rounded-pill" placeholder="Search your friends..." v-model="search" />
        <ul class="list-group my-2">
          <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(user, index) in searchUsers" :key="index">
            <div style="width: 80%" class="row">
              <img
                class="border border-white col-4"
                :src="
                  user.url
                    ? `http://localhost:3000/${user._id}.png`
                    : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LfUcKCHKBamgN20k7KQWeAHaHT%26pid%3DApi&f=1https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LfUcKCHKBamgN20k7KQWeAHaHT%26pid%3DApi&f=1'
                "
                alt="..."
              />
              <h5 class="m-0 p-0 col-6 d-flex align-items-center">
                <strong>{{ user.name }}</strong>
              </h5>
            </div>
            <button class="btn btn-info mx-1 p-0 px-1">Profile</button>
            <button class="btn btn-info mx-1 p-0 px-1" @click="followUser(user._id)">Follow</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      allDataUsers: [],
    };
  },
  methods: {
    async getAllDataUsers() {
      const res = await fetch(`http://localhost:3000/api/admin/get-all-data-users/${this.dataUser._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.token,
        },
      });
      const data = await res.json();
      this.allDataUsers = data.dataUsers;
    },
    getUserImg(id) {
      return `http://localhost:3000/${id}.png`;
    },
    followUser(id) {
      console.log(id, this.dataUser._id);
    },
  },
  computed: {
    ...mapState(["dataUser", "token"]),
    searchUsers() {
      return this.allDataUsers.filter((item) => item.name.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  async created() {
    this.getAllDataUsers();
  },
};
</script>
