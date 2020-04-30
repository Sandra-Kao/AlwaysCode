/*{ <script>import JSON_TagPostRelationship from '/KaoSandraWeb/js/allTags/TagPostRelationship.json'</script> }*/
var vm = new Vue({
    el: '#container',
    data: {
        tagsByPostID: {
            tagID: [],
            tagName: '',
            tagDestination: ''
        },
        tagPostRelationship: {
            type: '',
            name: '',
            posts: [{
                postID: 0,
                postTitle: '',
                postPreview: '',
                postDate: '',
                postDestination: '',
                postViewsCount: ''
            }],

            tags: [{
                tagID: 0,
                tagName: '',
                tagDestination: ''
            }],

            postsTagsRelationship: [{
                postID: 0,
                tagID: 0
            }]
        },
        allPosts: {},
        allTags: {},
        allPostTag: {}
    },
    beforeMount() {
        apiGetTagPostJson().then(function (res) {
            vm.tagPostRelationship = res.data;
            vm.allPosts = res.data.posts;
            vm.allTags = res.data.tags;
            vm.allPostTag = res.data.postsTagsRelationship;
        }).catch(function (error) {
            console.log(error);
        });
    },
    computed: {},
    watch: {},
    methods: {
        mergedAllPostTag: function () {
            return $.extend(true, vm.allPosts, vm.allTags, vm.allPostTag);
        }
    }
});