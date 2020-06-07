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
            v-model="roomNumberInput"
            rounded
            outlined
            dense
            class="WAL__field full-width"
            bg-color="white"
            placeholder="Type your room number here..."
          >
            <template slot="append">
              <q-btn size="sm" flat :loading="loading" :disable="$v.roomNumberInput.$invalid" @click="joinRoom()" >OK</q-btn>
            </template>
          </q-input>
        </q-toolbar>

        <q-scroll-area v-if="isInitialized" style="height: calc(100% - 100px)">
          <q-list>
            <q-item
              v-for="(conversation, index) in conversations"
              :key="conversation.id"
              v-ripple
              clickable
              @click="currentConversationIndex = index"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="conversation.avatar" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ conversation.person }}
                </q-item-label>
                <q-item-label class="conversation__summary" caption>
                  <q-icon v-if="conversation.sent" name="check" />
                  <q-icon v-if="conversation.deleted" name="not_interested" />
                  {{ conversation.caption }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  {{ conversation.time }}
                </q-item-label>
                <q-icon name="keyboard_arrow_down" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
        <q-item v-else>
          <q-item-section>
            <span class="text-grey">No active users...</span>
          </q-item-section>
        </q-item>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <router-view />
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <q-btn
            :disable="!isInitialized"
            round
            flat
            icon="insert_emoticon"
            class="q-mr-sm"
          />
          <q-input
            v-model="message"
            :disable="!isInitialized"
            rounded
            outlined
            dense
            class="WAL__field col-grow q-mr-sm"
            bg-color="white"
            placeholder="Type a message"
          />
          <q-btn :disable="!isInitialized" flat round icon="send"></q-btn>
        </q-toolbar>
      </q-footer>
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
import { mapActions, mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { required } from "vuelidate/lib/validators"
export default {
  name: "MainLayout",
  data() {
    return {
      loading: false,
      showUuid: false,
      generatedUuid: null,
      leftDrawerOpen: false,
      roomNumberInput: "",
      message: "",
      currentConversationIndex: 0,
      conversations: [
        {
          id: 1,
          person: "Razvan Stoenescu",
          avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg",
          caption: "I'm working on Quasar!",
          time: "15:00",
          sent: true
        },
        {
          id: 2,
          person: "Dan Popescu",
          avatar: "https://cdn.quasar.dev/team/dan_popescu.jpg",
          caption: "I'm working on Quasar!",
          time: "16:00",
          sent: true
        },
        {
          id: 3,
          person: "Jeff Galbraith",
          avatar: "https://cdn.quasar.dev/team/jeff_galbraith.jpg",
          caption: "I'm working on Quasar!",
          time: "18:00",
          sent: true
        },
        {
          id: 4,
          person: "Allan Gaunt",
          avatar: "https://cdn.quasar.dev/team/allan_gaunt.png",
          caption: "I'm working on Quasar!",
          time: "17:00",
          sent: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      isInitialized: "room/isInitialized",
      user: "user/user"
    }),
    currentConversation() {
      return this.conversations[this.currentConversationIndex];
    },
    style() {
      return {
        height: this.$q.screen.height + "px"
      };
    }
  },
   watch: {
    '$store.state.room.isInitialized': {
      handler(val){
        if(!val) return;
        this.loading = false;
      }
    }
  },
  methods: {
    ...mapActions({
      create: "room/create"
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
    joinRoom(){
        this.loading = true;
        this.create({userIdentifier: this.user.id, roomIdentifier: this.generatedUuid});
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
.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
