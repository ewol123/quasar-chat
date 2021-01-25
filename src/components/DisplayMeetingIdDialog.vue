<template>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar icon="fas fa-exclamation" color="primary" text-color="white" />
      <span class="q-ml-sm"
        >Invite your friends with your meeting id
        <q-input ref="copyMeetingId" :value="meetingId" readonly type="text" />
      </span>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="copy code" color="primary" @click="copy()" />
      <q-btn flat label="okay, got it!" color="primary" @click="close()" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "DisplayMeetingIdDialog",
  props: {
    meetingId: {
      required: true,
      type: String
    }
  },
  methods: {
    copy() {
      this.$refs.copyMeetingId.select();
      document.execCommand("copy");
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
