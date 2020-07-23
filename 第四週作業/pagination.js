export default {
  template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: pages.current_page === 1}"><a class="page-link" href="#" @click.prevent="updatepage(pages.current_page -= 1)">Previous</a></li>
      <li class="page-item" v-for="(i,key) in pages.total_pages" :key="id" :class="{ active: pages.current_page === i }" ><a class="page-link" href="#" @click.prevent="updatepage(i)">{{i}}</a></li>
      <li class="page-item" :class="{ disabled: pages.current_page === pages.total_pages }"><a class="page-link" href="#" @click.prevent="updatepage(pages.current_page += 1)">Next</a></li>
    </ul>
  </nav>`,
  props:['pages'],
  methods:{
    updatepage(num){
      this.$emit('pagenum',num);
    },
  },
};
