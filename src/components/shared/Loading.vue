<template>
  <div class="loading">
    <div class="spin">
      <div class="spinner-loading">
        <img
          src="@/assets/imgs/weni-logo-small.svg"
          class="bothub-logo"
          alt="bothub-loading">
        <div class="triple-spinner"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';
@import '~@/assets/scss/colors.scss';

.loading {
  display: flex;
  justify-content: center;
}

.spin{
  margin: auto;
  width: 7.1rem;
  text-align: center;
}
.bothub-logo{
  width: 2.25rem;
  margin-right: -4rem;
}

.triple-spinner {
  display: block;
  position: relative;
  width: 5.7rem;
  height: 5.7rem;
  border-radius: 50%;
  border: 2px solid transparent;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
.spinner-loading{
  display:flex;
  width: 6.25rem;
  justify-content:center;
  align-items:center;
}
.triple-spinner::before,
.triple-spinner::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
}
.triple-spinner::before {
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border-top-color: $color-primary;
  -webkit-animation: spin2 0.55s linear infinite;
  animation: spin2 0.55s linear infinite;
}
.triple-spinner::after {
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-top-color: $color-primary;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

@-webkit-keyframes spin2 {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

@keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

@keyframes spin2 {
    from {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    to {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }

</style>
