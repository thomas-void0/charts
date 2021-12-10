// 1，==================================== 处理 ====================================
const data = [
  { name: "questions", value: 17 },
  { name: "schools", value: 25 },
  { name: "philosophers", value: 35 },
];

// 设置图表高度
const chartWidth = 480;
const chartHeight = 300;
const margin = 15;

// 容器宽高
const containerWidth = chartWidth + margin * 2;
const containerHeight = chartHeight + margin * 2;

// 提取值
const names = Array.from(data, (d) => d.name);
const values = Array.from(data, (d) => d.value);
const indices = Array.from(data, (_, i) => i);

// 2，==================================== 布局 ====================================

// 计算每一个条左下顶点的横坐标
// 位置和在数组里面的 index 有关
const step = chartWidth / names.length;
const barWidth = step * 0.8;
const xs = Array.from(indices, (i) => i * step);

// 计算每一个条左下顶点的纵坐标
// 因为所有条底部都是对齐的，所以就是图表的高度
const y = chartHeight;

// 3，==================================== 映射 ====================================

// 获得每一个条的高度
// 条的高度应该和 value 线性相关的
const vmax = Math.max(...values);
const barHeights = Array.from(values, (v) => chartHeight * (v / vmax));

// 获得每一个条的颜色
const nameColor = {
  questions: "#5B8FF9",
  philosophers: "#61DDAA",
  schools: "#65789B",
};

const colors = Array.from(
  names as any,
  (name: keyof typeof nameColor) => nameColor[name]
);

// 4，==================================== 绘制 ====================================
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

// 设置canvas样式
canvas.style.width = containerWidth + "px";
canvas.style.height = containerHeight + "px";

// 下面把画布宽高设置为样式宽高的两倍主要是为了解决模糊问题
canvas.width = containerWidth * 2;
canvas.height = containerHeight * 2;

const context = canvas.getContext("2d")!;
context.scale(2, 2); // 抵消将画布宽高设置为样式宽高两倍的影响

context.translate(margin, margin); // 将坐标原点移动到绘制图表的区域

for (const index of indices) {
  const color = colors[index];
  const x = xs[index];
  const barHeight = barHeights[index];
  const value = values[index];

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
