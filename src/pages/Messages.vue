<template>
  <q-page padding>
    <div style="width: 100%">
      <q-chat-message
        v-for="(message, index) in mappedMessages"
        :key="index"
        :name="message.name"
        avatar="~assets/user.png"
        :text="message.text"
        :stamp="message.stamp"
        :sent="message.sent"
        :text-sanitize="message.sanitize"
        :text-color="message.textColor"
        :bg-color="message.bgColor"
      />
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
            v-model="text"
            :disable="!isInitialized"
            rounded
            outlined
            dense
            class="WAL__field col-grow q-mr-sm"
            bg-color="white"
            placeholder="Type a message"
            @keydown.enter="sendMessage()"
          />
          <q-btn
            :disable="!isInitialized || loading"
            :loading="loading"
            flat
            round
            icon="send"
            @click="sendMessage()"
          ></q-btn>
        </q-toolbar>
      </q-footer>
    </div>
  </q-page>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { orderBy } from "lodash";
import moment from "moment";
export default {
  name: "Messages",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isInitialized) next({ name: "Video chat" });
    });
  },
  data() {
    return {
      text: ""
    };
  },
  computed: {
    ...mapGetters({
      messages: "room/messages",
      isInitialized: "room/isInitialized",
      loading: "room/loading",
      user: "user/user"
    }),
    mappedMessages() {
      const messages = this.messages.map(message => {
        const sameUserMessage = message.user.id == this.user.id;

        return {
          name: message.user.name,
          avatar: "", //message.user.avatar,
          text: [message.text],
          stamp: new Date(message.stamp),
          sent: sameUserMessage,
          sanitize: !sameUserMessage,
          textColor: sameUserMessage ? "black" : "white",
          bgColor: sameUserMessage ? "amber-7" : "primary"
        };
      });

      return orderBy(messages, ["stamp"], ["asc"]).map(e => ({
        ...e,
        stamp: moment(e.stamp).format("YYYY-MM-DD HH:mm")
      }));
    }
  },
  methods: {
    ...mapActions({
      create: "message/create"
    }),
    ...mapMutations({
      setLoading: "room/loading"
    }),
    sendMessage() {
      if (this.$v.$invalid || this.loading) return;
      this.setLoading(true);
      this.create({ text: this.text, userIdentifier: this.user.id });
      this.text = "";
    }
  },
  validations: {
    text: {
      required
    }
  }
};
</script>
