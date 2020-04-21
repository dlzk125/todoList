<template>
  <div class="area_main">
    <filterMemo :memoList="initMemo" @onSubmitFilter="onSubmitFilter"/>
    <div class="wrap_btn">
    <span class="legend1">D-Day 7일이하</span>
    <span class="legend2">지난 메모</span>
    <button type="button" class="btn_restore emph1" @click="allRestore">전체 복원</button>
    <button type="button" class="btn_delte emph2" @click="allDelete">전체 삭제</button>
    </div>
    <memo :isMemoList=false :memoList="trashList" @restoreMemoItem="restoreMemoItem" @deleteMemoItem="deleteMemoItem" v-if="trashList.length != 0"/>
    <p class="desc_nodata" v-else>휴지통에 남아있는 메모가 없습니다.<br>다시 한번 확인해보세요.</p>
    <utilDialog ref="dialog"/>
  </div>
</template>

<script>
import memo from "./memo.vue";
import utilDialog from "./dialog";
import filterMemo from "./filter";
export default {
  name: "trashList",
  components: {
    memo,
    utilDialog,
    filterMemo
  },
  created() {
    this.init();
  },
  activated() {
    this.init();
  },
  data: function() {
    return {
      trashList: [],
      memoList: []
    };
  },
  methods: {
    init() {
      this.getTrashList();
      this.getMemoList();
      this.initMemo = JSON.parse(JSON.stringify(this.trashList));
    },
    getTrashList() {
      if (!!localStorage.getItem("trashList")) {
        this.trashList = JSON.parse(localStorage.getItem("trashList"));
      }
    },
    getMemoList() {
      if (!!localStorage.getItem("memoList")) {
        this.memoList = JSON.parse(localStorage.getItem("memoList"));
      }
      console.log(this.memoList, this.trashList);
    },
    alertCallback(callback, message) {
      this.$refs.dialog.showAlert(callback, message);
    },
    allDelete() {
      this.alertCallback(this.allDeleteMemo, "모든 메모를<br>삭제하시겠습니까?<br>삭제한 메모는 다시 복구가 <em class='fc_emph2'>불가능</em>합니다.");
    },
    allDeleteMemo() {
      this.trashList = [];
      localStorage.setItem("trashList", this.trashList);
    },
    deleteMemoItem(deleteMemo) {
      this.trashList = this.trashList.filter(trashItem => {
        return trashItem.key !== deleteMemo.key;
      });

      localStorage.setItem("trashList", JSON.stringify(this.trashList));
    },
    allRestore() {
      this.alertCallback(this.allRestoreMemo, "모든 메모를<br>복구하시겠습니까?");
    },
    allRestoreMemo() {
      const addMemoList = this.memoList.concat(this.trashList);
      localStorage.setItem("memoList", JSON.stringify(addMemoList));
      this.allDeleteMemo();
    },
    restoreMemoItem(restoreMemo) {
      this.deleteMemoItem(restoreMemo);
      this.memoList.push(restoreMemo);
      console.log(this.memoList);
      localStorage.setItem("memoList", JSON.stringify(this.memoList));
    },
    onSubmitFilter(optType, filterData) {
      this.trashList = this.initMemo.filter((value) => {
        return value[optType].indexOf(filterData) !== -1;
      })
    }
  }
};
</script>

<style>
</style>
