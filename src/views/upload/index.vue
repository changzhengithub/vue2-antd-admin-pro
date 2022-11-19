<template>
  <div class="upload">
    <div class="upload-item">
      <a-upload
        name="file"
        action="/file/upload"
        :headers="headers"
        :data="params"
        @change="handleChange"
      >
        <a-button> <a-icon type="upload" /> Click to Upload </a-button>
      </a-upload>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Upload',
  data() {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      params: {
        type: 1
      },
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川']
    }
  },

  methods: {
    handleChange(info) {
      console.log(info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.upload {
  width: 100%;
  height: 500px;
  background-color: #fff;
  .upload-item {
    width: 100%;
    padding: 20px;
    min-height: 200px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
}

</style>
