<template>
  <div class="layer_detail" v-show="isShowDetail">
    <div class="inner">
    <strong class="tit_item">상세보기</strong>
    <div class="info_item">
          <div class="item_info">
            <strong class="tit_info">내용</strong>
            <span class="txt_memo">{{memoItem.text}}</span>
          </div>
          <div class="item_info">
            <strong class="tit_info">기간</strong>
            <span class="txt_date">{{memoItem.date}}</span>
          </div>
        </div>
        <div class="wrap_btn">
        <button type="button" class="btn_edit" @click="onEmitOverwriteData(memoItem)" v-if="isRestoreHistory">복원</button>
        <button type="button" class="btn_edit" @click="onRouteEditPage(memoItem)" v-if="!isRestoreHistory">수정하기</button>
        <button type="button" class="btn_ok emph1" @click="onCloseDetail">확인</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      isShow: false,
      memoItem: {},
      isRestoreHistory: false,
      overwriteMemoItem: [],
      editItemIdx: null
    }
  },
  computed: {
    isShowDetail () {
      return this.isShow; 
    }
  },
  methods: {
    onCloseDetail() {
      document.body.style = "";
      this.isShow = false;
    },
    onRouteEditPage(memoItem) {
      this.$router.push({name:"editMemo",params:{id:memoItem.key}});
    },
    onOpenDetail(detailMemo, overwriteMemoItem = []) {
      document.body.style = "overflow:hidden";
      this.isRestoreHistory = (overwriteMemoItem.length != 0)?true:false
      this.overwriteMemoItem = overwriteMemoItem;
      this.memoItem = detailMemo;
      this.isShow = true;
    },
    onEmitOverwriteData() {
      const compParent = this.$parent;
      compParent.alertCallback(compParent.onSubmitData.bind(this, this, this.memoItem), "해당 내용의 메모로<br>복원하시겠습니까?");
    }
  }
}
</script>

<style scoped>
  .info_item {
    display: table;
    width: 100%;
    table-layout: fixed;
    height: auto;
    padding: 0;
    margin: 15px 0;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .item_info {
    display: table-row;
    border-left: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
  }
  .item_info span {
    display: table-cell;
    padding: 10px 15px;
    border: 1px solid #f2f2f2;
  }
  .item_info strong{
    float: none;
    display: table-cell;
    width: 200px;
    padding: 10px 15px;
    margin: 0;
    background: #eee;
  }
  .tit_item {
    display: block;
    width: 100%;
    padding: 10px 0;
    font-size: 25px;
    color: #333;
    border-bottom: 2px solid #e3e3e3;
  }
</style>
