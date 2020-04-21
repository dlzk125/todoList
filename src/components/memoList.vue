<template>
  <div class="area_main">
    <filterMemo :memoList="initMemo" @onSubmitFilter="onSubmitFilter"/>
    <div class="wrap_btn">
      <span class="legend1">D-Day 7일이하</span>
      <span class="legend2">지난 메모</span>
      <button type="button" class="btn_add emph1" @click="routeAddMemoPage">추가하기</button>
    </div>
    <memo :memoList="memoList" @deleteMemoItem="deleteMemoItem" v-if="memoList.length != 0"/>
    <div v-else>
      <p class="desc_nodata">작성된 메모가 없습니다.<br>메모를 작성해주세요.</p>
    </div>
  </div>
</template>

<script>
import memo from "./memo.vue";
import filterMemo from "./filter";
export default {
  name: "memoList",
  components: {
    memo,
    filterMemo
  },
  data: function() {
    return {
      memoList: [],
      initMemo: []
    };
  },
  created() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      if (!!localStorage.getItem("memoList")) {
        this.memoList = JSON.parse(localStorage.getItem("memoList"));
        this.initMemo = JSON.parse(JSON.stringify(this.memoList));
      }
    },
    deleteMemoItem(deleteMemo) {
      let parsedTrashList = [];
      const trashList = this.initMemo.find(memoItem => {
        return memoItem.key === deleteMemo.key;
      });
      this.memoList = this.initMemo.filter(memoItem => {
        return memoItem.key !== deleteMemo.key;
      });
      const trashInfo = this.getPrasedLocalStrage('trashList');
      if(trashInfo.length !== 0) {
        parsedTrashList = JSON.parse(trashInfo);
      }
      console.log(this.memoList);
      parsedTrashList.push(trashList);
      localStorage.setItem("memoList", JSON.stringify(this.memoList));
      localStorage.setItem("trashList", JSON.stringify(parsedTrashList));
      this.init();
    },
    getPrasedLocalStrage(searchItem) {
      return localStorage.getItem(searchItem) || [];
    },
    routeAddMemoPage() {
      this.$router.push({ name: 'editMemo', params: {type:"create"}});
    },
    onSubmitFilter(optType, filterData) {
      this.memoList = this.initMemo.filter((value) => {
        return value[optType].indexOf(filterData) !== -1;
      })
    }
  }
};
</script>

<style>
span[class^=legend] {
  float: left;
  margin-top: 8px;
}
span[class^=legend]::before {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 4px 6px 0 5px;
  border-radius: 1px;
  vertical-align: top;
  content: '';
}
.legend1::before {
  background: #E88383;
}
.legend2::before {
  background: #FCEDBD;
}
.desc_nodata {
  overflow: hidden;
  width: 100%;
  font-size: 25px;
  text-align: center;
  color: #919191;
  line-height: 40px;
}
</style>
