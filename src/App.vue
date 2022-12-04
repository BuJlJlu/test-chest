<template>
  <div class="page">
    <div class="left-wall"></div>
    <div class="torch"></div>
    <div class="canvas-wrapper">
      <canvas
        class="canvas"
        ref="canvas"
      ></canvas>
    </div>
    <div class="chest">
      <Logo class="chest__logo" />
      <ChestList
        class="chest__list"
        :class="{ lock: !!!availableGames }"
        :activeChest="activeChest"
        :gameIsActive="gameIsActive"
        :gameIsVictorious="gameIsVictorious"
        :gameIsAvailable="!!availableGames"
        @chooseChest="startPlay"
      />
      <p class="chest__text">
        Для игры Вам необходимо купить попытки, а затем нажать кнопку "ИГРАТЬ"
      </p>
    </div>
    <div class="right-section">
      <InfoBlock
        :gamePrice="gamePrice"
        :addedGames="addedGames"
        :gamesPrice="gamesPrice"
        :availableGames="availableGames"
        @buyGames="buyGames"
        @addedGamesUp="addedGames = addedGames + 1"
        @addedGamesDown="addedGames = addedGames - 1"
        class="right-section__info-block"
      />
    </div>
    <DefaultButton
      class="play-btn"
      text="Играть"
      :lock="!!!startGameIsAvailable"
      @click="startPlay()"
    />
    <Gnom />
    <transition
      name="modal"
      :duration="{ enter: 300, leave: 200 }"
    >
      <Modal
        v-if="modalIsOpen"
        :text="modalText"
        @close="closeModal"
      />
    </transition>
  </div>
</template>

<script>
import Gnom from "./components/Gnom/index.vue";
import Logo from "./components/Logo.vue";
import Modal from "./components/Modal.vue";
import DefaultButton from "./components/ui/DefaultButton.vue";
import ChestList from "./components/ChestList.vue";
import InfoBlock from "./components/InfoBlock.vue";

export default {
  components: { Gnom, Logo, ChestList, Modal, DefaultButton, InfoBlock },

  data() {
    return {
      gamePrice: 5,
      addedGames: 0,
      availableGames: 0,

      activeChest: null,
      gameIsVictorious: true,
      gameIsActive: false,

      modalIsOpen: false,
    };
  },

  computed: {
    gamesPrice() {
      return this.gamePrice * this.addedGames;
    },

    startGameIsAvailable() {
      return !this.gameIsActive && !!this.availableGames;
    },

    modalText() {
      return this.gameIsVictorious
        ? "Поздравляем! Вы выиграли"
        : "Не повезло! Попробуйте еще раз";
    },
  },

  methods: {
    buyGames() {
      this.availableGames = this.availableGames + this.addedGames;
      this.addedGames = 0;
    },

    startPlay(index) {
      this.availableGames = this.availableGames - 1;
      this.gameIsActive = true;
      this.activeChest = index ? index : Math.ceil(Math.random() * 9);

      setTimeout(this.openModal, 700);
    },

    endGame() {
      this.gameIsActive = false;
      this.activeChest = null;
      this.gameIsVictorious = !this.gameIsVictorious;
    },

    openModal() {
      this.modalIsOpen = true;
    },

    closeModal() {
      this.modalIsOpen = false;
      this.endGame();
    },

    canvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      const W = 384,
        H = 800;
      canvas.width = W;
      canvas.height = H;

      let particles = [];
      let mouse = {};

      const particle_count = 200;
      for (let i = 0; i < particle_count; i++) {
        particles.push(new particle());
      }

      function particle() {
        this.speed = {
          x: -5 + Math.random() * 5,
          y: -15 + Math.random() * 10,
        };
        if (mouse.x && mouse.y) {
          this.location = { x: mouse.x, y: mouse.y };
        } else {
          this.location = { x: W / 2, y: H / 2 };
        }
        this.radius = 50 + Math.random() * 20;
        this.life = 20 + Math.random() * 10;
        this.remaining_life = this.life;
        this.r = 233;
        this.g = 183;
        this.b = 155;
      }

      function draw() {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "transparent";
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillRect(0, 0, W, H);

        ctx.globalCompositeOperation = "distination-over";

        for (let i = 0; i < particles.length; i++) {
          let p = particles[i];
          ctx.beginPath();
          p.opacity = Math.round((p.remaining_life / p.life) * 100) / 100;
          let gradient = ctx.createRadialGradient(
            p.location.x,
            p.location.y,
            0,
            p.location.x,
            p.location.y,
            p.radius
          );
          p.r = 233;
          p.g = 183;
          p.b = 155;
          gradient.addColorStop(
            0,
            "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")"
          );
          gradient.addColorStop(
            0.2,
            "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")"
          );
          gradient.addColorStop(
            1,
            "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)"
          );
          ctx.fillStyle = gradient;
          ctx.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false);
          ctx.fill();
          p.remaining_life--;
          p.radius--;
          p.location.x += p.speed.x;
          p.location.y += p.speed.y;

          if (p.remaining_life < 0 || p.radius < 0) {
            particles[i] = new particle();
          }
        }
        ctx.textAlign = "center";
      }

      setInterval(draw, 33);
    },
  },

  mounted() {
    this.canvas();
  },
};
</script>

<style lang="scss" scoped>
.page {
  position: relative;

  height: 100vh;

  background-color: $black;
  background-size: cover;
  background-image: url("/src/assets/images/background.jpg");

  overflow: hidden;

  .left-wall {
    position: absolute;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    pointer-events: none;

    z-index: 4;

    background-image: url("/src/assets/images/left-wall.png");
    background-repeat: no-repeat;
    background-position: left bottom;
    background-size: auto 92.26%;
  }

  .torch {
    position: absolute;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    pointer-events: none;

    z-index: 5;

    background-image: url("/src/assets/images/torch.png");
    background-repeat: no-repeat;
    background-position: 0 30%;
  }

  .right-section {
    position: absolute;

    width: 37.2%;
    top: 0;
    right: 0;
    bottom: 0;

    z-index: 4;

    background-image: url("/src/assets/images/right-section.png");
    background-repeat: no-repeat;

    background-size: cover;

    &__info-block {
      top: 21.8%;
      margin-left: 45px;
    }
  }

  .gnom {
    position: absolute;

    top: 11.24%;
    right: 30.52%;

    pointer-events: none;

    z-index: 3;
  }
}

.chest {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  position: absolute;

  top: 11.24%;
  right: 53.23%;

  &__list {
    &.lock {
      pointer-events: none;
    }
  }

  &__logo {
    margin-bottom: 20px;
  }

  &__text {
    color: $white;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    text-shadow: 0 0 32px $gray;

    max-width: 310px;

    margin: 12px auto 0;
  }
}

.play-btn {
  position: absolute;

  z-index: 4;

  top: calc(405px + 21.8%);
  right: 38.5%;

  filter: grayscale(1);
}

.canvas-wrapper {
  position: absolute;

  height: 579px;
  width: 384px;

  top: 30%;
}
.canvas {
  position: absolute;
  top: -65%;
  left: 6%;

  z-index: 6;

  mix-blend-mode: plus-lighter;
}
</style>
