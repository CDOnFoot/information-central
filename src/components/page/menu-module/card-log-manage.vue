<template>
  <div class="log-manage">
    <div class="search-condition">
      <a-form layout="inline" :form="cardForm" @submit="searchForCard">
        <a-form-item label="门禁卡编号">
          <a-input placeholder="门禁卡编号"></a-input>
        </a-form-item>
        <a-form-item label="设备">
          <a-input placeholder="设备"></a-input>
        </a-form-item>
        <a-form-item label="开始时间">
          <a-time-picker use12Hours format="h:mm:ss A" @change="onChange"/>
        </a-form-item>
        <a-form-item label="结束时间">
          <a-time-picker use12Hours format="h:mm:ss A" @change="onChange"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" @click="searchInCard" html-type="submit">搜索</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="file" @click="exportFile">导出</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="table">
      <a-table :columns="column"
               :dataSource="tableList"
               :pagination="pagination"
               :loading="loading"

               size="small">
        <template slot="operation" slot-scope="text, record">
          <a-button type="primary" @click="checkCard(record)">查看</a-button>
          <a-button type="primary" @click="editCard(record)">编辑</a-button>
          <a-button type="primary" @click="deleteCard(record)">删除</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";

  export default {
    name: "log-manage",
    components: {AFormItem},
    data() {
      return {
        cardForm: {},
        pagination: {
          current: 4,
          defaultCurrent: 1,
          defaultPageSize: 5
        },
        loading: false,
        column: [
          {
            title: '门禁卡号',
            dataIndex: 'cardNumber',
            align: 'center',
            // sorter: true,
            width: 20,
            // scopedSlots: { customRender: 'name' }
          },
          {
            title: '持卡人',
            dataIndex: 'cardUser',
            align: 'center',
            width: 40
          },
          {
            title: '有效期',
            dataIndex: 'useTime',
            align: 'center',
            width: 70
          },
          {
            title: '门禁卡类型',
            dataIndex: 'cardType',
            align: 'center',
            width: 40
          },
          {
            title: '描述',
            dataIndex: 'description',
            align: 'center',
            width: 40
          },
          {
            title: '状态',
            dataIndex: 'cardStatus',
            align: 'center',
            width: 40
          },
          {
            title: '操 作',
            // dataIndex: 'tel',
            align: 'center',
            width: 40,
            scopedSlots: {customRender: 'operation'}
          }
        ],
        tableList: [
          {
            cardNumber: 1111,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },
          {
            cardNumber: 1615141312,
            cardUser: 'Apple',
            useTime: '2019-10-10  至  2019-12-12',
            cardType: '员工卡',
            description: 'Apple Pay',
            cardStatus: '启用'
          },


        ]
      }
    },
    created() {
      this.$http.post('10.28.3.149:81/Authorization/api/Authentication/LoginForWeb', {
        "loginname": "webadmin",
        "password": "ee79976c9380d5e337fc1c095ece8c8f22f91f306ceeb161fa51fecede2c4ba1"
      }).then(res => {
        console.log(res)

      })

    },
    methods: {
      onChange(time, timeString) {
        console.log(time, timeString);
      },
      searchForCard() {
      },
      searchInCard() {
      },
      exportFile() {
      },
    }
  }
</script>

<style scoped>
  .modal-form {
    display: flex;
    flex-direction: row;
  }
</style>
