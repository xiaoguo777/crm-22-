<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    付费用户(周)
                </p>
                <div class="line-chart-con">
                    <service-requests></service-requests>
                </div>
            </Card>
        </Row>

      
    </div>
</template>

<script>
import serviceRequests from "./components/serviceRequests.vue";
// import statistical from './components/statistical.vue   '

export default {
  name: "home",
  components: {
    serviceRequests
  },
  data() {
    return {
      count: {
        createUser: 496,
        visit: 3264,
        collection: 24389305,
        transfer: 39503498
      },
      showAddNewTodo: false,
      newToDoItemValue: ""
    };
  },
  computed: {
    avatorPath() {
      return localStorage.avatorImgPath;
    }
  },
  methods: {
  }
};
</script>
