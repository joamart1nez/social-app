<template>
  <div class="container">
    <h1 class="m-0"><strong>Profile</strong></h1>
    <hr />
    <div class="bg-white p-2 row mt-3 shadow-sm rounded">
      <img
        class="border border-white col-4"
        :src="
          url
            ? `http://localhost:3000/${this.dataUser._id}.png`
            : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LfUcKCHKBamgN20k7KQWeAHaHT%26pid%3DApi&f=1https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LfUcKCHKBamgN20k7KQWeAHaHT%26pid%3DApi&f=1'
        "
        alt="..."
      />
      <div class="text-left m-0 my-3 col-8">
        <h2 class="m-0" style="text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2)">
          <strong>{{ dataUser.name }}</strong>
        </h2>
        <div class="mt-2 m-0">
          <h5><strong>Biography:</strong> {{ dataUser.biography }}</h5>
        </div>
        <div class="d-flex justify-content-between" style="">
          <button class="btn btn-info p-0 px-1 mt-5 shadow" data-toggle="modal" data-target="#modalPhoto">
            <i class="fa fa-camera" aria-hidden="true"></i>
          </button>
          <button class="btn btn-info p-0 px-1 mt-5 shadow" data-toggle="modal" data-target="#modalBiography">
            <strong>Edit profile</strong>
            <i class="fa fa-pencil mx-1" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="modal fade" id="modalPhoto" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header p-2 px-3">
              <h5 class="modal-title" id="modalLabel">Edit my profile</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h6><strong>Add profile photo</strong></h6>
              <div class="form-group">
                <div class="input-group mb-3">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" name="file" ref="file" @change="onFileSelected($event)" />
                    <label class="custom-file-label" for="fileUpload">Choose file</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer p-2">
              <button type="button" class="btn btn-secondary p-0 px-1" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary p-0 px-1" data-dismiss="modal" @click="updateProfilePhoto">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="modalBiography" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header p-2 px-3">
              <h5 class="modal-title" id="modalLabel">Edit my profile</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h6><strong>Change my name</strong></h6>
              <div class="form-group"><input type="text" v-model="dataUser.name" class="form-control" /></div>
              <h6><strong>Change my biography</strong></h6>
              <div class="form-group">
                <textarea cols="30" rows="4" class="form-control" v-model="dataUser.biography"></textarea>
              </div>
            </div>
            <div class="modal-footer p-2">
              <button type="button" class="btn btn-secondary p-0 px-1" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary p-0 px-1" data-dismiss="modal" @click="updateProfileInfo">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      selectedFile: null,
      url: "",
    };
  },
  computed: {
    ...mapState(["dataUser", "token"]),
  },
  methods: {
    ...mapActions(["route"]),
    async onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    async updateProfilePhoto() {
      let fd = new FormData();
      let file = this.selectedFile;
      fd.append("file", file);

      axios
        .post(`http://localhost:3000/api/admin/upload/${this.dataUser._id}`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": this.token,
          },
        })
        .then(() => {
          this.route();
        });
    },
    async updateProfileInfo() {
      const res = await fetch(`http://localhost:3000/api/admin/update-data-user/${this.dataUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.token,
        },
        body: JSON.stringify(this.dataUser),
      });
      const data = await res.json();
      console.log(data);
      this.route();
    },
  },
  created() {
    this.url = this.dataUser.url;
  },
};
</script>
