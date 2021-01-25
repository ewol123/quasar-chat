<template>
  <div id="gallery-container">
    <q-resize-observer @resize="onResize" />
    <div id="gallery">
      <div
        v-for="(element, index) in elements"
        :key="index"
        :class="element.speaking ? 'video-container-yellow' : 'video-container'"
        :hidden="element.hidden"
      >
        <video :id="element.id"></video>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
export default {
  name: "VideoContainer",
  props: {
    elements: {
      type: Array,
      required: true
    },
    visible: {
      type: Number,
      required: true
    }
  },
  methods: {
    onResize(size) {
      this.width = size.width;
      this.height = size.height;
      this.recalculateLayout();
    },
    recalculateLayout() {
      if (!this.props) return;
      const gallery = document.getElementById("gallery");
      const aspectRatio = 16 / 9;
      const screenWidth = this.width;
      const screenHeight = this.height;
      const videoCount = this.props.visible;

      function calculateLayout(
        containerWidth,
        containerHeight,
        videoCount,
        aspectRatio
      ) {
        let bestLayout = {
          area: 0,
          cols: 0,
          rows: 0,
          width: 0,
          height: 0
        };

        // brute-force search layout where video occupy the largest area of the container
        for (let cols = 1; cols <= videoCount; cols++) {
          const rows = Math.ceil(videoCount / cols);
          const hScale = containerWidth / (cols * aspectRatio);
          const vScale = containerHeight / rows;
          let width;
          let height;
          if (hScale <= vScale) {
            width = Math.floor(containerWidth / cols);
            height = Math.floor(width / aspectRatio);
          } else {
            height = Math.floor(containerHeight / rows);
            width = Math.floor(height * aspectRatio);
          }
          const area = width * height;
          if (area > bestLayout.area) {
            bestLayout = {
              area,
              width,
              height,
              rows,
              cols
            };
          }
        }
        return bestLayout;
      }

      const { width, height, cols } = calculateLayout(
        screenWidth,
        screenHeight,
        videoCount,
        aspectRatio
      );

      gallery.style.setProperty("--width", width + "px");
      gallery.style.setProperty("--height", height + "px");
      gallery.style.setProperty("--cols", cols + "");
    }
  }
};
</script>

<style lang="scss">
#gallery-container {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
  background-color: #1c1c1e;
}

#gallery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: calc(var(--width) * var(--cols));
}

.video-container {
  width: var(--width);
  height: var(--height);
  background-color: #3a3a3e;
}

.video-container-yellow {
  width: var(--width);
  height: var(--height);
  background-color: #3a3a3e;
  border: 2px solid yellow;
}

video {
  height: 100%;
  width: 100%;
}
</style>
