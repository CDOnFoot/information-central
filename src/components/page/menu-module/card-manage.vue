<template>
  <div class="card-manage">
    <div class="search-condition">
      <a-form layout="inline" :form="cardForm" @submit="searchForCard">
        <a-form-item label="门禁卡号：">
          <a-input placeholder="门禁卡号"></a-input>
        </a-form-item>
        <a-form-item label="持卡人">
          <a-input placeholder="持卡人"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" @click="searchInCard" html-type="submit">搜索</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="plus" @click="addCard">添加</a-button>
        </a-form-item>
      </a-form>
    </div>

    <div class="modal">
      <a-modal :visible="isShowModal"
               :okText="okButton"
               centered
               destroyOnClose
               :title="modalTitle"
               :confirm-loading="confirmLoading"
               @ok="handleOk"
               @cancel="closeModal">
        <div class="form-in-modal">
          <a-form :form="modalForm">
            <div class="modal-form">
              <div class="modal-form-one">
                <a-form-item label="门禁卡号" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.cardNumber"></a-input>
                </a-form-item>
                <a-form-item label="门禁卡类型" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.cardType"></a-input>
                </a-form-item>
                <a-form-item label="状态" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.cardStatus"></a-input>
                </a-form-item>
              </div>
              <div class="modal-form-two">
                <a-form-item label="持卡人" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.cardUser"></a-input>
                </a-form-item>
                <a-form-item label="有效期" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.useTime"></a-input>
                </a-form-item>
                <a-form-item label="描述" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.description"></a-input>
                </a-form-item>
              </div>
            </div>
          </a-form>
        </div>
      </a-modal>
    </div>

    <div class="table">
      <a-table :columns="column"
               :loading="loading"
               :pagination="pagination"
               :dataSource="tableList"
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
        name: "card-manage",
      components: {AFormItem},
      data () {
          return {
            modal: '', // 模拟
            cardForm: {},
            isShowModal: false,
            okButton: '',
            modalTitle: '',
            confirmLoading: false,

            modalForm: {
              cardNumber: '',
              cardType: '',
              cardStatus: '',
              cardUser: '',
              useTime: '',
              description: ''
            },

            pagination: {
              current: 1,
              defaultCurrent: 1,
              defaultPageSize: 20
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
                scopedSlots: { customRender: 'operation' }
              }
            ],
            tableList: [
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

      methods: {
        searchForCard () {},
        searchInCard () {},
        addCard () {
          this.modalForm = Object.assign({}, {});
          this.modalTitle = '添加门禁卡';
          this.okButton = '保存';
          this.isShowModal = true;
        },

        /**
         * @function 通过该回调异步提交表单，保存修改信息
         * @param e
         */
        handleOk (e) {
          this.isShowModal = false;
          // 手动封装表单数据
          const modalForm = this.modalForm;
          let form = new FormData();
          for (let i = 0;i <= Object.keys(modalForm);i++) {
            form.append(Object.keys(modalForm)[i].toString(), Object.values(modalForm)[i]);
          }
          // this.$http.post('', {}).then()
        },
        closeModal (e) {
          this.isShowModal = false;
        },
        deleteCard(row) {
          const that = this;
          this.modal = this.Modal.confirm({
            title: '删除报警',
            cancelText: '取消',
            centered: true,
            closable: false,
            content: '此操作将在列表删除此条数据，是否继续？',
            okType: 'warning',
            onOk: function (e) {
              // the callback of ok
              that.modal.destroy();
            },

            onCancel: function (e) {
              // the callback of cancel
              that.modal.destroy();
            }
          })
        },

        checkCard(row) {
          this.modalForm = Object.assign({}, row);
          this.modalTitle = '查看门禁卡';
          this.okButton = '确定';
          this.isShowModal = true;
        },
        editCard(row) {
          this.modalForm = Object.assign({}, row);
          this.modalTitle = '编辑门禁卡';
          this.okButton = '保存';
          this.isShowModal = true;
        }
      }
    }
</script>

<style scoped>
.modal-form {
  display: flex;
  flex-direction: row;
}
</style>
