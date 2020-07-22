export default {
  template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item" v-for="(i,key) in pages.total_pages" :key="id"><a class="page-link" href="#" @click.prevent="updatepage(i)">{{i}}</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>`,
  props:['pages'],
  methods:{
    updatepage(num){
      this.$emit('pagenum',num);
    },
  },
};
