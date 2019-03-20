<template>
  <Form :model="formItem" :label-width="80">
    <FormItem label="菜单名称">
      <Input v-model="formItem.menuName" placeholder="菜单名称"></Input>
    </FormItem>

    <FormItem label="是否有子菜单">
      <RadioGroup v-model="formItem.hasChild">
        <Radio label="1">是</Radio>
        <Radio label="0">否</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="vue子页面">
      <Input v-model="formItem.linkUrl" placeholder="vue子页面"></Input>
    </FormItem>

    <FormItem label="跳转链接">
      <Input v-model="formItem.linkUrl" placeholder="跳转链接"></Input>
    </FormItem>

    <FormItem label="描述">
      <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="描述"></Input>
    </FormItem>
  </Form>

</template>

<script>
  export default {
    name: "menuItem",
    data() {
      return {
        formItem: {
          menuName : "",
          linkUrl : "",
          hasChild: "1",
          description: ""
        }
      }
    }
  }
</script>
