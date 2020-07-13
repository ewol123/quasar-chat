<template>
  <q-scroll-area style="height: calc(100% - 100px)">
    <q-list>
      <q-item
        v-for="conversation in mappedUsers"
        :key="conversation.id"
        v-ripple
        clickable
      >
        <q-item-section avatar>
          <q-avatar>
            <img src="~assets/user.png" />
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
</template>

<script>
import { mapGetters } from "vuex";
import { last, orderBy } from "lodash";
import moment from "moment";
export default {
  name: "UserList",
  computed: {
    ...mapGetters({
      users: "room/users",
      messages: "room/messages"
    }),
    mappedUsers() {
      return this.users.map(user => {
        const userMessage = this.messages.filter(
          message => message.user.id == user.id
        );
        const mappedUserMessage = userMessage.map(msg => ({
          ...msg,
          stamp: new Date(msg.stamp)
        }));

        const lastUserMessage = last(
          orderBy(mappedUserMessage, ["stamp"], ["asc"])
        );

        return {
          id: user.id,
          person: user.name,
          avatar: "", //user.avatar,
          caption: lastUserMessage?.text,
          time: lastUserMessage
            ? moment(lastUserMessage.stamp).format("YYYY-MM-DD HH:mm")
            : "",
          sent: true
        };
      });
    }
  }
};
</script>

<style lang="sass">
.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
