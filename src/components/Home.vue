<template>
  <div class="container mb-5">
    <h1 class="m-0"><strong>Home</strong></h1>
    <hr />
    <div class="row">
      <div class="col-10">
        <form action="" class="form-group bg-white p-2 rounded shadow-sm">
          <div>
            <h5 class="text-dark">Make your post</h5>
          </div>
          <textarea name="" id="" cols="30" rows="4" class="form-control" placeholder="What are you thinking about"></textarea>
          <div class="d-flex justify-content-end my-1">
            <div>
              <i class="fa fa-smile-o ml-2" aria-hidden="true"></i>
              <i class="fa fa-picture-o ml-2" aria-hidden="true"></i>
            </div>
            <button class="btn btn-info p-0 px-2 ml-2">Public</button>
          </div>
        </form>
      </div>
      <div class="col-10">
        <div class="bg-white shadow-sm p-2">
          <div class="row">
            <picture class="col-2">
              <img class="border-rounded img-fluid img-thumbnail" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LfUcKCHKBamgN20k7KQWeAHaHT%26pid%3DApi&f=1" alt="..." style="height: auto" />
            </picture>
            <div class="col-9 p-0">
              <h4 class="m-0"><strong>Joaquin Martinez</strong></h4>
              <p style="font-size: 14px" class="mb-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate cum fugit consequuntur soluta, quas quo porro saepe tenetur suscipit architecto. Praesentium, repellendus! Facere veritatis voluptatibus asperiores laudantium mollitia ipsum dolor.</p>
              <div class="d-flex justify-content-between mb-1">
                <small><i class="fa fa-heart-o m-0 mr-1" style="text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5)" aria-hidden="true"></i>1528</small>
                <small class="form-text text-muted m-0">04:02 - 28/11/2020</small>
              </div>
              <div class="bg-secondary p-2">
                <h6><strong>Comments</strong></h6>
                <div class="col-12 row p-0 mx-auto comment-into-comment mb-1 shadow-sm rounded-pill bg-white" style="border-bottom: 1px solid #ddd">
                  <img class="rounded-circle img-fluid col-2" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LfUcKCHKBamgN20k7KQWeAHaHT%26pid%3DApi&f=1" alt="..." style="height: auto" />
                  <div class="col-10 p-0 bg-white rounded-pill">
                    <h6 class="m-0"><strong>Tulio gomez</strong></h6>
                    <p style="font-size: 12px" class="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum et facere aperiam unde. Quae veniam iste impedit maiores animi et!</p>
                  </div>
                </div>
                <div class="col-12 row p-0 mx-auto comment-into-comment mb-1 shadow-sm rounded-pill bg-white" style="border-bottom: 1px solid #ddd">
                  <img class="rounded-circle img-fluid col-2" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LfUcKCHKBamgN20k7KQWeAHaHT%26pid%3DApi&f=1" alt="..." style="height: auto" />
                  <div class="col-10 p-0 bg-white rounded-pill">
                    <h6 class="m-0"><strong>Tulio gomez</strong></h6>
                    <p style="font-size: 12px" class="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum et facere aperiam unde. Quae veniam iste impedit maiores animi et!</p>
                  </div>
                </div>
                <div class="col-12 row p-0 mx-auto comment-into-comment mb-1 shadow-sm rounded-pill bg-white" style="border-bottom: 1px solid #ddd">
                  <img class="rounded-circle img-fluid col-2" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LfUcKCHKBamgN20k7KQWeAHaHT%26pid%3DApi&f=1" alt="..." style="height: auto" />
                  <div class="col-10 p-0 bg-white rounded-pill">
                    <h6 class="m-0"><strong>Tulio gomez</strong></h6>
                    <p style="font-size: 12px" class="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum et facere aperiam unde. Quae veniam iste impedit maiores animi et!</p>
                  </div>
                </div>
                <div class="input-group input-group-sm mt-3 col-12 p-0">
                  <input type="text" class="form-control" placeholder="Comments this publication..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                  <div class="input-group-append">
                    <button class="btn btn-info p-0 px-2" type="button" id="button-addon2">
                      <i class="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-1 d-flex justify-content-end">
              <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
};
</script>
