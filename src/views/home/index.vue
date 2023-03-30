<template>
  <div class="index">
    <div class="index-banner">
      <a-row type="flex" justify="space-between" :gutter="24">
        <a-col :span="6">
          <div class="banner-item">
            <div class="item-bg" style="background: #9c6af7"></div>
            <div class="item-icon"><a-icon type="profile" /></div>
            <div class="item-stat">
              <div class="stat-number">
                <CountUp :startVal="0" :endVal="3" :countStyle="{ 'font-size': '30px', 'font-weight': '400', color: '#FEFEFE' }"></CountUp>
                <span>/</span>
                <CountUp :startVal="0" :endVal="20" :countStyle="{ 'font-size': '30px', 'font-weight': '400', color: '#FEFEFE' }"></CountUp>
              </div>
              <div class="stat-label">工单数</div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="banner-item">
            <div class="item-bg" style="background: #248ae9"></div>
            <div class="item-icon"><a-icon type="user" /></div>
            <div class="item-stat">
              <div class="stat-number">
                <CountUp :startVal="0" :endVal="2000" :countStyle="{ 'font-size': '30px', 'font-weight': '400', color: '#FEFEFE' }"></CountUp>
              </div>
              <div class="stat-label">用户数</div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="banner-item">
            <div class="item-bg" style="background: #f3a326"></div>
            <div class="item-icon"><a-icon type="appstore" /></div>
            <div class="item-stat">
              <div class="stat-number">
                <CountUp :startVal="0" :endVal="2000" :countStyle="{ 'font-size': '30px', 'font-weight': '400', color: '#FEFEFE' }"></CountUp>
              </div>
              <div class="stat-label">实例数</div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="banner-item">
            <div class="item-bg" style="background: #11d99e"></div>
            <div class="item-icon"><a-icon type="search" /></div>
            <div class="item-stat">
              <div class="stat-number">
                <CountUp :startVal="0" :endVal="2000" :countStyle="{ 'font-size': '30px', 'font-weight': '400', color: '#FEFEFE' }"></CountUp>
              </div>
              <div class="stat-label">查询数</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-spin :spinning="loading">
      <div class="index-chart">
        <a-row type="flex" justify="space-between" :gutter="24">
          <a-col :span="15">
            <div class="chart-bar" id="hf-instance"></div>
          </a-col>
          <a-col :span="9">
            <div class="chart-pie" id="user-order"></div>
          </a-col>
        </a-row>
      </div>
      <div class="index-chart">
        <a-row type="flex" justify="space-between" :gutter="24">
          <a-col :span="15">
            <div class="chart-bar" id="instance-query"></div>
          </a-col>
          <a-col :span="9">
            <div class="chart-pie" id="user-query"></div>
          </a-col>
        </a-row>
      </div>
      <div class="index-chart">
        <div class="chart-line" id="line-area"></div>
      </div>
      <div class="index-chart">
        <div class="chart-map" id="chart-map"></div>
      </div>
    </a-spin>
  </div>
</template>
<script>
/**
 * @description 首页
 * @author changz
 * */

import CountUp from '@/components/CountUp'
import { mapData, geoCoordMap } from '@/json/map.json'
/* eslint-disable */
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
import 'echarts-extension-amap'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, PieChart, LineChart, ScatterChart, EffectScatterChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, GraphicComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, GraphicComponent, BarChart, PieChart, LineChart, ScatterChart, EffectScatterChart, CanvasRenderer])

export default {
  name: 'Home',
  components: {
    CountUp
  },
  data() {
    return {
      loading: false,
      mapData,
      geoCoordMap
    }
  },

  mounted() {
    this.loading = true
    setTimeout(() => {
      this.$nextTick(() => {
        this.drawCateMap()
        this.drawHFInstanceBar()
        this.drawUserOrderPie()
        this.drawInstanceQueryBar()
        this.drawUserQueryPie()
        this.drawLineAreaChart()
        this.loading = false
      })
    }, 1000)
  },
  methods: {
    // 高频实例top10
    drawHFInstanceBar() {
      const myChart = echarts.init(document.getElementById('hf-instance'))
      // 绘制图表
      const queryList = [12, 14, 5, 7, 15, 4, 9, 7]
      const orderList = [60, 90, 50, 40, 65, 70, 85, 56]
      const xData = ['实例1', '实例2', '实例3', '实例4', '实例5', '值6', '值7', '值8']
      const option = {
        title: {
          text: '高频实例top10',
          left: 20,
          top: 25,
          textStyle: {
            color: '#333333',
            fontWeight: 'Bold',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'none' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 55,
          y: 70,
          x2: 30,
          y2: 50
        },
        legend: {
          right: 20,
          top: 20
        },
        xAxis: [
          {
            type: 'category',
            // x轴
            axisLine: {
              lineStyle: {
                color: '#DBDBDB',
                type: 'dashed'
              }
            },
            // 底部刻度线
            axisTick: {
              show: false
            },
            // 底部文本样式
            axisLabel: {
              color: '#999',
              interval: 0 // 全部显示横坐标
            },
            data: xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#999'
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
            // 背景
            // splitArea: {
            //   show: true
            // }
          }
        ],
        series: [
          {
            showBackground: false,
            name: '工单数',
            type: 'bar',
            stack: '百分比', // 上下堆叠属性
            itemStyle: {
              color: '#1890FF'
            },
            barWidth: 30,
            data: orderList
          },
          {
            showBackground: false,
            name: '查询数',
            type: 'bar',
            stack: '百分比',
            itemStyle: {
              color: '#F89F12'
            },
            barWidth: 30,
            data: queryList
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    // 实例查询统计
    drawInstanceQueryBar() {
      const myChart = echarts.init(document.getElementById('instance-query'))
      // 绘制图表
      const queryList = [32, 24, 45, 37, 55, 43, 29, 47]
      const orderList = [60, 90, 50, 40, 65, 70, 85, 56]
      const xData = ['实例1', '实例2', '实例3', '实例4', '实例5', '实例6', '实例7', '实例8']
      const option = {
        title: {
          text: '实例查询统计',
          left: 20,
          top: 25,
          textStyle: {
            color: '#333333',
            fontWeight: 'Bold',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'none' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 55,
          y: 70,
          x2: 30,
          y2: 50
        },
        legend: {
          right: 20,
          top: 20
        },
        xAxis: [
          {
            type: 'category',
            // x轴
            axisLine: {
              lineStyle: {
                color: '#DBDBDB',
                type: 'dashed'
              }
            },
            // 底部刻度线
            axisTick: {
              show: false
            },
            // 底部文本样式
            axisLabel: {
              color: '#999',
              interval: 0 // 全部显示横坐标
            },
            data: xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#999'
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
            // 背景
            // splitArea: {
            //   show: true
            // }
          }
        ],
        series: [
          {
            showBackground: false,
            name: '工单数',
            type: 'bar',
            barGap: 0,
            itemStyle: {
              color: '#1890FF'
            },
            barWidth: 30,
            data: orderList
          },
          {
            showBackground: false,
            name: '查询数',
            type: 'bar',
            itemStyle: {
              color: '#F89F12'
            },
            barWidth: 30,
            data: queryList
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    // 用户工单统计
    drawUserOrderPie() {
      const myChart = echarts.init(document.getElementById('user-order'))
      const orderList = [
        { value: 735, name: '张三' },
        { value: 484, name: '李四' }
      ]
      // 绘制图表
      const option = {
        title: {
          text: '用户工单统计',
          left: 20,
          top: 25,
          textStyle: {
            color: '#333333',
            fontWeight: 'Bold',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        // 环形中间文字
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '45%',
            style: {
              text: '20',
              fill: '#1890FF',
              fontSize: 50,
              fontWeight: 'bold'
            }
          },
          {
            type: 'text',
            left: 'center',
            top: '58%',
            style: {
              text: '工单数',
              fill: '#1890FF',
              fontSize: 22,
              fontWeight: '600'
            }
          }
        ],
        color: ['#1890FF', '#F89F12', '#4D81E7', '#47D7EA', '#AF87FD', '#4E7AFF', '#A8BEFF', '#1AE1E5', '#2194FF', '#4ECB73'],
        series: [
          {
            top: 40,
            type: 'pie',
            radius: ['45%', '60%'],
            labelLine: {
              showAbove: true,
              length: 30,
              lineStyle: {
                type: 'dashed',
                color: '#333',
                width: 2
              }
            },
            label: {
              formatter: '{c} \n {b|{b}}',
              edgeDistance: 20,
              lineHeight: 30,
              fontSize: 24,
              color: '#333',
              rich: {
                b: {
                  fontSize: 18,
                  color: '#3A3737',
                  lineHeight: 24,
                  align: 'left'
                }
              }
            },
            // hover时放大效果
            emphasis: {
              scaleSize: 15
            },
            data: orderList
          }
        ]
      }

      option && myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    // 用户查询统计
    drawUserQueryPie() {
      const myChart = echarts.init(document.getElementById('user-query'))
      const orderList = [
        { value: 735, name: '张三' },
        { value: 484, name: '李四' }
      ]
      // 绘制图表
      const option = {
        title: {
          text: '用户查询统计',
          left: 20,
          top: 25,
          textStyle: {
            color: '#333333',
            fontWeight: 'Bold',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        // 环形中间文字
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '45%',
            style: {
              text: '20',
              fill: '#1890FF',
              fontSize: 50,
              fontWeight: 'bold'
            }
          },
          {
            type: 'text',
            left: 'center',
            top: '58%',
            style: {
              text: '查询数',
              fill: '#1890FF',
              fontSize: 22,
              fontWeight: '600'
            }
          }
        ],
        color: ['#1890FF', '#F89F12', '#4D81E7', '#47D7EA', '#AF87FD', '#4E7AFF', '#A8BEFF', '#1AE1E5', '#2194FF', '#4ECB73'],
        series: [
          {
            top: 40,
            type: 'pie',
            radius: ['45%', '60%'],
            labelLine: {
              showAbove: true,
              length: 30,
              lineStyle: {
                type: 'dashed',
                color: '#333',
                width: 2
              }
            },
            label: {
              formatter: '{c} \n {b|{b}}',
              edgeDistance: 20,
              lineHeight: 30,
              fontSize: 24,
              color: '#333',
              rich: {
                b: {
                  fontSize: 18,
                  color: '#3A3737',
                  lineHeight: 24,
                  align: 'left'
                }
              }
            },
            // hover时放大效果
            emphasis: {
              scaleSize: 15
            },
            data: orderList
          }
        ]
      }

      option && myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    drawLineAreaChart() {
      const myChart = echarts.init(document.getElementById('line-area'))
      // 绘制图表
      const xData = ['2021-10', '2021-11', '2021-12', '2022-01', '2022-02', '2022-03']
      const chartData = [399, 204, 398, 553, 123, 452]
      const option = {
        title: {
          text: '工单最近六个月统计',
          left: 20,
          top: 25,
          textStyle: {
            color: '#333333',
            fontWeight: 'Bold',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 75,
          y: 70,
          x2: 30,
          y2: 50
        },
        xAxis: [
          {
            type: 'category',
            // x轴
            axisLine: {
              lineStyle: {
                color: '#DBDBDB',
                type: 'dashed'
              }
            },
            // 底部刻度线
            axisTick: {
              show: false
            },
            // 底部文本样式
            axisLabel: {
              color: '#999',
              interval: 0 // 全部显示横坐标
            },
            // 两边是否留白
            boundaryGap: false,
            // boundaryGap: ['1%', '5%'],
            data: xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            offset: 20,
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#999'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: '工单数',
            type: 'line',
            // 关键
            smooth: true,
            lineStyle: {
              color: '#1890FF'
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.3,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#1890FF'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ])
            },
            data: chartData
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },

    convertData(data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    },
    drawCateMap() {
      const myChart = echarts.init(document.getElementById('chart-map'))
      // 绘制图表
      const option = {
        tooltip: {
          trigger: 'item'
        },
        amap: {
          viewMode: '3D',
          center: [104.114129, 37.550339],
          zoom: 5,
          lang: 'zh_cn',
          resizeEnable: true,
          // 自定义样式 https://lbs.amap.com/api/javascript-api/guide/map/map-style/
          mapStyle: 'amap://styles/grey'
        },
        series: [
          {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'amap',
            data: this.convertData(this.mapData),
            symbolSize: function (val) {
              return val[2] / 10
            },
            encode: {
              value: 2
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'amap',
            data: this.convertData(
              this.mapData
                .sort(function (a, b) {
                  return b.value - a.value
                })
                .slice(0, 6)
            ),
            symbolSize: function (val) {
              return val[2] / 10
            },
            encode: {
              value: 2
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: '#333'
            },
            emphasis: {
              scale: true
            },
            zlevel: 1
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })

      // 获取百度地图实例，使用百度地图自带的控件
      // get AMap extension component
      // const amap = myChart.getModel().getComponent('amap').getAMap()
      // amap.setMapStyle('amap://styles/whitesmoke')
      // amap.addControl(new AMap.Scale())
      // amap.addControl(new AMap.ToolBar())
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .index-banner {
    width: 100%;
    margin-bottom: 24px;
    .banner-item {
      position: relative;
      .flex_vertical_center_horizontal_between();
      width: 100%;
      height: 120px;
      padding: 0 2vw;
      border-radius: 5px;
      .item-icon {
        position: relative;
        z-index: 9;
        font-size: 30px;
        color: #fff;
      }
      .item-stat {
        position: relative;
        z-index: 9;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
        height: 100%;
        padding: 15px 0 25px 0;
        .stat-number {
          .flex_vertical_center();
          // margin-bottom: 24px;
          font-size: 20px;
          // font-weight: bold;
          color: #fefefe;
        }
        .stat-label {
          font-size: 16px;
          color: #fefefe;
        }
      }
      .item-bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
    }
  }
  .index-chart {
    width: 100%;
    margin-bottom: 24px;
    .chart-bar {
      width: 100%;
      height: 425px;
      background-color: #fff;
      overflow: hidden;
      div {
        width: 100% !important;
        canvas {
          width: 100% !important;
        }
      }
    }
    .chart-pie {
      width: 100%;
      height: 425px;
      background-color: #fff;
    }
    .chart-line {
      width: 100%;
      height: 425px;
      background-color: #fff;
    }
    .chart-map {
      width: 100%;
      height: 600px;
      background-color: #fff;
    }
  }
}
</style>
