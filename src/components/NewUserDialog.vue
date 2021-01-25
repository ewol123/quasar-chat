<template>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar icon="fas fa-exclamation" color="primary" text-color="white" />
      <span class="q-ml-sm text-weight-bold"
        >Welcome, please enter your user details</span
      >
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="form.name"
        label="Name"
        dense
        @keyup.enter="createUser()"
      />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        id="go-btn"
        flat
        label="let's go"
        color="primary"
        :disable="$v.form.$invalid"
        :loading="loading"
        @click="createUser()"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "NewUserDialog",
  data() {
    return {
      form: {
        name: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      loading: "user/loading"
    })
  },
  methods: {
    ...mapActions({
      create: "user/create"
    }),
    ...mapMutations({
      setLoading: "user/loading"
    }),
    createUser() {
      this.setLoading(true);
      this.create(this.form);
      this.$emit("close");
    }
  },
  validations: {
    form: {
      name: {
        required
      }
    }
  }
};
</script>

<style></style>
