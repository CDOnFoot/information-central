<template>
  <div class="info">
    <div>

    </div>

    <div class="info-pic"></div>
    <div class="info-list">
      <a-table :showHeader="false" :columns="columns" :dataSource="data" :pagination="pagination" :loading="loading"
        :customRow="setRow">
        <!-- <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template> -->
      </a-table>
    </div>
  </div>
</template>

<script>
  const columns = [{
      dataIndex: "name",
      width: "20%",
      align: "center"
    },
    { 
      dataIndex: "data",
      width: "20%",
      align: "center"
    }
  ];

  const data = [{
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    }
  ];

  export default {
    name: "info",
    data() {
      return {
        data: data,
        pagination: {
          current: 1,
          defaultCurrent: 1,
          defaultPageSize: 10,
          total: 0,
          showQuickJumper: true,
          onChange: current => this.changePage(current)
        },
        loading: false,
        columns
      };
    },
    mounted() {
      // this.fetch();
      this.init();
    },

    methods: {
      init() {

      },
      changePage(page) {
        this.pagination.current = page;
      },
      setRow(record, index) {
        if (index % 2 == 1) {
          console.log(index);
        }
        return {
          on: {
            props: {},
            click: () => {
              console.log(record);
            }
          }
        };
      }
    }
  };

</script>

<style scoped>
  .info {
    display: flex;
    height: 100%;
  }

  .info-pic {
    flex: 0 60%;
    height: 100%;
    padding: 20px;
        background: url("../../../../assets/img/monitor/dev3.png") no-repeat center;
        background-size:36%;

     /* background: url(bgimage.gif) no-repeat fixed top; */
  }

  .info-list {
    flex: 0 30%;
    height: 100%;
    padding: 20px;
  }

</style>
