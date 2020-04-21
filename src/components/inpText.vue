<template>
  <div class="item_input">
  <label :for="memoId">{{labelText}}</label>
  <input type="text" :id="memoId" v-model="memo" @change="onChangeText" required v-if="type=='text'">
  <datepicker :placeholder="dateFormat" :id="memoId" v-model="memo" :language="ko" :format="dateFormat" @input="onChangeDate" required v-if="type=='date'"/>
  <textarea :id="memoId" v-model="memo" @change="onChangeText" required placeholder="내용을 입력해주세요." required v-if="type=='textarea'"></textarea>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { ko } from "vuejs-datepicker/dist/locale";
export default {
  name: 'inpText',
  components: {
    Datepicker
  },
  props: {
    labelText: String,
    memoId: String,
    memoText: String | Date,
    type: {
      type: String,
      default: "text"
    }
  },
  data: function() {
    return {
      memo: '',
      dateFormat: "yyyy.MM.dd",
      ko: ko
    }
  },
  created() {
    this.memo = this.memoText
  },
  methods: {
    onChangeText() {
      this.$emit('onChangeText', this.memo);
    },
    onChangeDate() {
      this.$emit('onChangeDate', this.memo);
    }
  }
}
</script>

<style>
  .item_input {
    line-height: 50px;
    margin-top: 20px;
  }
  .item_input::after {
    display: table;
    clear: both;
    content: '';
  }
  label {
    float: left;
    width: 50px;  
    margin-right: 40px;  
  }
  .item_input input {
    float: left;
    width: calc(100% - 90px);
    padding-left: 15px;
    height: 50px;
    border: 1px solid #e3e3e3;
    font-size: 20px;
    font-weight: bold;
    color: #919191;
    line-height: 30px;
    background-color: #fff;
    vertical-align: top;
    outline: 0;
    white-space: nowrap;
    box-sizing: border-box;
    caret-color: #444;
  }
  textarea {
    float: left;
    overflow-x: hidden;
    width: calc(100% - 90px);
    padding: 8px 0 0 15px;
    height: 300px;
    border: 1px solid #e3e3e3;
    font-size: 20px;
    font-weight: bold;
    color: #919191;
    line-height: 30px;
    background-color: #fff;
    vertical-align: top;
    outline: 0;
    word-wrap: break-word;
    box-sizing: border-box;
    caret-color: #444;
    resize: none;
  }
</style>
