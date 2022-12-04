<template>
  <div class="info-block">
    <div class="info-block__header">
      <img
        class="info-block__header-img"
        src="/src/assets/images/title.png"
        width="236"
        height="51"
        alt=""
      />
    </div>
    <span class="info-block__header-shadow"></span>
    <p class="info-block__price">1 игра = {{ gamePrice }} $</p>
    <p class="info-block__title">Вам доступно</p>
    <div class="info-block__value-item">
      <p class="info-block__text">Игр:</p>
      <p class="info-block__value">{{ availableGames }}</p>
    </div>
    <p class="info-block__title info-block__title--big-space">Покупка:</p>
    <div class="info-block__value-item">
      <p class="info-block__text">Игр:</p>
      <p class="info-block__value">
        {{ addedGames }}
      </p>
      <div class="info-block__controls">
        <button
          class="info-block__up"
          @click="this.$emit('addedGamesUp')"
        ></button>
        <button
          class="info-block__down"
          :class="{ lock: !!!addedGames }"
          @click="this.$emit('addedGamesDown')"
        ></button>
      </div>
    </div>
    <div class="info-block__value-item">
      <p class="info-block__text">Сумма:</p>
      <p class="info-block__value">{{ gamesPrice }}</p>
      <span class="info-block__dollar">$</span>
    </div>
    <DefaultButton
      class="info-block__btn buy-btn"
      text="Купить"
      :lock="!!!addedGames"
      @click="this.$emit('buyGames')"
    />
  </div>
</template>

<script>
import DefaultButton from "../components/ui/DefaultButton.vue";

export default {
  components: { DefaultButton },

  name: "InfoBlock",

  props: {
    gamePrice: {
      type: Number,
      required: true,
    },

    addedGames: {
      type: Number,
      required: true,
    },

    gamesPrice: {
      type: Number,
      required: true,
    },

    availableGames: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.info-block {
  position: relative;

  font-family: bremencaps, Helvetica, sans-serif;

  width: 273px;
  padding: 30px 20px 41px 21px;

  background-image: url("/src/assets/images/controls-background.png");

  &__price {
    margin: 0;

    color: $lightestGray;
    font-size: 15px;
    line-height: 15px;
  }

  &__title {
    margin: 35px 0 15px 0;

    color: $white;
    font-size: 18px;
    line-height: 18px;
    text-transform: uppercase;
    text-shadow: -3px 7px 3px rgba($gray, 0.4);

    &--big-space {
      margin-top: 47px;
    }
  }

  &__value-item {
    margin-bottom: 10px;

    position: relative;

    padding-right: 18px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__text {
    margin: 0;

    color: $lightGray;
    font-size: 15px;
    line-height: 15px;
    text-transform: uppercase;
    text-shadow: -3px 7px 3px rgba($gray, 0.4);
  }

  &__value {
    margin: 0;

    color: $yellow;
    font-size: 30px;
    line-height: 30px;
    text-shadow: -3px 7px 3px rgba($gray, 0.4);
  }

  &__controls {
    position: absolute;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__up,
  &__down {
    cursor: pointer;

    position: relative;

    width: 13px;
    height: 7px;

    padding: 0;

    background-color: transparent;

    border: 0;

    &::after,
    &::before {
      content: "";

      position: absolute;

      width: 1px;
      height: 7px;
      top: 0;
      left: calc(50% - 0.5px);

      background-color: $white;
      transform-origin: top;
    }

    &::after {
      transform: rotate(50deg);
    }

    &::before {
      transform: rotate(-50deg);
    }

    &.lock {
      &::after,
      &::before {
        background-color: $lightGray;
      }

      pointer-events: none;
    }
  }

  &__up {
    margin-bottom: 4px;
  }

  &__down {
    transform: rotate(180deg);
  }

  &__dollar {
    position: absolute;
    right: 0;

    color: $lightGray;
    text-align: right;
    font-size: 24px;
    line-height: 24px;
    text-shadow: -3px 7px 3px rgba($gray, 0.4);
  }

  &__header {
    margin: 0 auto 40px;

    z-index: 1;

    &::after {
      content: "";
    }
  }

  &__header-shadow {
    position: absolute;

    width: 296px;
    height: 108px;

    top: 1px;
    left: 50%;

    transform: translateX(-50%);

    background-image: url("/src/assets/images/title-background.png");
    background-size: cover;

    mix-blend-mode: color-dodge;
  }

  &__header-img {
    display: block;
    margin: 0 auto;

    filter: drop-shadow(
      5px -5px 13px rgba($gray, 0.75),
      0 0 5px rgba($yellow, 0.75)
    );

    mix-blend-mode: plus-lighter;
  }

  &__btn {
    margin-top: 20px;
  }
}
</style>
