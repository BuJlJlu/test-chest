<template>
  <div class="modal">
    <div
      class="modal__background"
      @click="close()"
    ></div>
    <div class="modal__wrapper">
      <div class="modal__body">
        {{ text }}
      </div>
      <DefaultButton
        class="modal__close"
        text="Закрити"
        @click="close()"
      />
    </div>
  </div>
</template>

<script>
import DefaultButton from "../components/ui/DefaultButton.vue";

export default {
  components: { DefaultButton },

  name: "Modal",

  props: {
    text: {
      type: String,
      required: true,
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 10;

  &__wrapper {
    width: 528px;

    padding: 64px;

    box-shadow: 0px 6px 40px rgba($black, 0.25),
      inset 5px 5px 40px rgba($black, 1), inset -5px -5px 40px rgba($black, 1);

    z-index: 1;

    background-color: $white;
    background-image: url("/src/assets/images/right-section.png");
    background-position: right;
  }

  &__background {
    position: absolute;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: -1;

    background-color: rgba($black, 0.25);
  }

  &__body {
    color: $white;
    font-family: bremencaps, Helvetica, sans-serif;
    font-size: 40px;
    text-align: center;
  }

  &__close {
    margin-top: 40px;
    filter: hue-rotate(326deg);
  }
}
</style>
