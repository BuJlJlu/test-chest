<template>
  <div class="chest-list">
    <ChestItem
      v-for="index in 9"
      :key="index"
      :gameIsActive="gameIsActive"
      :gameIsVictorious="gameIsVictorious"
      :index="index"
      :activeChest="activeChest"
      :gameIsAvailable="gameIsAvailable"
      @chooseChest="chooseChest"
    />
  </div>
</template>

<script>
import ChestItem from "./ChestItem.vue";

export default {
  components: { ChestItem },

  name: "ChestList",

  props: {
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

  methods: {
    chooseChest(index) {
      this.$emit("chooseChest", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.chest-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 7px;

  position: relative;

  padding: 2px;

  &::before {
    content: "";
    position: absolute;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    z-index: 1;

    pointer-events: none;

    background-image: url("/src/assets/images/grid.png");
    background-repeat: no-repeat;
  }
}
</style>
