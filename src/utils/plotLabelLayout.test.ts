import assert from 'node:assert/strict';
import test from 'node:test';
import { ALL_EXERCISE_GROUPS } from '../data/index';
import { formatNum, generateTicks, sampleCurvePoints } from './mathEngine';
import {
  computePlotLabelLayout,
  estimateLabelSize,
  rectsOverlapArea,
  type PlotLabelInput,
  type PlotRect,
} from './plotLabelLayout';

test('deduplicates coincident polygon and point labels and separates close x-axis labels', () => {
  const bounds: PlotRect = { x: 50, y: 22, w: 486, h: 290 };
  const placed = computePlotLabelLayout(
    [
      { id: 'poly-0', px: 200, py: 150, text: 'A', color: '#fff', category: 'polygon' },
      { id: 'pt-0', px: 200, py: 150, text: 'A(6, 7)', color: '#fff', category: 'point' },
      { id: 'pt-1', px: 252, py: 260, text: '(1/2, 0)', color: '#fff', category: 'point' },
      { id: 'pt-2', px: 292, py: 260, text: '(3/5, 0)', color: '#fff', category: 'point' },
    ],
    {
      bounds,
      dotCenters: [
        { x: 200, y: 150 },
        { x: 252, y: 260 },
        { x: 292, y: 260 },
      ],
    }
  );

  // A and A(6,7) merged into one A(6, 7)
  assert.equal(placed.length, 3);
  assert.ok(placed.some((l) => l.text === 'A(6, 7)'));
  assert.ok(!placed.some((l) => l.text === 'A'));

  // Zero pairwise overlaps
  for (let i = 0; i < placed.length; i++) {
    for (let j = i + 1; j < placed.length; j++) {
      assert.equal(
        rectsOverlapArea(placed[i].box, placed[j].box, 0),
        0,
        `Labels ${placed[i].text} and ${placed[j].text} overlapped`
      );
    }
  }
});

test('all 341 coordinate plots in Ch. 3 & Ch. 4 have zero label overlaps and zero boundary clipping', () => {
  const width = 560;
  const height = 350;
  const pad = { left: 50, right: 24, top: 22, bottom: 38 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const bounds: PlotRect = { x: pad.left, y: pad.top, w: plotW, h: plotH };

  let checkedPlots = 0;
  const failures: string[] = [];

  for (const grp of ALL_EXERCISE_GROUPS) {
    for (const q of grp.questions) {
      const v = q.visual;
      if (v.kind !== 'coordinate') continue;
      checkedPlots++;

      const [xMin, xMax] = v.xRange;
      const [yMin, yMax] = v.yRange;
      const toPxX = (x: number) => pad.left + ((x - xMin) / (xMax - xMin)) * plotW;
      const toPxY = (y: number) => pad.top + ((yMax - y) / (yMax - yMin)) * plotH;
      const xAxisVisible = yMin <= 0 && yMax >= 0;
      const yAxisVisible = xMin <= 0 && xMax >= 0;
      const axisY = xAxisVisible ? toPxY(0) : pad.top + plotH;
      const axisX = yAxisVisible ? toPxX(0) : pad.left;

      const xTicks = generateTicks(xMin, xMax, 7);
      const yTicks = generateTicks(yMin, yMax, 6);

      const obstacles: PlotRect[] = [];
      for (const tx of xTicks) {
        if (Math.abs(tx) < 1e-9 && xAxisVisible && yAxisVisible) continue;
        const px = toPxX(tx);
        if (yAxisVisible && Math.abs(px - axisX) < 18) continue;
        const labelY = Math.min(height - 10, Math.max(pad.top + 16, axisY + 14));
        const { w, h } = estimateLabelSize(formatNum(tx, 1), 10);
        obstacles.push({ x: px - w / 2, y: labelY - h + 3, w, h });
      }
      for (const ty of yTicks) {
        if (Math.abs(ty) < 1e-9 && xAxisVisible && yAxisVisible) continue;
        const py = toPxY(ty);
        if (xAxisVisible && Math.abs(py - axisY) < 12) continue;
        const px = yAxisVisible ? axisX - 6 : pad.left - 6;
        const { w, h } = estimateLabelSize(formatNum(ty, 1), 10);
        obstacles.push({ x: px - w, y: py - h / 2, w, h });
      }
      if (xAxisVisible && yAxisVisible) {
        obstacles.push({ x: axisX - 18, y: axisY + 2, w: 16, h: 15 });
      }
      obstacles.push({ x: axisX + 4, y: pad.top - 2, w: 18, h: 16 });

      const rawInputs: PlotLabelInput[] = [];
      const dotCenters: { x: number; y: number }[] = [];

      v.polygons?.forEach((poly, idx) => {
        poly.points.forEach((pt, pi) => {
          if (pt.label) {
            rawInputs.push({
              id: `poly-${idx}-${pi}`,
              px: toPxX(pt.x),
              py: toPxY(pt.y),
              text: pt.label,
              color: '#fff',
              category: 'polygon',
            });
          }
        });
      });

      v.showRoots?.forEach((r, ri) => {
        const px = toPxX(r);
        const py = toPxY(0);
        dotCenters.push({ x: px, y: py });
        rawInputs.push({
          id: `root-${ri}`,
          px,
          py,
          text: `(${formatNum(r, 2)}, 0)`,
          color: '#10b981',
          category: 'root',
          fontSize: 10,
        });
      });

      if (v.showVertex && Number.isFinite(v.showVertex.x) && Number.isFinite(v.showVertex.y)) {
        const px = toPxX(v.showVertex.x);
        const py = toPxY(v.showVertex.y);
        dotCenters.push({ x: px, y: py });
        rawInputs.push({
          id: 'vertex-main',
          px,
          py,
          text:
            v.showVertex.label ||
            `(${formatNum(v.showVertex.x, 2)}, ${formatNum(v.showVertex.y, 2)})`,
          color: '#ef4444',
          category: 'vertex',
          fontWeight: '700',
        });
      }

      v.points?.forEach((pt, pi) => {
        const px = toPxX(pt.x);
        const py = toPxY(pt.y);
        dotCenters.push({ x: px, y: py });
        if (pt.label) {
          rawInputs.push({
            id: `pt-${pi}`,
            px,
            py,
            text: pt.label,
            color: '#fff',
            category: 'point',
          });
        }
      });

      const curveSamples: { x: number; y: number }[] = [];
      for (const c of v.curves) {
        const segs = sampleCurvePoints(c, xMin, xMax, yMin, yMax, 120);
        for (const seg of segs) {
          for (let i = 0; i < seg.length; i += 4) {
            curveSamples.push({ x: toPxX(seg[i].x), y: toPxY(seg[i].y) });
          }
        }
      }

      const placed = computePlotLabelLayout(rawInputs, {
        bounds,
        obstacles,
        dotCenters,
        curveSamples,
        axisX: yAxisVisible ? axisX : null,
        axisY: xAxisVisible ? axisY : null,
      });

      for (let i = 0; i < placed.length; i++) {
        const b = placed[i].box;
        if (
          b.x < bounds.x ||
          b.x + b.w > bounds.x + bounds.w ||
          b.y < bounds.y ||
          b.y + b.h > bounds.y + bounds.h
        ) {
          failures.push(`${q.id}: label "${placed[i].text}" clipped outside plot bounds`);
        }
        for (let j = i + 1; j < placed.length; j++) {
          if (rectsOverlapArea(placed[i].box, placed[j].box, 0) > 0) {
            failures.push(
              `${q.id}: "${placed[i].text}" overlaps "${placed[j].text}"`
            );
          }
        }
        for (const obs of obstacles) {
          if (rectsOverlapArea(placed[i].box, obs, 0) > 0) {
            failures.push(`${q.id}: "${placed[i].text}" overlaps tick/axis label`);
          }
        }
      }
    }
  }

  assert.ok(checkedPlots >= 340, `Expected >= 340 coordinate plots, checked ${checkedPlots}`);
  assert.deepEqual(failures, []);
});
