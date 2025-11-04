<template>
  <div class="py-2 px-6 flex flex-col bg-gray-100 h-full">
    <div class="flex flex-col rounded-2xl border border-gray-200">
      <nav class="flex w-full p-3 items-center justify-between">
        <h2>Table object</h2>
        <CButton
            @click="clickUpload"
            text="+Add"
            variant="primary"
            size="md"
        />
      </nav>
      <CDialog
          :show="confirmDeleteVisible"
          @close="confirmDeleteVisible = false"
          bodyClass="d-flex justify-content-center align-items-center bg-primary px-3 pb-4"
      >
        <DeleteConfirm
            v-model:show="confirmDeleteVisible"
            title="Ushbu itemni uchirmoqchimisiz?"
            @confirm="deleteItem"
        />
      </CDialog>
      <div v-if="visiblePost.length" class="w-full">
        <div class="w-full overflow-x-auto shadow-xl">
          <table class="text-gray-800">
            <colgroup>
              <col style="width: 5%">
              <col style="width: 5%">
              <col style="width: 25%">
              <col style="width: 45%">
              <col style="width: 10%">
            </colgroup>
            <thead class="text-gray-700 uppercase text-xs ">
            <tr class="border border-gray-100">
              <th class="px-4 py-3">№</th>
              <th class="px-4 py-2">Id</th>
              <th class="px-4 py-2">Title</th>
              <th class="px-4 py-2">Body</th>
              <th class="px-4 py-2">Operations</th>
            </tr>
            </thead>
            <tbody class="" id="bodyItems">
            <tr
                v-for="(item, index) in visiblePost || []"
                :key="item"
                class="hover:bg-gray-50 text-sm items-center transition-all duration-200 border border-gray-200"
            >
              <td class="px-4 py-2">{{index + 1}}</td>
              <td class="px-4 py-2">{{item.id}}</td>
              <td class="px-4 py-2">{{item.title}}</td>
              <td class="px-4 py-2">{{item.body}}</td>
              <td class="flex py-4 h-full gap-2">
                <CButton
                    size="sm"
                    text="Tahrirlash"
                    @click="editRowItems(item)"
                    variant="warning"
                />
                <CButton
                    size="sm"
                    text="O'chirish"
                    @click="clickConfirmDelete(item)"
                    variant="danger"
                />
              </td>
            </tr>
            </tbody>

          </table>
          <CButton
              id="scrollTop"
              class="scrollBtn"
              :text="''"
              :class="{'activeScroll': isActive}"
              :faClass="'fas fa-arrow-up'"
              :is-has-fa-icon="true"
              @click="scrollToTop"
          />
          <CDialog
              has-close-icon
              no-header
              :show="dialogVisible"
              @close="closeDialog"
              body-class="rounded-lg !bg-bg-primary"

          >
            <div class="flex flex-col rounded-2xl shadow-lg p-4 space-y-6">
              <form @submit.prevent>
                <h2 class="text-2xl font-bold ">{{dialogVisible ? "Edit form" : "Add form"}}</h2>
                <div class="justify-center gap-2 grid grid-cols-1 md:grid-cols">
                  <Input
                      label="Id"
                      :type="'text'"
                      name="NameEn"
                      v-model="form.id"
                  />
                  <Input
                      label="Title"
                      :type="'text'"
                      name="NameRu"
                      v-model="form.title"
                  />
                  <Input id="fileId"
                         :type="'text'"
                         label="Body"
                         name="user"
                         v-model="form.body"
                  />
                  <div class="mt-2 flex justify-center gap-4">
                    <CButton
                        @click="removeForm"
                        type="button"
                        class="btnCancel"
                        text="Cancel"
                        variant="ghost-accent"
                    />
                    <CButton
                        @click="saveForm"
                        variant="primary"
                        type="submit"
                        text="Submit"
                    />
                  </div>
                </div>
              </form>
            </div>
          </CDialog>
          <div class="flex h-20 items-center sticky overflow-y-auto bottom-0 z-50 justify-center mt-2 pb-4 gap-2">
            <span
                @click="changePage(currentPage - 1)"
                class="flex w-12 h-12 bg-gray-300 text-gray-700 justify-center items-center rounded-3xl pr-1"
                :class="currentPage === 1 ? 'cursor-not-allowed ' : 'bg-primary bg-primary text-white cursor-pointer'"
            >
              <i class="fa-solid fa-backward"></i>
            </span>
            <div
                v-for="pageItem in visiblePageNumber"
                :key="pageItem"
                class="flex justify-center items-center px-3 py-1 h-11 w-11 cursor-pointer hover:bg-gray-300 rounded-3xl"
                :class="{
              'bg-blue-500 text-white': currentPage === pageItem,
              'text-gray-500 cursor-default': pageItem === '...'
              }"
                @click="changePage(pageItem)"
            >
              {{pageItem}}
            </div>
            <span
                @click="changePage(currentPage + 1)"
                class="flex w-12 h-12 bg-gray-300 text-gray-700 justify-center items-center rounded-3xl"
                :class="currentPage >=  totalPages ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-primary bg-primary text-white cursor-pointer'"
            >
              <i class="fa-solid fa-forward"></i>
            </span>
          </div>
        </div>
      </div>
      <div v-else class="flex justify-center">
        <span class="font-semibold text-gray-700">⏳ Ma'lumot topilmadi!</span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import CButton from "../components/CButton.vue";
import CDialog from "../components/CDialog.vue";
import Input from "../ui-component/Input.vue";
import DeleteConfirm from "./DeleteConfirm.vue";
import {ref, onMounted, onBeforeUnmount, computed} from "vue";

const items = ref<[]>([]);
const confirmItem = ref<number | null>(null);
const confirmDeleteVisible = ref(false);
const dialogVisible = ref(false);
const editId = ref<string>();
const isActive = ref(false);

const loadUserData = async () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Jon Doe',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolores.'
      })
    }, 4000)
  })
}
const userData = ref({name: "", bio: ""})

const form = ref({
  id: '',
  title: '',
  body: '',
})

const handleScroll = () => {
  isActive.value = window.scrollY > 100
}

const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const  renderList = () =>{
  // let bodyItems = document.getElementById('bodyItems')

  axios.get('https://jsonplaceholder.typicode.com/posts?'
  )
      .then((res) =>{
          items.value = res.data.map((item: any) => ({
          id: item.id,
          userId: item.userId,
          title: item.title,
          body: item.body,
        }));
      })
};
// props yoki state (misol uchun)

const currentPage = ref(1)     // aktiv sahifa
const perPage = ref(8)        // har sahifada nechta post chiqadi

// computed
const visiblePost = computed(() => {
  const startPage = (currentPage.value - 1) * perPage.value
  const endPage = startPage + perPage.value
  return items.value.slice(startPage, endPage)
})

// Umumiy sahifalar soni
const totalPages = computed(() => {
  return Math.ceil(items.value.length / perPage.value)
})

// Sahifa raqamlarini chiqarish (1 ... 10)
const visiblePageNumber = computed(() => {
  let pageNumbers = []

  if (totalPages.value <= 7) {
    for (let i = 1; i <= totalPages.value; i++) {
      pageNumbers.push(i)
    }
  } else {
    if (currentPage.value <= 4) {
      pageNumbers = [1, 2, 3, 4, 5, "...", totalPages.value]
    } else if (currentPage.value >= totalPages.value - 2) {
      pageNumbers = [
        1,
        "...",
        totalPages.value - 4,
        totalPages.value - 3,
        totalPages.value - 2,
        totalPages.value - 1,
        totalPages.value,
      ]
    } else {
      pageNumbers = [
        1,
        "...",
        currentPage.value - 1,
        currentPage.value,
        currentPage.value + 1,
        "...",
        totalPages.value,
      ]
    }
  }
  return pageNumbers
})

const changePage = (page: number) => {
  if(page >= 1 && page <= totalPages.value){
    currentPage.value = page
  }
}

const saveForm = (e: any) => {
  e.preventDefault();

  const payload = {
    id: form.value.id,
    title: form.value.title,
    body: form.value.body
  };

  if (editId.value){
    axios.put(`https://jsonplaceholder.typicode.com/posts/${editId.value}`, payload )
    renderList();
  } else {
    axios.post('https://jsonplaceholder.typicode.com/posts/', payload )
        .then(() => {
          renderList()
        })
  }
  removeForm()
};
 const editRowItems = (item: any) =>{
  editId.value = item.userId;
  form.value.id = item.id;
  form.value.title = item.title;
  form.value.body = item.body;
  dialogVisible.value = true;
};

const clickUpload = () => {
  dialogVisible.value = true
};

const closeDialog = () => {
  dialogVisible.value = false
  removeForm();
};
const removeForm = () => {
  form.value = {
    id: "",
    title : "",
    body: "",
      };
  editId.value = null;
  dialogVisible.value = false
};

const clickConfirmDelete = (item: any) => {
  confirmItem.value = item
  confirmDeleteVisible.value = true
};

const deleteItem = async () => {
  if (confirmItem.value !== null) {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${confirmItem.value}`)
    items.value = items.value.find(item => item !== confirmItem.value)
    confirmDeleteVisible.value = false
    confirmItem.value = null
  }
};


onMounted(async () => {
  renderList();
  userData.value = await loadUserData();
})
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
})
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
})

// axios.get('https://jsonplaceholder.typicode.com/posts/' + itemData?.id)
//     .then((res) =>{
//       let data = res?.data
//
//       this.editId = data['id'];
//       this.name_en = data['userId'];
//       this.name_ru = data['title'];
//       this.image_src = data['body'];
//       console.log(data['id'])
//       this.clickUpload()
//     })


// imagesChange(event){
//   this.image_src = event?.target?.files[0]
// },

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxMzEyMDkyMSwiZXhwIjoxNzQ0NjU2OTIxfQ.3O4Ds0e3MxBbDLu-4TTtGN7bIAHt6loJeNgY_r33dts';
// axios.delete('https://jsonplaceholder.typicode.com/posts?_limit=5' + itemData.id,
//     {
//       headers:{
//         'Content-Type': 'multipart/form-data',
//         "Authorization": `Bearer ${token}`
//       }
//     }
// )
//     .then((res) => {
//       let data = res?.data
//       console.log("data", data)
//       let index = itemData.find(x => x.id === id)
//           itemData.splice(index, 1);
//           this.renderList()
//
//     })

</script>
<style>
.scrollBtn {
  z-index: 999;
  position: fixed;
  background-color: crimson;
  color: white;
  max-width: 45px;
  height: 45px;
  right: 5px;
  bottom: 30px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  line-height: 45px;
  border-radius: 3px;
  cursor: pointer;
  opacity: 0;
  transition: all .3s ease;
}

.scrollBtn.activeScroll {
  opacity: 1;
  right: 20px;
}
</style>