<style lang="less">
  @import './menu.less';
</style>

<template>
  <div class="menu">
    <div class="menu-tree">
      <Tree :data="data" :render="renderContent"></Tree>
    </div>
    <div class="menu-form">
      <menu-item></menu-item>
    </div>
  </div>
</template>

<script>
  import menuItem from "./menuItem"
  import {getMenuTree} from '@/api/menu/menu.js'
  export default {
    components: {menuItem},
    name: "menuTree",
    data() {
      return {
        data: [
          {
            title: 'root',
            expand: true,
            render: (h, { root, node, data }) => {
              return h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%'
                }
              }, [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  h('span', data.title)
                ]),
                h('span', {
                  style: {
                    display: 'inline-block',
                    float: 'right',
                    marginRight: '32px'
                  }
                }, [
                  h('Button', {
                    props: Object.assign({}, this.buttonProps, {
                      icon: 'ios-add',
                      type: 'primary'
                    }),
                    style: {
                      width: '64px'
                    },
                    on: {
                      click: () => { this.append(data) }
                    }
                  })
                ])
              ]);
            },
            children: [{
              title: "aaaa", expand: true,
              children:[
                {title: "bbb", expand: true}
              ]
            },{
              title: "aaaa", expand: true
            }]
          }
        ],
        buttonProps: {
          type: 'default',
          size: 'small',
        }
      }
    },
    created(){
      console.log("start")
      getMenuTree(function () {
        console.log("finish")
      })
    },
    methods:{
      getMenuTree(callback){
        let that = this;
        getMenuTree(function (menus) {
          const children = that.children || [];
          if(menus && menus.length > 0){
            for(let i=0 ;i<menus.length; i++){
              children.push(menus[i])
            }
          }
          that.$set(data, 'children', children);
        })
      },
      renderContent (h, { root, node, data }) {
        console.log("renderContent------->",data)
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-add'
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => { this.append(data) }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-remove'
              }),
              on: {
                click: () => { this.remove(root, node, data) }
              }
            })
          ])
        ]);
      },
      append (data) {
        const children = data.children || [];
        children.push({
          title: 'appended node',
          expand: true
        });
        this.$set(data, 'children', children);
      },
      remove (root, node, data) {
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(data);
        parent.children.splice(index, 1);
      }
    },
  }
</script>
