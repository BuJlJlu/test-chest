<template>
  <div
    class="chest-item"
    :class="[{ lock: gameIsActive }, { animation: gameIsAvailable }]"
    @click="chooseChest"
  >
    <div
      class="chest-item__wrapper"
      v-if="!chestIsActive"
    ></div>
    <div
      class="chest-item__wrapper"
      :class="chestClass"
      v-else
    ></div>
  </div>
</template>

<script>
export default {
  name: "ChestItem",

  props: {
    index: {
      type: Number,
      required: true,
    },

    activeChest: {
      type: [Number, null],
      required: true,
    },

    gameIsVictorious: {
      type: Boolean,
      required: true,
    },

    gameIsActive: {
      type: Boolean,
      required: true,
    },

    gameIsAvailable: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    chestIsActive() {
      return this.index === this.activeChest;
    },
    chestClass() {
      return this.gameIsVictorious ? "victory" : "lose";
    },
  },

  methods: {
    chooseChest() {
      this.$emit("chooseChest", this.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.chest-item {
  position: relative;

  width: 166px;
  height: 166px;

  background-image: url("/src/assets/images/chest-background.png");

  &.lock {
    pointer-events: none;
  }

  &:not(.lock) {
    cursor: pointer;
  }

  &__wrapper {
    content: "";
    position: absolute;

    top: 0;
    left: -10px;
    bottom: 10px;
    right: 0;

    background-image: url("/src/assets/images/chest/chest_Close.png");
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 140px;

    filter: drop-shadow(8px 8px 16px rgba($gray, 0.7));

    &.victory {
      animation: victory 0.3s forwards linear;
    }

    &.lose {
      animation: lose 0.3s forwards linear;
    }
  }

  &.animation {
    &::after {
      content: "";
      position: absolute;

      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      z-index: 1;

      pointer-events: none;

      mix-blend-mode: color-burn;

      background-image: radial-gradient(rgba(251, 207, 176, 0.4), transparent);

      animation: opacity 1s;

      opacity: 0;
    }
  }
}
</style>
