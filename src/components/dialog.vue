<template>
  <div class="layer_dialog" v-show="isShowAlert">
    <div class="inner">
      <p class="desc" v-html="alertMessage"></p>
      <div class="wrap_btn">
        <button type="button" class="btn_reset" v-if="isConfirm" @click="hideAlert">취소</button>
        <button type="button" ref="alert" class="btn_alert emph1" @click="onClickConfirm">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "utilDialog",
  data() {
    return {
      alertMessage: "",
      callBackEvent: null,
      isShowItem: false
    };
  },
  computed: {
    isShowAlert() {
      return this.isShowItem;
    },
    isConfirm() {
      return !!this.callBackEvent;
    }
  },
  methods: {
    onClickConfirm() {
      if (this.callBackEvent.length !== 0) {
        this.callBackEvent();
      }
      this.hideAlert();
    },
    showAlert(callBackEvent, message) {
      if (callBackEvent.length !== 0) {
        this.callBackEvent = callBackEvent;
      }
      this.alertMessage = message || "적용되었습니다.";
      this.isShowItem = true;
      this.$refs.alert.focus();
    },
    hideAlert() {
      this.isShowItem = false;
    }
  }
};
</script>

<style scoped>
.layer_dialog {
  z-index: 1000;
}
.inner {
  width: 300px;
}
p {
  display: block;
  text-align: center;
  font-size: 20px;
  color: #8e8e8e;
}
button {
  float: none;
}
.btn_alert {
  display: inline-block;
}
.wrap_btn {
  margin-top: 30px;
  text-align: center;
}
em {
  color: #FC4C4E;
}
</style>
