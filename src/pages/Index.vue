<template>
  <div>
    <q-page v-if="!isInitialized" class="flex flex-center">
      <div class="row justify-center text-center">
        <img
          alt="Quasar logo"
          src="~assets/undraw_typewriter_i8xd.svg"
          class="col-12 col-md-6"
        />
        <span id="index-text1" class="col-12"
          >Type in your room number and click <strong>OK</strong> to start</span
        >
      </div>
    </q-page>
    <q-page v-else class="flex flex-center">
      <div class="row justify-center text-center">
        <img
          alt="Quasar logo"
          src="~assets/undraw_warning_cyit.svg"
          class="col-12 col-md-6"
        />
        <span class="col-12 q-mt-sm"
          >Video chat is under construction in the demo.
          <q-btn
            dense
            class="bg-primary"
            label="go to chat"
            @click="$router.push({ name: 'Messages' })"
          />
          instead</span
        >
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
      initUser: false
    };
  },
  computed: {
    ...mapGetters({
      isInitialized: "room/isInitialized",
      users: "room/users",
      user: "user/user"
    })
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
