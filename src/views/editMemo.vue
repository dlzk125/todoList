<template>
  <div class="area_main">
    <div class="wrap_history" :class="{expand:isShowHistory}" v-if="!!editItem && !!editItem.history && editItem.history.length != 0">
      <strong class="tit_history">
        히스토리
        <button type="button" class="ico_expand" @click="onExpandHistory">펼쳐보기</button>
      </strong>
      <div class="history_btn" v-show="isShowHistory">
        <button
          type="button"
          v-for="historyItem in editItem.history"
          :key="historyItem.key"
          @click="onClickBtnHistory(historyItem, memoList, editItemIdx)"
        >{{historyItem.createDate}}</button>
      </div>
    </div>
    <form @submit.prevent="submitData($event)">
      <inpText
        :labelText="labelText.text"
        :memoId="memoId.text"
        @onChangeText="onChangeText"
        v-bind:memoText="memoText"
        :type="inputType.textarea"
      />
      <inpText
        :labelText="labelText.date"
        :memoId="memoId.date"
        @onChangeDate="onChangeDate"
        v-bind:memoText="memoDate"
        :type="inputType.date"
      />
      <div class="wrap_btn">
        <button type="button" class="btn_back" @click="onClickLoute">이전</button>
        <button type="submit" class="btn_submit emph1">저장</button>
      </div>
    </form>
    <utilDialog ref="dialog"/>
    <detail ref="detail" />
  </div>
</template>

<script>
import inpText from "../components/inpText";
import detail from "../components/detail";
import moment from "moment";
import { utilSort } from "../util/util";
import utilDialog from "../components/dialog";

export default {
  name: "editMemo",
  components: {
    inpText,
    detail,
    utilDialog
  },
  data: function() {
    return {
      memoDate: "",
      memoText: "",
      editItem: null,
      editItemIdx: null,
      memoList: [],
      labelText: {
        text: "내용",
        date: "기간"
      },
      memoId: {
        text: "text",
        date: "date"
      },
      inputType: {
        text: "text",
        date: "date",
        textarea: "textarea"
      },
      isShowHistory: true
    };
  },
  created() {
    this.memoList = JSON.parse(window.localStorage.getItem("memoList")) || [];
    const editItemKey = this.$route.params.id || "";
    if (!this.editItem && !editItemKey) {
      this.$router.push("/edit");
    }
    if (!editItemKey) {
      return;
    }
    this.editItemIdx = this.memoList.findIndex(value => {
      return value.key === Number(editItemKey);
    });
    this.editItem = this.memoList.find(
      memo => memo.key === Number(editItemKey)
    );
    this.memoText = this.editItem.text || "";
    this.memoDate = this.editItem.date || "";
  },
  methods: {
    onChangeText(inpText) {
      this.memoText = inpText;
    },
    onChangeDate(inpDate) {
      this.memoDate = inpDate;
    },
    submitData(event, overwriteItem) {
      this.alertCallback(this.onSubmitData.bind(this, event ,overwriteItem), "해당 메모를<br>수정하시겠습니까?");
    },
    onSubmitData(event, overwriteItem) {
      const now = new Date();
      let submitData = {
          key: now.getTime(),
          createDate: moment(now).format("YYYY.MM.DD hh:mm:ss"),
      };
      if(overwriteItem.length !== 0) {
        submitData = Object.assign({}, overwriteItem, submitData);
      } else {
        event.preventDefault();
        const eventTargets = event.target.elements;
        const dateValue = eventTargets.date.value;
        const text = eventTargets.text.value;
        const date = moment(dateValue).format("YYYY.MM.DD");
        const longDate = new Date(dateValue).getTime();
        Object.assign(submitData, {text,date,longDate});
      }
      if (this.editItem.length !== 0) {
        this.setLocalStorageData(this.updateMemoListData(submitData));
      } else {
        this.setLocalStorageData(this.createMemoListData(submitData));
      }
      this.$router.push("/");
    },
    updateMemoListData(submitData) {
      const staticData = JSON.parse(JSON.stringify(this.memoList));
      const getEditData = staticData[this.editItemIdx];

      getEditData.history = getEditData.history || [];
      if (getEditData.history.length === 0) {
        getEditData.history = [this.editItem];
      } else {
        getEditData.history.unshift(this.editItem);
      }
      Object.assign(getEditData, submitData);
      utilSort(staticData);
      return staticData;
    },
    createMemoListData(submitData) {
      const getData = this.memoList;
      getData.push(submitData);
      utilSort(getData);
      return getData;
    },
    alertCallback(callback, message) {
      this.$refs.dialog.showAlert(callback, message);
    },
    setLocalStorageData(pushData) {
      window.localStorage.setItem("memoList", JSON.stringify(pushData));
    },
    onClickLoute() {
      this.$router.push({ path: "/" });
    },
    onExpandHistory() {
      this.isShowHistory = this.isShowHistory ? false : true;
    },
    onClickBtnHistory(historyItem, overwriteMemoItem) {
      this.$refs.detail.onOpenDetail(historyItem, overwriteMemoItem);
    }
  }
};
</script>

<style scoped>
form {
  width: 500px;
  padding: 30px 20px 20px;
  margin: 0 auto;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
}
.wrap_btn {
  text-align: right;
  padding: 10px 0 5px;
}
.tit_history {
  display: block;
  padding-bottom: 10px;
  font-size: 20px;
}
.ico_expand {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid #919191;
  transition: .5s;
  transform: rotate(135deg);
  border-width: 2px 2px 0 0;
  vertical-align: top;
  overflow: hidden;
  text-indent: -9999px;
}
.wrap_history {
  width: 542px;
    padding: 10px 0 10px;
    margin: 0 auto;
}
.history_btn {
  padding-top: 10px;
}
.history_btn button{
  display: inline-block;
  padding: 5px 10px;
  color: #fff;
  background: #6fb5ba;
  border-radius: 14px;
  margin: 5px 10px 0 0;
}
.wrap_history.expand .ico_expand {
  margin-top: 8px;
  transform: rotate(-45deg);
}
.wrap_history.expand .tit_history{
  border-bottom: 2px solid #919191;
}
</style>
