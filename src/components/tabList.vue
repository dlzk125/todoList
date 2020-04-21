<template>
  <div class="tab_main">
    <a
      href="javascript:;"
      :class="{on: index == activeIdx}"
      v-for="(tab,index) in tabs"
      :key="tab.key"
      @click="onClickTab(tab.name, index)"
    >{{tab.text}}</a>
  </div>
</template>

<script>
export default {
  name: "tabList",
  props: {
    tabs: Array
  },
  data: function() {
    return {
      activeIdx: 0
    };
  },
  methods: {
    onClickTab(tabName, index) {
      this.activeIdx = index;
      this.$emit("onClickTab", tabName);
    }
  }
};
</script>
<style scoped>
.tab_main {
  width: 500px;
  display: flex;
  position: relative;
  padding: 0 40px;
  margin: 0 auto;
  text-align: center;
}
.tab_main::before {
  position: absolute;
  left: -500px;
  right: -500px;
  bottom: 0;
  border-bottom: 1px solid #dadada;
  content: "";
}
.tab_main a {
  flex: 1;
  padding: 20px 10px;
  color: #333;
  font-weight: bold;
}
.tab_main a:hover {
  text-decoration: none;
  background: #6fb5ba;
  color: #fff;
}
.tab_main .on {
  position: relative;
  color: #6fb5ba;
  border-bottom: 4px solid #6fb5ba;
}
</style>
