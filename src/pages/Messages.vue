<template>
  <q-page padding>
    <div style="width: 100%">
      <q-chat-message
        name="You"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['hey, how are <strong>you</strong>?']"
        stamp="7 minutes ago"
        sent
        bg-color="amber-7"
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
export default {
  name: "Messages"
};
</script>
