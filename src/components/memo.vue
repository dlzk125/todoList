<template>
  <div>
    <ul class="box_memo">
      <li v-for="(memoItem, index) in memoList" :key="memoItem.key" :class="{state_gone:getMemoStaus(memoItem.longDate, 'gone'),state_dday:getMemoStaus(memoItem.longDate, 'dday')}">
        <div class="info_item">
        <div class="item_info">
          <strong class="tit_info">내용</strong>
          <span class="txt_memo">{{memoItem.text}}</span>
        </div>
        <div class="item_info">
          <strong class="tit_info">기간</strong>
          <span class="txt_date">{{memoItem.date}}</span>
        </div>
        <div class="item_info">
          <strong class="tit_info">작성일</strong>
          <span class="txt_date">{{memoItem.createDate}}</span>
        </div>
        </div>
        <div class="wrap_btn">
        <button type="button" class="detail" @click="detailMemoItem(memoItem)"><span class="ico_memo">상세보기</span></button>
        <button type="button" class="restore" @click="restoreMemoItem(memoItem)" v-if="!isMemoList"><span class="ico_memo">복원</span></button>
        <button type="button" class="edit" @click="onRouteEditPage(memoItem.key,index)" v-if="isMemoList"><span class="ico_memo">수정</span></button>
        <button type="button" class="delete" @click="deleteMemo(memoItem)"><span class="ico_memo">삭제</span></button>
        </div>
      </li>
    </ul>
    <utilDialog ref="dialog"/>
    <detail ref="detail"/>
  </div>
</template>

<script>
import detail from "./detail";
import utilDialog from "./dialog";
export default {
  name: "memo",
  components: {
    detail,
    utilDialog
  },
  data() {
    return {
      isShow: false
    }
  },
  props: {
    memoList: Array,
    isMemoList: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getMemoStaus(longDate, compareName) {
      const nowLongDate = new Date().getTime();
      const distanceLongDate = longDate - nowLongDate;
      let status;
      if(distanceLongDate < 0) {
        status = "gone";
      } else if(distanceLongDate < 604800000) {
        status = "dday";
      } else {
        status = "basic";
      }
      return status === compareName;
    },
    alertCallback(callback, message) {
      this.$refs.dialog.showAlert(callback, message);
    },
    deleteMemoItem(deleteMemo) {
      this.$emit("deleteMemoItem", deleteMemo);
    },
    deleteMemo(memo) {
      this.alertCallback(this.deleteMemoItem.bind(this,memo), "해당 메모를<br>삭제하시겠습니까?");
    },
    onRouteEditPage(key, index) {
      this.$router.push({ name: 'editMemo', params: { type:"edit" ,id: key, editItemIdx: index }});
    },
    restoreMemoItem(restoreMemo) {
      this.$emit("restoreMemoItem", restoreMemo);
    },
    detailMemoItem(detailMemo) {
      document.body.style = "overflow:hidden";
      this.$refs.detail.onOpenDetail(detailMemo);
    }
  }
};
</script>

<style>
.state_gone {
  background: #E88383;
}
.state_dday {
  background: #FCEDBD;
}
.info_item {
  overflow: hidden;
  height: 170px;
  padding: 15px;
}
.box_memo .wrap_btn {
  border-top: 2px solid rgba(0,0,0,.06);
}
.wrap_btn button {
    padding: 9px;
  }
.ico_memo {
  display: inline-block;
  width: 24px;
  height: 24px;
  overflow: hidden;
  background: url('../assets/ico_memo.png');
  background-size: 115px 30px;
  text-indent: -9999px;
  vertical-align: top;
}
.delete .ico_memo{
  background-position: -30px 0;
}
.restore .ico_memo{
  background-position: -64px 0;
}
.detail .ico_memo{
  background-position: -90px 0;
}
.item_info {
  overflow: hidden;
  line-height: 25px;
}
.tit_info {
  float: left;
  margin-right: 5px;
}
.box_memo {
  overflow: hidden;
  width: 768px;
  padding: 12px;
  margin: 0 auto;
  border: 3px solid #e3e3e3;
  border-radius: 4px;
}
.box_memo:empty {
  display: none;
}
.box_memo li {
  float: left;
  position: relative;
  width: 246px;
  height: 246px;
  margin: 5px;
  border: 2px solid rgba(0,0,0,.06);
  box-sizing: border-box;
  border-radius: 4px;
}
.box_memo li[class^="state_"] {
  border-color: rgba(0,0,0,.2);
}
.box_memo li[class^="state_"] .wrap_btn{
  border-color: rgba(0,0,0,.2);
}
.box_memo span {
  display: block;
  overflow: hidden;
}
.txt_memo {
  word-break: break-all;
}
.box_memo .txt_memo {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
</style>
