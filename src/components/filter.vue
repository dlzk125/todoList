<template>
  <div>
    <form @submit="onSubmitFilter" v-if="this.memoList.length !== 0">
      <select ref="opt1" v-model="optType" @change="onSubmitFilter">
        <option value="text">내용</option>
        <option value="date" v-if="this.dateMemos.length !== 0">기간</option>
        <option value="createDate">작성일</option>
      </select>
      <input type="text" @input="onSubmitFilter" ref="text" v-show="optType === 'text'">
      <select
        ref="date"
        @change="onSubmitFilter"
        v-show="optType === 'date'"
        v-if="this.dateMemos.length !== 0"
      >
        <option
          :value="dateFilter"
          :key="dateFilter + index"
          v-for="(dateFilter, index) in dateMemos"
        >{{dateFilter}}</option>
      </select>
      <select ref="createDate" @change="onSubmitFilter" v-show="optType === 'createDate'">
        <option
          :value="dateFilter.createDate"
          :key="dateFilter.key"
          v-for="dateFilter in memoList"
        >{{dateFilter.createDate}}</option>
      </select>
    </form>
  </div>
</template>
<script>
export default {
  name: "filterMemo",
  data() {
    return {
      optType: "text",
      dateMemos: []
    };
  },
  props: {
    memoList: Array
  },
  mounted() {
    this.memoList.forEach(value => {
      const date = value.date;
      if (this.dateMemos.indexOf(date) === -1) this.dateMemos.push(date);
    });
  },
  methods: {
    onSubmitFilter() {
      const filterData = this.$refs[this.optType].value;
      this.$emit("onSubmitFilter", this.optType, filterData);
    }
  }
};
</script>

<style scoped>
</style>
