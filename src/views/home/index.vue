<template>
  <div class="about">
    <div id="mountNode"></div>
  </div>
</template>
<script>
import G6 from '@antv/g6'

export default {
  name: 'Setting',
  data() {
    return {
      data: {
        // 点集
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 200
          },
          {
            id: 'node2',
            x: 300,
            y: 200
          }
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: 'node1',
            target: 'node2'
          }
        ]
      }
    }
  },

  created() {
    this.$nextTick(() => {
      this.initG6()
    })
  },
  methods: {
    async initG6() {
      // 实例化 minimap 插件
      const minimap = new G6.Minimap({
        size: [100, 100],
        className: 'minimap',
        type: 'delegate'
      })
      // 实例化 grid 插件
      const grid = new G6.Grid()

      // 创建 G6 图实例
      const graph = new G6.Graph({
        container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        width: 800,
        height: 500,
        fitView: true,
        fitViewPadding: [20, 40, 50, 20],

        animate: true,

        plugins: [minimap, grid] // 将 minimap 实例配置到图上
      })

      graph.node(node => {
        return {
          id: node.id,
          type: 'image',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
          size: [20, 20],
          style: {
            fill: 'blue'
          }
        }
      })

      // 读取数据
      const response = await fetch('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json')
      const remoteData = await response.json()
      graph.data(remoteData)
      // 渲染图
      graph.render()
    }
  }
}
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
