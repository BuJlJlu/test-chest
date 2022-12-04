<template>
  <div class="gnom">
    <img
      class="gnom__img"
      width="411"
      height="669"
      src="/src/assets/images/gnom.png"
      alt=""
    />
    <img
      class="gnom__animation--head gnom__animation"
      :class="{ animation: !!!(count % 7) }"
      src="/src/assets/images/gnom/head/1.jpg"
      width="89"
      height="97"
      alt=""
    />
    <img
      class="gnom__animation--head gnom__animation"
      :class="{ animation: !!!(count % 8) }"
      src="/src/assets/images/gnom/head/2.jpg"
      width="89"
      height="97"
      alt=""
    />
    <div
      class="gnom__animation--shoulder gnom__animation"
      :class="{ animation: !!!(count % 5) }"
    >
      <img
        class="gnom__animation-img"
        src="/src/assets/images/gnom/shoulder.jpg"
        width="103"
        height="69"
        alt=""
      />
    </div>
    <div
      class="gnom__animation--handcuff gnom__animation"
      :class="{ animation: !!!(count % 4) }"
    >
      <img
        class="gnom__animation-img"
        src="/src/assets/images/gnom/handcuff.jpg"
        width="99"
        height="73"
        alt=""
      />
    </div>
    <div
      class="gnom__animation--ax gnom__animation"
      :class="{ animation: !!!(count % 3) }"
    >
      <img
        class="gnom__animation-img"
        src="/src/assets/images/gnom/ax.jpg"
        width="161"
        height="133"
        alt=""
      />
    </div>
    <Tooltip class="gnom__tooltip" />
  </div>
</template>

<script>
import Tooltip from "./Tooltip.vue";

export default {
  components: { Tooltip },

  name: "Gnom",

  data() {
    return {
      count: 1,
      counter: null,
    };
  },

  mounted() {
    this.counter = setInterval(this.timer, 1000);
  },

  methods: {
    timer() {
      this.count++;
    },
  },
};
</script>

<style lang="scss" scoped>
.gnom {
  position: relative;
  &::after {
    content: "";
    position: absolute;

    width: 515px;
    height: 796px;
    top: 57%;
    left: 51%;

    z-index: -1;

    transform: translate(-50%, -50%);
    background-image: url("/src/assets/images/gnom-shadow-back.png");
  }

  &::before {
    content: "";
    position: absolute;

    width: 659px;
    height: 532px;
    top: 50%;
    left: 50%;

    z-index: -2;

    transform: translate(-50%, -50%);

    background-image: url("/src/assets/images/gnom-shadow-front.png");
  }

  &__img {
    display: block;
  }

  &__animation-img {
    display: block;
  }

  &__animation {
    position: absolute;

    &--head {
      top: 33px;
      left: 142px;
      opacity: 0;
      &.animation {
        opacity: 1;
      }
    }

    &--shoulder {
      top: 101px;
      left: 221px;

      mask-image: url("/src/assets/images/mask/shoulder.png");

      &::after {
        background-image: radial-gradient(
          at top,
          rgb(255 255 255 / 70%) 20%,
          transparent 47%
        );
      }
    }

    &--handcuff {
      top: 120px;
      left: 92px;

      mask-image: url("/src/assets/images/mask/handcuff.png");

      &::after {
        background-image: linear-gradient(
          128deg,
          transparent 26%,
          rgba(255, 255, 255, 0.4) 45%,
          rgba(255, 255, 255, 0.4) 56%,
          transparent 79%
        );
      }
    }

    &--ax {
      top: 195px;
      left: 79px;

      mask-image: url("/src/assets/images/mask/ax.png");

      &::after {
        background-image: linear-gradient(
          95deg,
          transparent 26%,
          rgba(255, 255, 255, 0.4) 45%,
          rgba(255, 255, 255, 0.4) 56%,
          transparent 79%
        );
      }
    }

    &--ax,
    &--shoulder,
    &--handcuff {
      mask-repeat: no-repeat;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
      }
      &.animation {
        &::after {
          animation: blick 1s;
        }
      }
    }
  }

  &__tooltip {
    position: absolute;

    top: 146px;
    left: -15px;
  }
}
</style>
