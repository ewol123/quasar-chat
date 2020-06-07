<template>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar icon="fas fa-exclamation" color="primary" text-color="white" />
      <span class="q-ml-sm text-weight-bold"
        >Welcome, please enter your user details</span
      >
    </q-card-section>
    <q-card-section>
      <q-input v-model="form.name" label="Name" dense />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
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
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "NewUserDialog",
  data() {
    return {
      loading: false,
      form: {
        name: ""
      }
    };
  },
  watch: {
    '$store.state.user.user': {
      handler(val){
        if(!val) return;
        this.loading = false;
        this.$emit("close");
      }
    }
  },
  methods: {
    ...mapActions({
      create: "user/create"
    }),
    createUser() {
        this.loading = true;
        this.create(this.form);
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
