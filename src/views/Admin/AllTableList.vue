<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-8">
      <h2 class="heading-font">All Table List</h2>
      <v-btn class="add-btn" @click="() => this.$router.push({ path: '/add-table' })">
        Add Table
      </v-btn>
    </div>
    <div>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="tableData"
        :items-per-page="itemsPerPage"
        @update:options="loadItems"
        hide-default-footer
        class="elevation-1 my-custom-v-table"
        :hover="true"
      >
        <template v-slot:item.isOccupied="{ item }">
          {{ item.raw.isOccupied ? 'Booked' : 'Available' }}
        </template>
        <template v-slot:item.employees="{ item }">
          <p class="assigned-employees" v-for="employee in item.raw.employees" :key="employee.id">
            {{ employee.name }}
            <v-icon
              class="assigned-employees-close-icon"
              icon="mdi-minus-circle-outline"
              @click="removeAssignedEmployee(employee.employeeTableId)"
            ></v-icon>
          </p>
          <p v-if="item.raw.employees.length <= 0">No assigned employee</p>
        </template>
        <template v-slot:item.assignEmployees="{ item }">
          <div>
            <v-btn
              color="green"
              variant="outlined"
              icon="mdi-plus-circle-outline"
              width="36"
              height="36"
              @click="openDialog(item)"
            ></v-btn>
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <span class="me-2"
            ><v-btn
              variant="outlined"
              width="36"
              height="36"
              @click="removeTable(item)"
              icon="mdi-trash-can"
              color="#cc080b"
            ></v-btn
          ></span>
        </template>
      </v-data-table-server>
      sc
      <CustomDialog
        icon="mdi-account-remove"
        heading="Removing Employee"
        text="Are you Sure?"
      ></CustomDialog>
    </div>
  </div>
  <!---------- Modal Data Show ------------>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="700">
        <v-card>
          <v-card-title>
            <p class="text-h5 text-center pt-5">Assign Employee To a Table</p>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <div>
                    <img :src="imageUrl + 'table/' + dialogData.image" alt="" width="200" />
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-h5 mb-3">
                    <span>Table ID: {{ dialogData.id }}</span>
                  </div>
                  <div class="text-h5 mb-3">
                    <span>Number of seats: {{ dialogData.seats }}</span>
                  </div>
                  <v-select
                    v-model="dialogData.employeeId"
                    :items="getAllNonAssignedEmployees"
                    item-title="name"
                    item-value="employeeId"
                    label="Select Employee"
                    multiple
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#cc080b" variant="text" @click="dialogFinal"> Assign </v-btn>
            <v-btn color="#cc080b" variant="text" @click="dialog = false"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { imageUrl } from '../../constants/config'
import CustomDialog from '../../components/CustomDialog.vue'
import ApiCall from '../../api/apiInterface'
import store from '../../store'

export default {
  name: 'AllTableList',
  components: { CustomDialog },
  data() {
    return {
      dialog: false,
      imageUrl: imageUrl,
      totalItems: 0,
      itemsPerPage: 10,
      totalPages: 0,
      tableData: [],
      dialogData: {
        id: null,
        image: '',
        seats: 0,
        employeeId: []
      },
      headers: [
        {
          align: 'start',
          key: 'tableNumber',
          sortable: false,
          title: 'Table Number',
          width: '140px'
        },
        {
          title: 'Number of Seats',
          key: 'numberOfSeats',
          width: '150px'
        },
        {
          title: 'Booking Status',
          key: 'isOccupied',
          width: '150px'
        },
        {
          title: 'Employees',
          key: 'employees',
          width: '300px'
        },
        {
          title: 'Assign Employees',
          key: 'assignEmployees',
          align: 'center',
          width: '100px'
        },
        {
          title: 'Action',
          key: 'action',
          width: '100px'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getAllNonAssignedEmployees: 'getAllNonAssignedEmployees'
    })
  },
  watch: {
    dialog(newValue) {
      if (newValue === true) {
        this.fetchNonAssignedEmployees(this.dialogData.id)
      }
    }
  },
  methods: {
    ...mapActions({
      fetchAllTable: 'fetchAllTable',
      fetchNonAssignedEmployees: 'fetchNonAssignedEmployees'
    }),
    async removeTable(item) {
      console.log(item.raw.id)
      try {
        store.commit('IS_LOADING', true)
        await ApiCall.delete(`api/Table/delete/${item.raw.id}`)
        await this.loadItems({
          page: this.page,
          itemsPerPage: this.itemsPerPage,
          sortBy: this.sortBy
        })
        store.commit('IS_LOADING', false)
      } catch (e) {
        store.commit('IS_LOADING', false)
        console.log(e)
      }
    },
    async loadItems({ page, itemsPerPage, sortBy }) {
      this.page = page ??= this.page
      this.itemsPerPage = itemsPerPage ??= this.itemsPerPage
      this.sortBy = sortBy ??= this.sortBy
      const response = await ApiCall.get(
        `api/Table/datatable?sort=${sortBy}&page=${page}&per_page=${itemsPerPage}`
      )
      this.tableData = response.data.data
      this.totalPages = response.data.totalPages
      this.totalItems = response.data.total
    },
    openDialog(item) {
      this.dialog = true
      console.log(item.raw.id)
      this.dialogData.id = item.raw.id
      this.dialogData.image = item.raw.image
      this.dialogData.seats = item.raw.numberOfSeats
    },
    async removeAssignedEmployee(employeeTableId) {
      try {
        store.commit('IS_LOADING', true)
        await ApiCall.delete(`api/EmployeeTable/delete/${employeeTableId}`)
        await this.loadItems({
          page: this.page,
          itemsPerPage: this.itemsPerPage,
          sortBy: this.sortBy
        })
        store.commit('IS_LOADING', false)
      } catch (e) {
        store.commit('IS_LOADING', false)
        console.log(e)
      }
    },
    async dialogFinal() {
      this.dialog = false
      const data = [
        ...this.dialogData.employeeId.map((item) => {
          return { employeeId: item, tableId: this.dialogData.id }
        })
      ]

      try {
        await ApiCall.post('api/EmployeeTable/create-range', data)
        await this.loadItems({
          page: this.page,
          itemsPerPage: this.itemsPerPage,
          sortBy: this.sortBy
        })
      } catch (e) {
        console.log(e)
      }
      this.dialogData = {
        id: null,
        image: '',
        seats: 0,
        employeeId: []
      }
    }
  },
  mounted() {
    this.fetchAllTable()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/config';
@import '../../assets/responsive';
@import '../../styles/component';

.assigned-employees {
  padding: 5px 10px;
  margin-top: 10px;
  margin-bottom: 2px;
  margin-right: 10px;
  background-color: rgb(233, 233, 233);
  border-radius: 20px;
  display: block;
  flex-direction: row;

  @include lg {
    display: inline-flex;
  }

  .assigned-employees-close-icon {
    margin-left: 5px;

    &:hover {
      color: $primary;
      cursor: pointer;
    }
  }
}

.add-btn {
  @include btn($primary);
}
</style>
