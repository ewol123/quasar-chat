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
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="[
          'doing fine, how r you?',
          'I just feel like typing a really, really, <strong>REALY</strong> long message to annoy you...'
        ]"
        text-sanitize
        stamp="4 minutes ago"
        text-color="white"
        bg-color="primary"
      />
      <q-chat-message
        name="Jao"
        name-sanitize
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['<strong>Did it work?</strong>']"
        text-sanitize
        stamp="1 minutes ago"
        text-color="white"
        bg-color="primary"
      />
      <q-chat-message
        name="Jack"
        name-sanitize
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['sup bitches']"
        text-sanitize
        stamp="1 minutes ago"
        text-color="white"
        bg-color="primary"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex"
};
</script>
