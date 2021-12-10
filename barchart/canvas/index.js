"use strict";
// 1，==================================== 处理 ====================================
var data = [
    { name: "questions", value: 17 },
    { name: "schools", value: 25 },
    { name: "philosophers", value: 35 },
];
// 设置图表高度
var chartWidth = 480;
var chartHeight = 300;
var margin = 15;
// 容器宽高
var containerWidth = chartWidth + margin * 2;
var containerHeight = chartHeight + margin * 2;
// 提取值
var names = Array.from(data, function (d) { return d.name; });
var values = Array.from(data, function (d) { return d.value; });
var indices = Array.from(data, function (_, i) { return i; });
// 2，==================================== 布局 ====================================
// 计算每一个条左下顶点的横坐标
// 位置和在数组里面的 index 有关
var step = chartWidth / names.length;
var barWidth = step * 0.8;
var xs = Array.from(indices, function (i) { return i * step; });
// 计算每一个条左下顶点的纵坐标
// 因为所有条底部都是对齐的，所以就是图表的高度
var y = chartHeight;
// 3，==================================== 映射 ====================================
// 获得每一个条的高度
// 条的高度应该和 value 线性相关的
var vmax = Math.max.apply(Math, values);
var barHeights = Array.from(values, function (v) { return chartHeight * (v / vmax); });
// 获得每一个条的颜色
var nameColor = {
    questions: "#5B8FF9",
    philosophers: "#61DDAA",
    schools: "#65789B",
};
var colors = Array.from(names, function (name) { return nameColor[name]; });
// 4，==================================== 绘制 ====================================
var canvas = document.getElementById("canvas");
// 设置canvas样式
canvas.style.width = containerWidth + "px";
canvas.style.height = containerHeight + "px";
// 下面把画布宽高设置为样式宽高的两倍主要是为了解决模糊问题
canvas.width = containerWidth * 2;
canvas.height = containerHeight * 2;
var context = canvas.getContext("2d");
context.scale(2, 2); // 抵消将画布宽高设置为样式宽高两倍的影响
context.translate(margin, margin); // 将坐标原点移动到绘制图表的区域
for (var _i = 0, indices_1 = indices; _i < indices_1.length; _i++) {
    var index = indices_1[_i];
    var color = colors[index];
    var x = xs[index];
    var barHeight = barHeights[index];
    var value = values[index];
    // 绘制条
    context.fillStyle = color;
    context.fillRect(x, y - barHeight, barWidth, barHeight);
    // 绘制值
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "white";
    context.font = "25px PingFangSC-Regular, sans-serif";
    context.fillText(value, x + barWidth / 2, y - barHeight / 2);
}
