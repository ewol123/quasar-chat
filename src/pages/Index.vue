<template>
  <div>
    <q-page v-if="!isInitialized" class="flex flex-center">
      <div class="row justify-center text-center">
        <img
          alt="Quasar logo"
          src="~assets/undraw_typewriter_i8xd.svg"
          class="col-12 col-md-6"
        />
        <span class="col-12"
          >Type in your room number and click <strong>OK</strong> to start</span
        >
      </div>
    </q-page>
    <q-page v-else>
      <div class="column" style="height: 88vh">
        <div :class="flexClass" style="border: 2px solid black">
          <video></video>
        </div>
        <div :class="flexClass" style="border: 2px solid black">
          <video></video>
        </div>
        <div :class="flexClass" style="border: 2px solid black">
          <video></video>
        </div>
        <div :class="flexClass" style="border: 2px solid black">
          <video></video>
        </div>
        <div :class="flexClass" style="border: 2px solid black">
          <video></video>
        </div>
        <div :class="flexClass" style="border: 2px solid black">
          <video></video>
        </div>
        <div :class="flexClass" style="border: 2px solid black">
          <video></video>
        </div>
      </div>
    </q-page>

    <q-dialog v-model="initUser" persistent>
      <new-user-dialog @close="initUser = false" />
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import NewUserDialog from "../components/NewUserDialog";
export default {
  name: "PageIndex",
  components: {
    NewUserDialog
  },
  data() {
    return {
      users: 7,
      initUser: false
    };
  },
  computed: {
    ...mapGetters({
      isInitialized: "room/isInitialized",
      user: "user/user"
    }),
    flexClass() {
      if (this.users < 3) return "col-12";
      if (this.users >= 3 && this.users <= 6) return "col-6";
      if (this.users >= 7 && this.users <= 12) return "col-4";
      if (this.users >= 13 && this.users <= 20) return "col-3";
      if (this.users >= 21 && this.users <= 48) return "col-2";
      return "";
    }
  },
  mounted() {
    if (!this.user) this.initUser = true;
  },
  methods: {
    ...mapMutations({
      set: "general/set"
    })
  }
};
</script>
