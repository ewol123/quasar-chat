<template>
  <div :style="style">
    <q-layout view="lHh Lpr lFf" class="shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn
            v-if="!leftDrawerOpen"
            round
            flat
            icon="keyboard_arrow_left"
            class=" q-mr-sm"
            @click="leftDrawerOpen = true"
          />

          <q-icon :name="$route.meta.icon" size="sm"></q-icon>

          <span class="q-subtitle-1 q-pl-md">
            {{ $route.name }}
          </span>

          <q-space />

          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 0]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>
                    <a href="http://localhost:3000">logout</a>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :breakpoint="690"
      >
        <q-toolbar class="bg-grey-3">
          <q-avatar class="cursor-pointer">
            <img src="https://cdn.quasar.dev/app-icons/icon-128x128.png" />
          </q-avatar>

          <q-space />

          <q-btn round flat icon="fas fa-plus-circle" @click="generateUuid()">
            <q-tooltip>
              room number
            </q-tooltip>
          </q-btn>

          <q-btn round flat icon="fas fa-video" to="/">
            <q-tooltip>
              Video
            </q-tooltip>
          </q-btn>
          <q-btn
            :disable="!isInitialized"
            round
            flat
            icon="fas fa-comments"
            to="/messages"
          >
            <q-tooltip>
              Messages
            </q-tooltip>
          </q-btn>

          <q-btn
            round
            flat
            icon="close"
            class="WAL__drawer-close"
            @click="leftDrawerOpen = false"
          />
        </q-toolbar>

        <q-toolbar class="bg-grey-2">
          <q-input
            v-if="!isInitialized"
            v-model="roomNumberInput"
            rounded
            outlined
            dense
            class="WAL__field full-width"
            bg-color="white"
            placeholder="Type your room number here..."
          >
            <template slot="append">
              <q-btn
                size="sm"
                flat
                :loading="loading"
                :disable="$v.roomNumberInput.$invalid"
                @click="joinRoom()"
                >OK</q-btn
              >
            </template>
          </q-input>
          <q-btn
            v-else
            dense
            color="primary"
            icon="fas fa-times"
            label="Quit chat"
            class="full-width"
            @click="leaveRoom()"
          />
        </q-toolbar>

        <user-list v-if="isInitialized" />
        <q-item v-else>
          <q-item-section>
            <span class="text-grey">No active users...</span>
          </q-item-section>
        </q-item>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <router-view />
      </q-page-container>
    </q-layout>

    <q-dialog v-model="showUuid" position="bottom">
      <q-card style="width: 350px">
        <q-card-section class="row items-center no-wrap">
          <q-input ref="copyText" v-model="generatedUuid" class="col-10" />
          <q-btn
            class="col-2"
            flat
            size="sm"
            icon="fas fa-copy"
            @click="copyText()"
          >
            <q-tooltip>
              copy
            </q-tooltip>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { required } from "vuelidate/lib/validators";
import UserList from "../components/UserList";
export default {
  name: "MainLayout",
  components: {
    UserList
  },
  data() {
    return {
      showUuid: false,
      generatedUuid: null,
      leftDrawerOpen: false,
      roomNumberInput: null
    };
  },
  computed: {
    ...mapGetters({
      isInitialized: "room/isInitialized",
      user: "user/user",
      loading: "room/loading"
    }),
    style() {
      return {
        height: this.$q.screen.height + "px"
      };
    }
  },
  methods: {
    ...mapActions({
      create: "room/create",
      patch: "room/patch"
    }),
    ...mapMutations({
      setLoading: "room/loading"
    }),
    generateUuid() {
      const uuid = uuidv4();
      this.generatedUuid = uuid;
      this.showUuid = true;
    },
    copyText() {
      this.$refs.copyText.select();
      document.execCommand("copy");
    },
    joinRoom() {
      this.setLoading(true);
      this.create({
        userIdentifier: this.user.id,
        roomIdentifier: this.roomNumberInput
      });
    },
    leaveRoom() {
      if (this.$route.name !== "Video chat")
        this.$router.push({ name: "Video chat" });
      this.setLoading(true);
      this.patch({
        userIdentifier: this.user.id
      });
    }
  },
  validations: {
    roomNumberInput: {
      required
    }
  }
};
</script>

<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px
  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #009688
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px
  &__field.q-field--outlined .q-field__control:before
    border: none
  .q-drawer--standard
    .WAL__drawer-close
      display: none
@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0
@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
</style>
