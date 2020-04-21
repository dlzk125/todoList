<template>
  <div>
    <tab-list @onClickTab="onClickTab" v-bind:tabs="tabs"/>
    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import tabList from "../components/tabList";
import memoList from "../components/memoList";
import trashList from "../components/trashList";
export default {
  name: "MemoPage",
  components: {
    tabList,
    memoList,
    trashList
  },
  data: function() {
    return {
      currentTab: "memo",
      tabs: [
        { key: 1, text: "메모", name: "memo" },
        { key: 2, text: "휴지통", name: "trash" }
      ]
    };
  },
  computed: {
    currentTabComponent() {
      return `${this.currentTab}-list`;
    }
  },
  methods: {
    onClickTab(tabName) {
      this.currentTab = tabName;
    }
  }
};
</script>

<style>
</style>
