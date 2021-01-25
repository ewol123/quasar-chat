<template>
  <q-page>
    <audio ref="audioElement" hidden></audio>

    <VideoContainer
      :elements="videoElements"
      :visible="videoElements.map(el => !el.hidden).length"
    />

    <q-fab
      color="primary"
      icon="close"
      class="absolute-bottom-right"
      style="width:60px; right:10px; bottom:10px"
      @click="leaveSession()"
    />
  </q-page>
</template>

<script>
import { DefaultActiveSpeakerPolicy } from "amazon-chime-sdk-js";
import { MeetingSessionStatusCode } from "amazon-chime-sdk-js";
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration
} from "amazon-chime-sdk-js";

import { mapGetters, mapMutations } from "vuex";
import VideoContainer from "./VideoContainer";

export default {
  name: "ChimeVideoChat",
  components: {
    VideoContainer
  },
  data() {
    return {
      meetingSession: null,
      audioInputDevices: null,
      audioOutputDevices: null,
      videoInputDevices: null,
      audioInputDeviceInfo: null,
      audioOutputDeviceInfo: null,
      videoInputDeviceInfo: null,
      videoElements: [
        {
          id: "videoElement1",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement2",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement3",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement4",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement5",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement6",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement7",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement8",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement9",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement10",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement11",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement12",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement13",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement14",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement15",
          attendeeId: null,
          hidden: true,
          speaking: false
        },
        {
          id: "videoElement16",
          attendeeId: null,
          hidden: true,
          speaking: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      meetingResponse: "chime/meetingResponse",
      attendeeResponse: "chime/attendeeResponse",
      attendeeId: "chime/attendeeId"
    })
  },
  async mounted() {
    this.meetingSession = await this.getMeetingSession();

    await this.listDevices();

    await this.chooseDevices();

    this.addDeviceChangeObserver();

    this.addAudioObserver();

    this.meetingSession.audioVideo.start();

    this.startVideoShare();
    this.viewAttendeeVideos();
    this.detectActiveSpeaker();
  },
  methods: {
    ...mapMutations({
      leaveChimeMeeting: "chime/leaveChimeMeeting"
    }),
    async listDevices() {
      try {
        this.audioInputDevices = await this.meetingSession.audioVideo.listAudioInputDevices();
        this.audioOutputDevices = await this.meetingSession.audioVideo.listAudioOutputDevices();
        this.videoInputDevices = await this.meetingSession.audioVideo.listVideoInputDevices();
      } catch (error) {
        this.showNotify("Error while checking audio/video devices");
      }
    },
    async chooseDevices() {
      try {
        this.audioInputDeviceInfo = this.audioInputDevices[0]; //choose first for now
        await this.meetingSession.audioVideo.chooseAudioInputDevice(
          this.audioInputDeviceInfo.deviceId
        );
        this.audioOutputDeviceInfo = this.audioOutputDevices[0]; //choose first for now
        await this.meetingSession.audioVideo.chooseAudioOutputDevice(
          this.audioOutputDeviceInfo.deviceId
        );

        if (this.videoInputDevices) {
          this.videoInputDeviceInfo = this.videoInputDevices[0];
          await this.meetingSession.audioVideo.chooseVideoInputDevice(
            this.videoInputDeviceInfo.deviceId
          );
        } else
          await this.meetingSession.audioVideo.chooseVideoInputDevice(null);
      } catch (error) {
        this.showNotify("Webcam not found, are you sure it's connected?");
      }
    },
    addDeviceChangeObserver() {
      try {
        const observer = {
          audioInputsChanged: freshAudioInputDeviceList => {
            // An array of MediaDeviceInfo objects
            freshAudioInputDeviceList.forEach(mediaDeviceInfo => {
              console.log(
                `Device ID: ${mediaDeviceInfo.deviceId} Microphone: ${mediaDeviceInfo.label}`
              );
            });
          },
          audioOutputsChanged: freshAudioOutputDeviceList => {
            console.log("Audio outputs updated: ", freshAudioOutputDeviceList);
          },
          videoInputsChanged: freshVideoInputDeviceList => {
            console.log("Video inputs updated: ", freshVideoInputDeviceList);
          }
        };

        this.meetingSession.audioVideo.addDeviceChangeObserver(observer);
      } catch (error) {
        this.showNotify("Error with device change observers. Please refresh");
      }
    },
    addAudioObserver() {
      try {
        const audioElement = this.$refs.audioElement;
        this.meetingSession.audioVideo.bindAudioElement(audioElement);

        const observer = {
          audioVideoDidStart: () => {
            console.log("Started");
          },
          audioVideoDidStop: sessionStatus => {
            // See the "Stopping a session" section for details.
            console.log(
              "Stopped with a session status code: ",
              sessionStatus.statusCode()
            );
          },
          audioVideoDidStartConnecting: reconnecting => {
            if (reconnecting) {
              // e.g. the WiFi connection is dropped.
              console.log("Attempting to reconnect");
            }
          }
        };
        this.meetingSession.audioVideo.addObserver(observer);
      } catch (error) {
        this.showNotify("Error with audio observers, please refresh");
      }
    },
    getMeetingSession() {
      const logger = new ConsoleLogger("MyLogger", LogLevel.INFO);
      const deviceController = new DefaultDeviceController(logger);

      const meetingResponse = this.meetingResponse;
      const attendeeResponse = this.attendeeResponse;
      const configuration = new MeetingSessionConfiguration(
        meetingResponse,
        attendeeResponse
      );

      const meetingSession = new DefaultMeetingSession(
        configuration,
        logger,
        deviceController
      );
      return meetingSession;
    },
    mute() {
      // Mute
      this.meetingSession.audioVideo.realtimeMuteLocalAudio();
    },
    unmute() {
      // Unmute
      const unmuted = this.meetingSession.audioVideo.realtimeUnmuteLocalAudio();
      if (unmuted) {
        console.log("Other attendees can hear your audio");
      } else {
        // See the realtimeSetCanUnmuteLocalAudio use case below.
        console.log("You cannot unmute yourself");
      }
    },
    detectActiveSpeaker() {
      const activeSpeakerCallback = attendeeIds => {
        if (attendeeIds.length) {
          console.log(`${attendeeIds[0]} is the most active speaker`);
          this.videoElements.forEach(element => {
            element.speaking = false;
          });

          const index = this.videoElements.findIndex(
            e => e.attendeeId == attendeeIds[0]
          );

          if (index !== -1) {
            this.videoElements[index].speaking = true;
          }
        } else {
          this.videoElements.forEach(element => {
            element.speaking = false;
          });
        }
      };

      this.meetingSession.audioVideo.subscribeToActiveSpeakerDetector(
        new DefaultActiveSpeakerPolicy(),
        activeSpeakerCallback
      );
    },
    async startVideoShare() {
      const videoElement = document.getElementById("videoElement1");

      await this.meetingSession.audioVideo.chooseVideoInputDevice(
        this.videoInputDeviceInfo.deviceId
      );

      const observer = {
        // videoTileDidUpdate is called whenever a new tile is created or tileState changes.
        videoTileDidUpdate: tileState => {
          // Ignore a tile without attendee ID and other attendee's tile.
          if (!tileState.boundAttendeeId || !tileState.localTile) {
            return;
          }

          this.meetingSession.audioVideo.bindVideoElement(
            tileState.tileId,
            videoElement
          );
        }
      };

      this.meetingSession.audioVideo.addObserver(observer);

      this.meetingSession.audioVideo.startLocalVideoTile();
      this.videoElements[0].hidden = false;
      this.videoElements[0].attendeeId = this.attendeeId;
    },
    stopVideoShare() {
      const videoElement = document.getElementById("videoElement1");

      let localTileId = null;
      const observer = {
        videoTileDidUpdate: tileState => {
          // Ignore a tile without attendee ID and other attendee's tile.
          if (!tileState.boundAttendeeId || !tileState.localTile) {
            return;
          }

          // videoTileDidUpdate is also invoked when you call startLocalVideoTile or tileState changes.
          console.log(
            `If you called stopLocalVideoTile, ${tileState.active} is false.`
          );
          meetingSession.audioVideo.bindVideoElement(
            tileState.tileId,
            videoElement
          );
          localTileId = tileState.tileId;
        },
        videoTileWasRemoved: tileId => {
          if (localTileId === tileId) {
            console.log(
              `You called removeLocalVideoTile. videoElement can be bound to another tile.`
            );
            localTileId = null;
          }
        }
      };

      meetingSession.audioVideo.addObserver(observer);

      meetingSession.audioVideo.stopLocalVideoTile();

      // Optional: You can remove the local tile from the session.
      meetingSession.audioVideo.removeLocalVideoTile();
      this.videoElements[0].hidden = true;
    },
    viewAttendeeVideos() {
      // index-tileId pairs
      const indexMap = {};

      const acquireVideoElement = (tileId, attendeeId) => {
        // Return the same video element if already bound.
        for (let i = 0; i < 16; i += 1) {
          if (indexMap[i] === tileId) {
            const el = document.getElementById(this.videoElements[i].id);
            this.videoElements[i].hidden = false;
            this.videoElements[i].attendeeId = attendeeId;
            return el;
          }
        }
        // Return the next available video element.
        for (let i = 0; i < 16; i += 1) {
          if (!indexMap.hasOwnProperty(i)) {
            indexMap[i] = tileId;
            const el = document.getElementById(this.videoElements[i].id);
            this.videoElements[i].hidden = false;
            this.videoElements[i].attendeeId = attendeeId;
            return el;
          }
        }
        throw new Error("no video element is available");
      };

      const releaseVideoElement = tileId => {
        for (let i = 0; i < 16; i += 1) {
          if (indexMap[i] === tileId) {
            this.videoElements[i].hidden = true;
            delete indexMap[i];
            return;
          }
        }
      };

      const observer = {
        // videoTileDidUpdate is called whenever a new tile is created or tileState changes.
        videoTileDidUpdate: tileState => {
          // Ignore a tile without attendee ID, a local tile (your video), and a content share.
          if (
            !tileState.boundAttendeeId ||
            tileState.localTile ||
            tileState.isContent
          ) {
            return;
          }

          this.meetingSession.audioVideo.bindVideoElement(
            tileState.tileId,
            acquireVideoElement(tileState.tileId, tileState.boundAttendeeId)
          );
        },
        videoTileWasRemoved: tileId => {
          releaseVideoElement(tileId);
        }
      };

      this.meetingSession.audioVideo.addObserver(observer);
    },
    attendeePresence() {
      const attendeePresenceSet = new Set();
      const callback = (presentAttendeeId, present) => {
        console.log(`Attendee ID: ${presentAttendeeId} Present: ${present}`);
        if (present) {
          attendeePresenceSet.add(presentAttendeeId);
        } else {
          attendeePresenceSet.delete(presentAttendeeId);
        }
      };

      this.meetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(
        callback
      );
    },
    alertObserver() {
      const observer = {
        connectionDidBecomePoor: () => {
          console.log("Your connection is poor");
        },
        connectionDidSuggestStopVideo: () => {
          console.log("Recommend turning off your video");
        },
        videoSendDidBecomeUnavailable: () => {
          console.log("You cannot share your video");
        },
        videoAvailabilityDidChange: videoAvailability => {
          if (videoAvailability.canStartLocalVideo) {
            console.log("You can share your video");
          } else {
            console.log("You cannot share your video");
          }
        }
      };

      this.meetingSession.audioVideo.addObserver(observer);
    },
    leaveSessionObserver() {
      const observer = {
        audioVideoDidStop: sessionStatus => {
          const sessionStatusCode = sessionStatus.statusCode();
          if (sessionStatusCode === MeetingSessionStatusCode.Left) {
            console.log("You left the session");
          } else if (
            sessionStatusCode === MeetingSessionStatusCode.AudioCallEnded
          ) {
            console.log("The session has ended");
          } else {
            console.log(
              "Stopped with a session status code: ",
              sessionStatusCode
            );
          }
        }
      };

      this.meetingSession.audioVideo.addObserver(observer);

      this.meetingSession.audioVideo.stop();
    },
    leaveSession() {
      this.leaveSessionObserver();
      this.videoElements.forEach(element => {
        element.hidden = true;
      });
      this.leaveChimeMeeting();
    },
    showNotify(message) {
      this.$q.notify({ message: message, color: "warning" });
    }
  }
};
</script>

<style></style>
