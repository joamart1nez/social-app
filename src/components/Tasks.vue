<template>
  <div class="container mx-0">
    <h1 class="m-0"><strong>My tasks</strong></h1>
    <hr />
    <div class="row mx-auto">
      <div class="col-5 p-0">
        <form class="form-group border border-secondary rounded p-2 shadow" style="background: #fff">
          <h5 class="text-primary">{{ showForm ? "New task" : "Edit task" }}</h5>
          <input type="text" class="form-control mb-2" placeholder="Task title" v-model="dataTask.title" />
          <textarea class="form-control mb-2" rows="3" placeholder="Task description" v-model="dataTask.description"></textarea>
          <div class="form-group">
            <select class="custom-select" v-model="dataTask.priority">
              <option value="2px solid gray" selected>Select priority</option>
              <option value="2px solid green">Low priority</option>
              <option value="2px solid yellow">Medium priority</option>
              <option value="2px solid red">High priority</option>
            </select>
          </div>
          <div class="form-group" v-if="!showForm">
            <div class="custom-control custom-radio">
              <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" :value="false" v-model="dataTask.status" />
              <label class="custom-control-label" for="customRadio1">Pending</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" :value="true" v-model="dataTask.status" />
              <label class="custom-control-label" for="customRadio2">Completed</label>
            </div>
          </div>
          <button type="submit" class="btn btn-info mb-2 btn-block" @click.prevent="sendTask(dataTask._id)">{{ showForm ? "Send task" : "Edit" }}</button>
        </form>
      </div>
      <div class="col-7">
        <div class="alert alert-dismissible shadow" :class="[alertStatus.color]" v-if="alertStatus">
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            @click="
              () => {
                alertStatus = false;
              }
            "
          >
            &times;
          </button>
          <strong>{{ alertStatus.status }}</strong>
        </div>
        <div v-for="(item, index) in listTasks" :key="index" class="card bg-white mb-3 mx-auto shadow" style="width: 100%" :style="{ borderLeft: item.priority }">
          <div class="card-header d-flex justify-content-between p-1" title="Priority">
            <span class="mx-1 my-auto" style="text-transform: uppercase">{{ item.title }}</span>
            <div class="actions">
              <button class="btn btn-info btn-sm mr-1" title="Edit" @click="editTask(item)">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button class="btn btn-danger btn-sm" title="Delete" @click="deleteTask(item._id)">X</button>
            </div>
          </div>
          <div class="card-body p-2">
            <h6 class="card-text">{{ item.description }}</h6>
          </div>
          <div class="card-footer p-0 d-flex justify-content-between">
            <p class="badge m-0 text-dark" v-if="item.status">
              Task completed
              <i class="fa fa-check" aria-hidden="true"></i>
            </p>
            <p class="badge m-0 text-muted" v-else>Pending task...</p>
            <p class="badge m-0 text-muted">{{ item.date.substr(11, 5) }} - {{ item.date.substr(0, 10).replace(/-/gi, "/").split("/").reverse().join("/") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      dataTask: {
        user: "",
        title: "",
        description: "",
        status: false,
        priority: "2px solid gray",
      },
      listTasks: [],
      alertStatus: false,
      showForm: true,
    };
  },
  computed: {
    ...mapState(["dataUser", "token"]),
  },
  methods: {
    ...mapActions(["logout", "route"]),
    resetDataTask() {
      return {
        title: "",
        description: "",
        status: "",
        priority: "2px solid gray",
      };
    },
    async getTasks() {
      const res = await fetch(`http://localhost:3000/api/admin/task/${this.dataUser._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.token,
        },
      });
      const data = await res.json();
      this.listTasks = data.tasks;

      this.dataTask = this.resetDataTask();

      this.dataTask.user = this.dataUser._id;
    },
    async sendTask(idTask) {
      if (this.showForm) {
        const res = await fetch(`http://localhost:3000/api/admin/task`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": this.token,
          },
          body: JSON.stringify(this.dataTask),
        });
        const data = await res.json();
        this.alertStatus = data;
      } else {
        const res = await fetch(`http://localhost:3000/api/admin/task/${idTask}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": this.token,
          },
          body: JSON.stringify(this.dataTask),
        });
        const data = await res.json();
        this.alertStatus = data;
        this.showForm = true;
      }
      await this.route();
      this.getTasks();

      this.dataTask = this.resetDataTask();
    },
    async deleteTask(id) {
      const message = await confirm("Are you sure you want to delete that task?");
      if (message === true) {
        const res = await fetch(`http://localhost:3000/api/admin/task/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": this.token,
          },
        });
        const data = await res.json();
        this.alertStatus = data;
        this.getTasks();
      }
      this.dataTask = this.resetDataTask();
    },
    editTask(data) {
      this.dataTask = data;
      this.showForm = false;
    },
  },
  created() {
    this.getTasks();
  },
};
</script>
