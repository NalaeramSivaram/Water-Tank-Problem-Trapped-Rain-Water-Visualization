// app.js - Algorithm + SVG + Table rendering
const svg = document.getElementById('view');
const inputEl = document.getElementById('inputArray');
const unitsEl = document.getElementById('units');
const renderBtn = document.getElementById('renderBtn');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');
const tableDiv = document.getElementById('tableOutput');
const showSvgCB = document.getElementById('showSvg');
const showTableCB = document.getElementById('showTable');

function parseInput(str){
  if(!str) return [];
  return str.split(',').map(s=>parseInt(s.trim())).filter(x=>!Number.isNaN(x) && x>=0);
}

// compute trapped water using leftMax/rightMax approach (O(n))
function computeTrappedWater(heights){
  const n = heights.length;
  if(n===0) return {total:0, waterAt:[]};
  const leftMax = new Array(n);
  const rightMax = new Array(n);
  leftMax[0]=heights[0];
  for(let i=1;i<n;i++) leftMax[i]=Math.max(leftMax[i-1], heights[i]);
  rightMax[n-1]=heights[n-1];
  for(let i=n-2;i>=0;i--) rightMax[i]=Math.max(rightMax[i+1], heights[i]);
  const waterAt = new Array(n).fill(0);
  let total=0;
  for(let i=0;i<n;i++){
    const level = Math.min(leftMax[i], rightMax[i]);
    const trapped = Math.max(0, level - heights[i]);
    waterAt[i]=trapped;
    total += trapped;
  }
  return {total, waterAt};
}

// Render SVG bars + water
function renderSVG(heights, waterAt) {
  // clear
  while(svg.firstChild) svg.removeChild(svg.firstChild);
  if(heights.length===0) return;

  const padding = 40;
  const width = svg.viewBox.baseVal.width || 1000;
  const height = svg.viewBox.baseVal.height || 400;
  const n = heights.length;

  const maxH = Math.max(...heights, 1);
  const barW = Math.max(6, (width - padding*2) / n * 0.8);
  const gap = ((width - padding*2) / n) - barW;

  // grid lines
  const gridGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
  gridGroup.setAttribute('class','grid');
  const steps = Math.min(10, Math.max(4, maxH));
  for(let s=0;s<=steps;s++){
    const y = padding + (height - padding*2) * (1 - s/steps);
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', padding);
    line.setAttribute('x2', width - padding);
    line.setAttribute('y1', y);
    line.setAttribute('y2', y);
    line.setAttribute('class','gridline');
    line.setAttribute('stroke','rgba(255,255,255,0.03)');
    gridGroup.appendChild(line);
    const txt = document.createElementNS('http://www.w3.org/2000/svg','text');
    txt.setAttribute('x', 8);
    txt.setAttribute('y', y+4);
    txt.textContent = Math.round(maxH * s/steps);
    txt.setAttribute('class','axis');
    gridGroup.appendChild(txt);
  }
  svg.appendChild(gridGroup);

  const waterGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
  const barsGroup = document.createElementNS('http://www.w3.org/2000/svg','g');

  for(let i=0;i<n;i++){
    const h = heights[i]||0;
    const x = padding + i * (barW + gap) + gap/2;
    const barHeight = (h / maxH) * (height - padding*2);
    const yBar = (padding + (height - padding*2) - barHeight);

    // block rect
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', yBar);
    rect.setAttribute('width', barW);
    rect.setAttribute('height', barHeight);
    rect.setAttribute('class','blockRect');
    rect.setAttribute('rx', 3);
    barsGroup.appendChild(rect);

    // water rect if any
    const w = waterAt[i] || 0;
    if(w>0){
      const waterHeight = (w / maxH) * (height - padding*2);
      const yWater = yBar - waterHeight;
      const wrect = document.createElementNS('http://www.w3.org/2000/svg','rect');
      wrect.setAttribute('x', x);
      wrect.setAttribute('y', yWater);
      wrect.setAttribute('width', barW);
      wrect.setAttribute('height', waterHeight);
      wrect.setAttribute('class','waterRect');
      wrect.setAttribute('rx', 2);
      waterGroup.appendChild(wrect);
    }

    // index label
    const idx = document.createElementNS('http://www.w3.org/2000/svg','text');
    idx.setAttribute('x', x + barW/2);
    idx.setAttribute('y', height - 8);
    idx.setAttribute('text-anchor','middle');
    idx.textContent = i;
    idx.setAttribute('class','axis');
    barsGroup.appendChild(idx);

    // height label on top of bar
    const htxt = document.createElementNS('http://www.w3.org/2000/svg','text');
    htxt.setAttribute('x', x + barW/2);
    htxt.setAttribute('y', yBar - 6);
    htxt.setAttribute('text-anchor','middle');
    htxt.textContent = h;
    htxt.setAttribute('class','axis');
    barsGroup.appendChild(htxt);
  }

  svg.appendChild(waterGroup);
  svg.appendChild(barsGroup);
}

// Render table-style grid visualization
function renderTable(heights, waterAt) {
  const maxH = Math.max(...heights, ...waterAt, 0);
  if(heights.length===0) { tableDiv.innerHTML = "<p>No data</p>"; return; }

  // build HTML table: rows from top (maxH) down to 1 (so number of rows = maxH)
  let html = "<table>";
  for(let level = maxH; level >= 1; level--) {
    html += "<tr>";
    for(let i=0;i<heights.length;i++){
      let cls = "empty";
      // block occupies levels 1..heights[i]
      if(heights[i] >= level){
        cls = "block";
      } else {
        // water occupies levels above block up to block+waterAt
        if(heights[i] + waterAt[i] >= level){
          cls = "water";
        }
      }
      html += `<td class="${cls}"></td>`;
    }
    html += "</tr>";
  }
  html += "</table>";
  tableDiv.innerHTML = html;
}

// main render wiring
function render(heights) {
  const { total, waterAt } = computeTrappedWater(heights);
  unitsEl.textContent = total;

  // SVG
  if(showSvgCB.checked){
    document.querySelector('.visual').style.display = 'flex';
    renderSVG(heights, waterAt);
  } else {
    document.querySelector('.visual').style.display = 'none';
  }

  // Table
  if(showTableCB.checked){
    document.querySelector('.table-section').style.display = 'block';
    renderTable(heights, waterAt);
  } else {
    document.querySelector('.table-section').style.display = 'none';
  }
}

// event handlers
renderBtn.addEventListener('click', ()=>{
  const arr = parseInput(inputEl.value);
  render(arr);
});

randomBtn.addEventListener('click', ()=>{
  const n = 10;
  const arr = Array.from({length:n}, ()=>Math.floor(Math.random()*8));
  inputEl.value = arr.join(',');
  render(arr);
});

clearBtn.addEventListener('click', ()=>{
  inputEl.value = '';
  render([]);
});

showSvgCB.addEventListener('change', ()=> {
  const arr = parseInput(inputEl.value);
  render(arr);
});
showTableCB.addEventListener('change', ()=> {
  const arr = parseInput(inputEl.value);
  render(arr);
});

// initial render on load
document.addEventListener('DOMContentLoaded', ()=>{
  const arr = parseInput(inputEl.value);
  render(arr);
});
