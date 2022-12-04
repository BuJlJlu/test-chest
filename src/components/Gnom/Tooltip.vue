<template>
  <div class="tooltip">
    <div class="tooltip__wrapper">
      <p class="tooltip__text">
        Вскрывай сундуки из моей сокровищницы! Ищи несметные богатства!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
};
</script>

<style lang="scss" scoped>
.tooltip {
  display: flex;

  padding: 163px 17px 39px 18px;

  width: 309px;
  height: 289px;

  background-image: url("/src/assets/images/tooltip.png");

  filter: drop-shadow(5px 5px 10px rgba($black, 0.54));

  &__text {
    color: $textColor;
    text-align: center;
    font-size: 21.54px;
    line-height: 22px;
    font-weight: 600;
    font-family: bremencaps, Helvetica, sans-serif;

    margin: 0;
  }
}
</style>
