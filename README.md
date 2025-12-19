# 💧 Water Tank Problem – Trapped Rain Water Visualization

![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS-blue)
![Status](https://img.shields.io/badge/Status-Completed-success)

---

## 📌 Problem Summary

This project solves the **Water Tank (Trapping Rain Water) problem** and provides a **visual, interactive web-based solution** using **Vanilla JavaScript, HTML, and CSS**.

Given an array of non-negative integers representing block heights, the goal is to:
- Compute the total units of water trapped between the blocks
- Visually represent the blocks and trapped water using **SVG graphics** (preferred)

---

## 🧠 Problem Statement

You are given an integer array `height[]` of length `n` (`n ≥ 0`), where each element represents the height of a block.

After rainfall, water may be trapped between the blocks.  
The task is to calculate **how many units of water** can be stored and **visualize it in a browser**.

---

## 🧪 Example

Input:
[0, 4, 0, 0, 0, 6, 0, 6, 4, 0]

Output:
Total Water Stored = 26 units


---

## 🎯 Objective

- Compute trapped water efficiently
- Build a **frontend-only web application**
- Visualize blocks and water clearly
- Use **Vanilla JavaScript (no frameworks)**

---

## 🧠 Program Approach

The solution uses the **Two-Pointer Technique**, which is optimal for this problem.

### Step-by-Step Logic

1. Initialize two pointers:
   - `left = 0`
   - `right = n - 1`
2. Track:
   - `leftMax`
   - `rightMax`
3. Move the pointer with the smaller height
4. At each step:
  trappedWater += min(leftMax, rightMax) - currentHeight

5. Accumulate total trapped water

This approach ensures efficient computation and smooth visualization.

---

## 🚀 Why Two-Pointer Technique?

- Avoids nested loops
- Prevents recomputation
- Works in a single pass
- Ideal for real-time visualization

---

## 🖼️ Visualization Strategy

- **SVG-based rendering** for:
- Blocks (rectangles)
- Water (blue overlays)
- Dynamic scaling based on input height
- Real-time calculation display

*(Table view fallback supported if SVG is unavailable)*

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- SVG for visualization

---

## 📊 Complexity Analysis

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

Efficient and scalable for large inputs.

---

## 🚧 Challenges & Fixes

| Issue | Resolution |
|-----|------------|
Negative water calculation | Added boundary checks |
Inefficient brute-force approach | Implemented two-pointer technique |
Poor visualization clarity | Used SVG for precise rendering |
Dynamic height scaling | Normalized block heights |

---

## 🧠 Key Learnings

- Importance of optimized algorithms for visualization
- Two-pointer technique for linear-time solutions
- SVG rendering for interactive frontend graphics
- Clear separation of logic and UI

---

## ▶️ How to Run

1. Clone the repository
2. Open `index.html` in a browser
3. Enter block heights and visualize water storage

No backend or server required.

---

## 🎤 Interview Summary

> “This project demonstrates algorithm optimization combined with frontend visualization. I used the two-pointer approach to achieve O(n) time complexity and implemented an SVG-based UI to visually explain how water is trapped.”

---

## 📌 Tags

`javascript` `html-css` `svg-visualization` `two-pointer` `algorithm` `interview-problem`

