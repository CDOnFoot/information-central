<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <router-view v-wechat-title='$route.meta.title'></router-view>
    </div>
  </a-locale-provider>

</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import moment from 'moment';
  import 'moment/locale/zh-cn';
  moment.locale('zh-cn');
  export default {
    name: 'App',
    data(){
      return{
        zh_CN,
      }
    },
    components: {
    },
    mounted(){
    },
    methods:{

    }
  }
</script>
<style>
  @import 'assets/css/default.css';

  body{
    padding: 0;
    margin: 0 auto !important;
    font-family: sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
  }
  p{
    padding: 0;
    margin: 0;
  }
  a:-webkit-any-link {
    text-decoration: none;
  }
  div {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  input{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 1.5;
    border: none;
    outline: none;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #aaa;
    font-weight: 300;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #aaa;
    font-weight: 300;

  }

  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #aaa;
    font-weight: 300;

  }

  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #aaa;
    font-weight: 300;

  }
  button{
    outline: none;
  }
  html,#app{
    height:100%
    }
</style>
