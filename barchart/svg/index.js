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
function createSVGElement(type) {
    return document.createElementNS("http://www.w3.org/2000/svg", type);
}
var svg = document.getElementById("container-svg");
// 设置 svg 的坐标原点和大小
svg.setAttribute("width", containerWidth);
svg.setAttribute("height", containerHeight);
svg.setAttribute("viewBox", [0, 0, containerWidth, containerHeight]);
// 创建一个 g 元素用于平移
var g = createSVGElement("g");
g.setAttribute("transform", "translate(" + margin + ", " + margin + ")");
svg.appendChild(g);
for (var _i = 0, indices_1 = indices; _i < indices_1.length; _i++) {
    var index = indices_1[_i];
    // 取得对应的属性
    var color = colors[index];
    var x = xs[index];
    var barHeight = barHeights[index];
    var value = values[index];
    // 绘制条
    var rect = createSVGElement("rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y - barHeight);
    rect.setAttribute("fill", color);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", barHeight);
    g.appendChild(rect);
    // 绘制值
    var text = createSVGElement("text");
    text.textContent = value;
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "white");
    text.setAttribute("font-family", "PingFangSC-Regular, sans-serif");
    text.setAttribute("font-size", 25);
    text.setAttribute("alignment-baseline", "middle");
    text.setAttribute("x", x + barWidth / 2);
    text.setAttribute("y", y - barHeight / 2);
    g.appendChild(text);
}
