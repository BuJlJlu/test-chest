<template>
  <button
    class="btn"
    :class="{ lock: lock }"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "DefaultButton",

  props: {
    text: {
      type: String,
      required: true,
    },

    lock: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;

  position: relative;

  color: $brown;
  font-family: bremencaps, Helvetica, sans-serif;
  font-size: 36px;
  text-transform: uppercase;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 229px;
  height: 63px;

  margin-left: auto;
  margin-right: auto;

  background-image: url("/src/assets/images/buy-btn-background.png");
  box-shadow: 3px -3px 7px rgba($gray, 0.4);

  border-radius: 7px;
  border: 0;

  &::after {
    content: "";
    position: absolute;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    pointer-events: none;

    background-image: url("/src/assets/images/buy-btn-border.png");
    background-position: center;
    background-repeat: no-repeat;

    filter: drop-shadow(-7px 7px 3px rgba($gray, 0.4));
  }

  &.lock {
    pointer-events: none;
  }

  &:not(.lock) {
    transition: 0.3s opacity;

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
