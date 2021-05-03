<template>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar icon="fas fa-exclamation" color="primary" text-color="white" />
      <span class="q-ml-sm text-weight-bold"
        >To join a meeting please enter the meeting identifier</span
      >
    </q-card-section>
    <q-card-section>
      <q-input v-model="form.meetingId" label="Meeting Identifier" dense />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        flat
        label="let's do it"
        color="primary"
        :disable="$v.form.$invalid"
        :loading="loading"
        @click="joinChime()"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "JoinChimeDialog",
  data() {
    return {
      form: {
        meetingId: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      loading: "chime/loading"
    })
  },
  methods: {
    ...mapActions({
      join: "chime/joinChimeMeeting"
    }),
    ...mapMutations({
      setLoading: "chime/loading"
    }),
    joinChime() {
      this.setLoading(true);
      this.join({ ...this.form, userIdentifier: this.user.id });
      this.$emit("close");
    }
  },
  validations: {
    form: {
      meetingId: {
        required
      }
    }
  }
};
</script>

<style></style>
