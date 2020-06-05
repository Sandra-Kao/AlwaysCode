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
        allPostsTags: {}
    },
    beforeMount() {
        apiGetTagPostJson().then(function (res) {
            vm.tagPostRelationship = res.data;
            vm.allPosts = res.data.posts;
            vm.allTags = res.data.tags;
            vm.allPostsTags = res.data.postsTagsRelationship;
        }).catch(function (error) {
            console.log(error);
        });
    },
    computed: {},
    watch: {},
    methods: {
        mergedAllPostsTags: function () {
            let mergeObject = $.extend(true, {}, this.allPosts);

            for (var y in mergeObject) {
                for (var x in this.allPostsTags) {
                    if (mergeObject[y].postID === this.allPostsTags[x].postID) {
                        mergeObject[y].tags.push(this.allPostsTags[x].tagID)
                    }
                }
                for (var tag in mergeObject[y].tags) {
                    for (var t in this.allTags) {
                        if (mergeObject[y].tags[tag] === this.allTags[t].tagID) {
                            mergeObject[y].tags.splice(tag, 1)
                            mergeObject[y].tags.push(this.allTags[t])
                        }
                    }
                }
            }

            return mergeObject;
        },
        groupByPosts: function () {
            const groupedSource = _.groupBy(this.mergedAllPostsTags(), a => a.postID);
            return groupedSource;
        },
        groupByTags: function () {
            const groupedSource = _.groupBy(this.mergedAllPostsTags(), a => a.tagID);
            return groupedSource;
        },
        searchTagsByPostId: function (pID) {
            let grouped = this.mergedAllPostsTags();
            var obj = [];
            for (var i = 0; i < Object.keys(grouped).length; i++) {
                if (pID == grouped[i].postID) {
                    for (var t = 0; t < Object.keys(grouped[i].tags).length; t++) {
                        obj.push({
                            tagID: grouped[i].tags[t].tagID,
                            tagname: grouped[i].tags[t].tagName
                        })
                    }
                }
            }
            return obj;
        }
    }
});