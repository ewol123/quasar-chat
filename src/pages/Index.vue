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
      <div v-if="!isChimeInitialized" class="column">
        <q-card
          flat
          bordered
          class="cursor-pointer col-6 shadow-10"
          @click="createChime()"
        >
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Create</div>
              <div class="text-h5 q-mt-sm q-mb-xs">Create a video session</div>
              <div class="text-caption text-grey">
                Click here to request a meeting id, which you can share with
                anyone. Just send them this code so they can join your video
                session.
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                src="~assets/undraw_new_entries_nh3h.svg"
                :ratio="1"
                contain
              />
            </q-card-section>
          </q-card-section>
        </q-card>

        <q-card
          flat
          bordered
          class="cursor-pointer col-6"
          @click="showJoinDialog()"
        >
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Join</div>
              <span class="text-h6">Join a video session</span>
              <div class="text-caption text-grey">
                Click here if you already have a meeting id you received from
                someone. You should enter this code to join their video session.
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                src="~assets/undraw_online_connection_6778.svg"
                :ratio="1"
                contain
              />
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>

      <ChimeVideoChat v-else-if="isChimeInitialized" />
    </q-page>

    <q-dialog v-model="initUser" persistent>
      <new-user-dialog @close="initUser = false" />
    </q-dialog>

    <q-dialog v-model="joinChime">
      <join-chime-dialog @close="joinChime = false" />
    </q-dialog>

    <q-dialog v-model="showMeetingIdDialog" persistent>
      <display-meeting-id-dialog
        v-if="meetingResponse"
        :meeting-id="meetingResponse.Meeting.MeetingId"
        @close="showMeetingIdDialog = false"
      />
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import NewUserDialog from "../components/NewUserDialog";
import ChimeVideoChat from "../components/ChimeVideoChat";
import JoinChimeDialog from "../components/JoinChimeDialog";
import DisplayMeetingIdDialog from "../components/DisplayMeetingIdDialog";

export default {
  name: "PageIndex",
  components: {
    NewUserDialog,
    ChimeVideoChat,
    JoinChimeDialog,
    DisplayMeetingIdDialog
  },
  data() {
    return {
      initUser: false,
      joinChime: false,
      showMeetingIdDialog: false
    };
  },
  computed: {
    ...mapGetters({
      isInitialized: "room/isInitialized",
      users: "room/users",
      user: "user/user",
      isChimeInitialized: "chime/isChimeInitialized",
      meetingResponse: "chime/meetingResponse"
    })
  },
  watch: {
    isChimeInitialized: {
      handler(val) {
        if (val) {
          if (this.meetingResponse) this.showMeetingIdDialog = true;
        }
      }
    }
  },
  mounted() {
    if (!this.user) this.initUser = true;
  },
  methods: {
    ...mapActions({
      create: "chime/createChimeMeeting",
      join: "chime/joinChimeMeeting"
    }),
    ...mapMutations({
      set: "general/set"
    }),
    async createChime() {
      const hasWebcam = await this.checkInputDevices();

      if (hasWebcam) {
        this.create({ userIdentifier: this.user.id });
      } else {
        this.$q.notify({
          message: "No webcam found, are you sure it's connected ?",
          color: "warning"
        });
      }
    },
    async showJoinDialog() {
      const hasWebcam = await this.checkInputDevices();

      if (hasWebcam) {
        this.joinChime = true;
      } else {
        this.$q.notify({
          message: "No webcam found, are you sure it's connected ?",
          color: "warning"
        });
      }
    },
    async checkInputDevices() {
      try {
        const constraints = { audio: true, video: true };
        if (!navigator.mediaDevices) {
          return false;
        } else {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);

          if (!stream) return false;
          console.log(stream);
          return true;
        }
      } catch (error) {
        return false;
      }
    }
  }
};
</script>
