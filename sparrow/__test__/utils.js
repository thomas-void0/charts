// 创建一个div
export function createDiv() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  return div;
}