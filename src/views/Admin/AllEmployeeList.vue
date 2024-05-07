<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <div class="heading-container">
      <h2 class="heading-font">All Employee</h2>
      <v-btn class="add-btn" @click="addEmployee"> Add Employee </v-btn>
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
        :hover="true"
        class="elevation-1"
      >
        <template v-slot:item.image="{ item }">
          <img
            class="rounded-circle"
            :src="imageUrl + 'user/' + item.raw.user.image"
            alt=""
            width="40"
            height="40"
          />
        </template>
        <template v-slot:item.name="{ item }">
          <div class="name-container">
            <div class="me-2 employee-name">
              <span v-tooltip="item.raw.user.fullName">{{ item.raw.user.fullName }}</span>
            </div>
            <div class="fav-icon">
              <v-icon
                width="36"
                height="36"
                class=""
                icon="mdi-star-circle"
                :color="fav === true ? 'yellow-darken-3' : 'grey-lighten-1'"
                @click="addFav"
              ></v-icon>
            </div>
          </div>
        </template>
        <template v-slot:item.email="{ item }">
          <div class="col-container">
            <div class="col-text">
              <span style="min-width: 100%" v-tooltip="item.raw.user.email">{{
                item.raw.user.email
              }}</span>
            </div>
          </div>
        </template>
        <template v-slot:item.joinDate="{ item }">
          <div class="col-container">
            <div class="col-text">
              <span v-tooltip="item.raw.joinDate">{{ item.raw.joinDate }}</span>
            </div>
          </div>
        </template>
        <template v-slot:item.designation="{ item }">
          <div class="col-container">
            <div class="col-text">
              <span v-tooltip="item.raw.designation">{{ item.raw.designation }}</span>
            </div>
          </div>
        </template>
        <template v-slot:item.phoneNumber="{ item }">
          <div class="col-container">
            <div class="col-text">
              <span v-tooltip="item.raw.user.phoneNumber">{{ item.raw.user.phoneNumber }}</span>
            </div>
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <span class="me-4"
            ><v-btn
              width="36"
              height="36"
              variant="plain"
              color="success"
              icon="mdi-account-edit"
            ></v-btn
          ></span>
          <span class=""
            ><v-btn
              width="36"
              height="36"
              variant="plain"
              @click="removeEmployee(item)"
              icon="mdi-trash-can"
              color="#cc080b"
            ></v-btn
          ></span>
        </template>
      </v-data-table-server>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { imageUrl } from '../../constants/config'
import ApiCall from '../../api/apiInterface'
import store from '../../store'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()

export default {
  data() {
    return {
      fav: false,
      totalItems: 0,
      itemsPerPage: 10,
      totalPages: 0,
      tableData: [],
      imageUrl: imageUrl,
      headers: [
        {
          align: 'start',
          key: 'image',
          sortable: false,
          title: 'Image'
        },
        {
          align: 'start',
          key: 'name',
          sortable: false,
          title: 'Name'
        },
        { title: 'Email', key: 'email' },
        { title: 'Designation', key: 'designation' },
        { title: 'Join Date', key: 'joinDate' },
        { title: 'Phone', key: 'phoneNumber' },
        { title: 'Action', key: 'action', width: '120px' }
      ]
    }
  },
  computed: {
    // ...mapGetters({
    //   getAllEmployee: 'getAllEmployee'
    // })
  },
  methods: {
    ...mapActions({
      deleteEmployee: 'deleteEmployee'
    }),
    addEmployee() {
      this.$router.push({ path: '/add-employee' })
    },
    addFav() {
      this.fav = !this.fav
    },
    viewProfile(data) {
    },
    nextPage() {
    },
    async removeEmployee(item) {
      try {
        store.commit('IS_LOADING', true)
        await ApiCall.delete(`api/Employee/delete/${item.raw.id}`)
        await this.loadItems({
          page: this.page,
          itemsPerPage: this.itemsPerPage,
          sortBy: this.sortBy
        })
        store.commit('IS_LOADING', false)
      } catch (error) {
        store.commit('IS_LOADING', false)
        console.log(error)
        $toast.error(error.message)
      }
    },

    async loadItems({ page, itemsPerPage, sortBy }) {
      try {
        store.commit('IS_LOADING', true)
        this.page = page ??= this.page
        this.itemsPerPage = itemsPerPage ??= this.itemsPerPage
        this.sortBy = sortBy ??= this.sortBy
        const response = await ApiCall.get(
          `api/Employee/datatable?sort=${sortBy}&page=${page}&per_page=${itemsPerPage}`
        )
        this.tableData = response.data.data
        this.totalPages = response.data.totalPages
        this.totalItems = response.data.total
        store.commit('IS_LOADING', false)
      } catch (error) {
        console.log(error)
        store.commit('IS_LOADING', false)
        $toast.error(error.message)
      }
    }
  }
}
</script>

<style lang="scss">
.v-popper__wrapper {
  .v-popper__inner {
    border-radius: 200px;
    div {
      div {
        color: #fff;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import '../../assets/config';
@import '../../assets/responsive';
@import '../../styles/component';

.heading-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    text-align: center;
    margin-bottom: 10px;
  }
}
.name-container {
  display: grid;
  grid-template-columns: 1fr 0.1fr;
  .employee-name {
    min-width: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .fav-icon {
    cursor: pointer;
    white-space: nowrap;
  }
}
.add-btn {
  @include btn($primary);
}
</style>
