<template>
    <div style="width:100%;height:100%;" id="service_request_con"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "serviceRequests",
  mounted() {
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      grid: {
        top: "3%",
        left: "1.2%",
        right: "1%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          symbolSize: 16,
          name: "注册人数",
          type: "line",
          stack: "总量",
          color: "#00ab7f",
          areaStyle: {
            normal: {
              color: "#00ad80",
              opacity: 0.2
            }
          },
          itemStyle: {
            normal: {
              color: "#01ae83",
              lineStyle: {
                color: "#01ae83"
              }
            }
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        }
      ]
    };
    const serviceRequestCharts = echarts.init(
      document.getElementById("service_request_con")
    );
    serviceRequestCharts.setOption(option);

    window.addEventListener("resize", function() {
      serviceRequestCharts.resize();
    });
  }
};
</script>