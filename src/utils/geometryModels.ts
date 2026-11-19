import type { GeometryScenario } from '../types/math';

export interface GeometryReadout {
  primaryLabel: string;
  primaryValue: string;
  secondaryLabel: string;
  secondaryValue: string;
  optimalLabel: string;
  optimalValue: string;
  formulaText: string;
  xLabel: string;
  yLabel: string;
  curveFn: (x: number) => number;
  xRange: [number, number];
  yRange: [number, number];
  optPoint: { x: number; y: number };
  threshold?: { y: number; label: string; pass: boolean };
}

export function evaluateGeometryScenario(scenario: GeometryScenario, x: number): GeometryReadout {
  switch (scenario) {
    case 'river-fence': {
      // Ex 4.4 Q42: 30m fence on 3 sides. Length = x, width = (30 - x)/2
      // Wait: in Q42, figure shows width = x m perpendicular to river? Let's check p.60!
      // Look at p.60 figure: the side parallel to river is NOT marked x? Wait: the top edge has "x m", and river is on the right!
      // Answer in book is (30x - 2x^2) m^2! So top and bottom edges are x m each (2x), and left side is (30 - 2x) m!
      // Wait: max area = 112.5 m^2, dimensions = 15 m x 7.5 m -> when x = 7.5, length along river = 30 - 2(7.5) = 15 m!
      const width = x;
      const lengthAlongRiver = 30 - 2 * x;
      const area = width * lengthAlongRiver;
      return {
        primaryLabel: 'Grassland Area A',
        primaryValue: `${area.toFixed(2)} m²`,
        secondaryLabel: 'Other Side (30 - 2x)',
        secondaryValue: `${lengthAlongRiver.toFixed(2)} m`,
        optimalLabel: 'Max Area at x = 7.5 m',
        optimalValue: '112.5 m² (15 m × 7.5 m)',
        formulaText: 'A(x) = x(30 - 2x) = 30x - 2x²',
        xLabel: 'x (m)',
        yLabel: 'Area (m²)',
        curveFn: (t) => 30 * t - 2 * t * t,
        xRange: [0, 15],
        yRange: [0, 130],
        optPoint: { x: 7.5, y: 112.5 },
      };
    }

    case 'wire-squares': {
      // Practice 4.21: 50 cm wire bent into two squares, larger side x cm -> perimeter 4x, smaller perimeter 50 - 4x, side = (50 - 4x)/4 = 12.5 - x
      // Wait: book answer says 25/9 (x^2 - 16x + 100) cm^2?! Let's check Practice 4.21 on p.56!
      // Look closely at the figure on p.56: the two squares SHARE a side or are joined?
      // Let's check: larger square has side x (3 sides = 3x or 4 sides = 4x?), smaller square has side y.
      // Let's solve 25/9 (x^2 - 16x + 100): at x = 8, A = 25/9 * (64 - 128 + 100) = 25/9 * 36 = 100!
      // Notice: total wire = 50 = 4x + 3y? Wait: if 4x + 3y = 50 -> y = (50 - 4x)/3 -> Area = x^2 + ((50-4x)/3)^2 = (9x^2 + 2500 - 400x + 16x^2)/9 = (25x^2 - 400x + 2500)/9 = (25/9)(x^2 - 16x + 100)!
      // YES! Because the figure shows the two squares share a vertical side (so the smaller square only uses 3 sides of wire: top, right, bottom, total 4x + 3y = 50)!
      const ySide = (50 - 4 * x) / 3;
      const area = (25 / 9) * (x * x - 16 * x + 100);
      return {
        primaryLabel: 'Total Area A',
        primaryValue: `${area.toFixed(2)} cm²`,
        secondaryLabel: 'Smaller Side y',
        secondaryValue: `${ySide.toFixed(2)} cm`,
        optimalLabel: 'Min Area at x = 8 cm',
        optimalValue: '100 cm² (> 90 cm²)',
        formulaText: 'A(x) = (25/9)(x² - 16x + 100)',
        xLabel: 'x (cm)',
        yLabel: 'Total Area (cm²)',
        curveFn: (t) => (25 / 9) * (t * t - 16 * t + 100),
        xRange: [2, 12],
        yRange: [70, 220],
        optPoint: { x: 8, y: 100 },
        threshold: { y: 90, label: 'Claim: < 90 cm²', pass: area < 90 },
      };
    }

    case 'string-grid-4': {
      // Example 4.21: 120m string, 5 horizontal segments of x m, 2 vertical segments of (120 - 5x)/2 m
      const h = (120 - 5 * x) / 2;
      const area = 60 * x - 2.5 * x * x;
      return {
        primaryLabel: 'Rectangular Area A',
        primaryValue: `${area.toFixed(1)} m²`,
        secondaryLabel: 'Vertical Length',
        secondaryValue: `${h.toFixed(1)} m`,
        optimalLabel: 'Max Area at x = 12 m',
        optimalValue: '360 m² (< 370 m²)',
        formulaText: 'A(x) = 60x - (5/2)x²',
        xLabel: 'x (m)',
        yLabel: 'Area (m²)',
        curveFn: (t) => 60 * t - 2.5 * t * t,
        xRange: [0, 24],
        yRange: [0, 410],
        optPoint: { x: 12, y: 360 },
        threshold: { y: 370, label: 'Claim: > 370 m²', pass: area > 370 },
      };
    }

    case 'string-grid-6': {
      // Ex 4.4 Q43: 96 cm string, 6 regions (2 rows x 3 cols? Look at p.60: 3 horizontal lines of length x, 4 vertical lines of length h)
      // 3x + 4h = 96 -> h = (96 - 3x)/4 = 24 - 0.75x -> A = 24x - (3/4)x^2!
      const h = (96 - 3 * x) / 4;
      const area = 24 * x - 0.75 * x * x;
      return {
        primaryLabel: 'Figure Area A',
        primaryValue: `${area.toFixed(2)} cm²`,
        secondaryLabel: 'Height (24 - 0.75x)',
        secondaryValue: `${h.toFixed(2)} cm`,
        optimalLabel: 'Max Area at x = 16 cm',
        optimalValue: '192 cm² (< 200 cm²)',
        formulaText: 'A(x) = 24x - (3/4)x²',
        xLabel: 'x (cm)',
        yLabel: 'Area (cm²)',
        curveFn: (t) => 24 * t - 0.75 * t * t,
        xRange: [0, 32],
        yRange: [0, 220],
        optPoint: { x: 16, y: 192 },
        threshold: { y: 200, label: 'Claim: > 200 cm²', pass: area > 200 },
      };
    }

    case 'right-triangle-rect': {
      // Ex 4.4 Q45: Right triangle ABC, AB = 15, AC = 17 -> BC = 8. DF = x, DB = 15 - (15/8)x -> P = 15x - (15/8)x^2
      const db = 15 - (15 / 8) * x;
      const area = 15 * x - (15 / 8) * x * x;
      return {
        primaryLabel: 'Rectangle DBEF Area',
        primaryValue: `${area.toFixed(2)} cm²`,
        secondaryLabel: 'Side DB',
        secondaryValue: `${db.toFixed(2)} cm`,
        optimalLabel: 'Max Area at x = 4 cm',
        optimalValue: '30 cm² (< 32 cm²)',
        formulaText: 'P(x) = 15x - (15/8)x²',
        xLabel: 'DF = x (cm)',
        yLabel: 'Area P (cm²)',
        curveFn: (t) => 15 * t - (15 / 8) * t * t,
        xRange: [0, 8],
        yRange: [0, 36],
        optPoint: { x: 4, y: 30 },
        threshold: { y: 32, label: 'Claim: > 32 cm²', pass: area > 32 },
      };
    }

    case 'square-triangle-apq': {
      // Rev Q56: Square ABCD perimeter 48 -> side 12. PC = x, DQ = 2x, BP = 12 - x, CQ = 12 - 2x.
      // Area APQ = 144 - 0.5*12*(12-x) - 0.5*x*(12-2x) - 0.5*12*2x = x^2 - 12x + 72
      const area = x * x - 12 * x + 72;
      return {
        primaryLabel: 'Area of △APQ',
        primaryValue: `${area.toFixed(2)} cm²`,
        secondaryLabel: 'DQ = 2x',
        secondaryValue: `${(2 * x).toFixed(2)} cm`,
        optimalLabel: 'Min Area at x = 6 cm',
        optimalValue: '36 cm² (> 35 cm²)',
        formulaText: 'Area = x² - 12x + 72 = (x - 6)² + 36',
        xLabel: 'PC = x (cm)',
        yLabel: 'Area (cm²)',
        curveFn: (t) => t * t - 12 * t + 72,
        xRange: [0, 6],
        yRange: [25, 80],
        optPoint: { x: 6, y: 36 },
        threshold: { y: 35, label: 'Claim: < 35 cm²', pass: area < 35 },
      };
    }

    case 'three-gardens': {
      // Rev Q57: 126 m fence enclosing 3 square gardens A, B, C. Side B = 3x, Side C = x.
      // Notice perimeter = 4s_A + 4(3x) + 4x? Wait: look at p.72 figure: A, B, C share vertical borders?
      // Let's verify 35x^2 - 420x + 1764:
      // 35x^2 = 25x^2 + 9x^2 + x^2! So side of A is 5x? Wait: 1764 = 42^2!
      // So side of A = (42 - 5x)!! Let's check: (42 - 5x)^2 + (3x)^2 + x^2 = 1764 - 420x + 25x^2 + 9x^2 + x^2 = 35x^2 - 420x + 1764!!
      // Why is side of A = 42 - 5x? Because total fence = 126, and 3*(side A) + 3*(3x) + 3*(x)... wait:
      // 3*s_A + 3*(3x) + 3*x + ... wait: if there's an outer fence + inner dividers: 126 / 3 = 42 -> s_A + 3x + x? No, s_A + 5x = 42 -> 3 s_A + 15x = 126!
      // Look at the figure on p.72:
      // Top horizontal edges: s_A + 3x + x = s_A + 4x
      // Bottom horizontal edge: s_A + 3x + x = s_A + 4x
      // Vertical edges: left of A (s_A), border between A and B (3x or s_A? s_A is taller than 3x so s_A), border between B and C (3x), right of C (x).
      // Sum = 2(s_A + 4x) + s_A + 3x + x... wait: 3*s_A + 12x? No, if A is to the left of B, the divider between A and B has height s_A, divider between B and C has height 3x, right edge has height x, left edge has height s_A -> vertical = 2s_A + 3x + x? No, look at the horizontal edges: top of A (s_A), top of B (3x), top of C (x), bottom (s_A + 3x + x) -> horizontal = 2s_A + 8x.
      //Wait: if 3*s_A + 15x = 126 -> s_A = 42 - 5x! Let's check where 15x comes from:
      // Top+bottom = 2(s_A + 4x) = 2s_A + 8x; left+divider1 = s_A + (s_A - 3x)? No, divider1 is height s_A? If left = s_A, divider1 = 3x, divider2 = x... no, 2s_A + 8x + s_A + 3x + 3x + x = 3s_A + 15x = 126!!
      // Wait: left edge = s_A, top+bottom = 2s_A + 8x, divider AB = 3x (Wait: A goes higher than B, so the upper step of A has height s_A - 3x, plus the shared part 3x = s_A! Wait: 3x + 3x + x = 7x -> 8x + 7x = 15x! i.e. 3*s_A + 15x = 126!).
      // Regardless of exact fence counting, s_A = 42 - 5x and Area = (42-5x)^2 + (3x)^2 + x^2 = 35x^2 - 420x + 1764!
      // Completing the square: 35(x^2 - 12x + 36 - 36) + 1764 = 35(x - 6)^2 + 504! Min area = 504 m^2 > 500 m^2!
      const sideA = 42 - 5 * x;
      const area = 35 * x * x - 420 * x + 1764;
      return {
        primaryLabel: 'Total Garden Area',
        primaryValue: `${area.toFixed(1)} m²`,
        secondaryLabel: 'Side of Garden A',
        secondaryValue: `${sideA.toFixed(2)} m`,
        optimalLabel: 'Min Area at x = 6 m',
        optimalValue: '504 m² (> 500 m²)',
        formulaText: 'A(x) = 35x² - 420x + 1764 = 35(x - 6)² + 504',
        xLabel: 'x (m)',
        yLabel: 'Total Area (m²)',
        curveFn: (t) => 35 * t * t - 420 * t + 1764,
        xRange: [2, 8.4],
        yRange: [420, 1100],
        optPoint: { x: 6, y: 504 },
        threshold: { y: 500, label: 'Claim: < 500 m²', pass: area < 500 },
      };
    }

    case 'bubble-tea': {
      // Rev Q58: Original P = -x^2 + 108x - 1566 (max at x=54, P=1350, avg = 25). New P = -x^2 + 100x - 1566 (max at x=50, P=934, avg=18.68).
      const pOld = -x * x + 108 * x - 1566;
      const pNew = -x * x + 100 * x - 1566;
      return {
        primaryLabel: 'Original Profit P',
        primaryValue: `$${pOld.toFixed(0)} ($${(pOld / x).toFixed(2)}/cup)`,
        secondaryLabel: 'New Profit P_new',
        secondaryValue: `$${pNew.toFixed(0)} ($${(pNew / x).toFixed(2)}/cup)`,
        optimalLabel: 'Max Avg Diff',
        optimalValue: '$25 - $18.68 = $6.32 ≠ $8',
        formulaText: 'P₁ = -(x - 54)² + 1350  vs  P₂ = -(x - 50)² + 934',
        xLabel: 'Cups sold x',
        yLabel: 'Daily Profit ($)',
        curveFn: (t) => -t * t + 108 * t - 1566,
        xRange: [15, 95],
        yRange: [-200, 1500],
        optPoint: { x: 54, y: 1350 },
      };
    }

    case 'park-road': {
      // Rev Q61: DR = x, AB = 4x, perimeter of ABCD = 200 -> AD = 100 - 4x. BP = 32 -> CP = 32? Wait:
      // Let's check p.73 figure: R, D, A horizontal top; Q, P horizontal bottom; B, P vertical right; R, Q vertical left.
      // AB = 4x, BP = 32, so vertical height of outer rectangle AQPR is 4x + 32? No, AD is horizontal!
      // Look at p.73: A is top-right, B is below A (so AB is vertical! AB = 4x, BP = 32, so AP = 4x + 32).
      // AD is horizontal, perimeter of ABCD = 200 -> 2(AB + AD) = 200 -> AD = 100 - 4x.
      // DR = x, so RA = x + 100 - 4x = 100 - 3x.
      // Area of park ABCD = 4x(100 - 4x) = 400x - 16x^2 (max at x = 12.5).
      // Area of road BCDRQP = Area(AQPR) - Area(ABCD) = (4x + 32)(100 - 3x) - (400x - 16x^2)
      // = (400x - 12x^2 + 3200 - 96x) - 400x + 16x^2 = 4x^2 - 96x + 3200 = 4(x - 12)^2 + 2624!
      // Road min at x = 12, Park max at x = 12.5 -> 12 ≠ 12.5 -> disagree!
      const parkArea = 400 * x - 16 * x * x;
      const roadArea = 4 * x * x - 96 * x + 3200;
      return {
        primaryLabel: 'Road BCDRQP Area',
        primaryValue: `${roadArea.toFixed(1)} m²`,
        secondaryLabel: 'Park ABCD Area',
        secondaryValue: `${parkArea.toFixed(1)} m²`,
        optimalLabel: 'Optima Differ',
        optimalValue: 'Road min x=12, Park max x=12.5',
        formulaText: 'Road: 4(x - 12)² + 2624  |  Park: -16(x - 12.5)² + 2500',
        xLabel: 'DR = x (m)',
        yLabel: 'Area (m²)',
        curveFn: (t) => 4 * t * t - 96 * t + 3200,
        xRange: [2, 22],
        yRange: [1500, 3500],
        optPoint: { x: 12, y: 2624 },
      };
    }

    case 'projectile-40': {
      // Ex 4.4 Q40: h = 12t - 5t^2, max at t = 1.2s, h = 7.2 m
      const h = 12 * x - 5 * x * x;
      return {
        primaryLabel: 'Height h(t)',
        primaryValue: `${h.toFixed(2)} m`,
        secondaryLabel: 'Elapsed Time t',
        secondaryValue: `${x.toFixed(2)} s`,
        optimalLabel: 'Max Height at t = 1.2 s',
        optimalValue: '7.2 m',
        formulaText: 'h(t) = 12t - 5t² = -5(t - 1.2)² + 7.2',
        xLabel: 'Time t (s)',
        yLabel: 'Height h (m)',
        curveFn: (t) => 12 * t - 5 * t * t,
        xRange: [0, 2.4],
        yRange: [0, 8.5],
        optPoint: { x: 1.2, y: 7.2 },
      };
    }

    case 'projectile-55': {
      // Rev Q55: h = -5t^2 + 15t + 62, max at t = 1.5s, h = 73.25 m
      const h = -5 * x * x + 15 * x + 62;
      return {
        primaryLabel: 'Height h(t)',
        primaryValue: `${h.toFixed(2)} m`,
        secondaryLabel: 'Elapsed Time t',
        secondaryValue: `${x.toFixed(2)} s`,
        optimalLabel: 'Max Height at t = 1.5 s',
        optimalValue: '73.25 m (293/4 m)',
        formulaText: 'h(t) = -5t² + 15t + 62 = -5(t - 1.5)² + 73.25',
        xLabel: 'Time t (s)',
        yLabel: 'Height h (m)',
        curveFn: (t) => -5 * t * t + 15 * t + 62,
        xRange: [0, 5.4],
        yRange: [0, 82],
        optPoint: { x: 1.5, y: 73.25 },
      };
    }

    case 'trapezium': {
      // Class Ex 4.4 Q7: upper base 13-x, lower base 27-3x, height 10+2x, 0 < x < 9
      // Area = 0.5 * (40 - 4x) * (10 + 2x) = (20 - 2x)(10 + 2x) = -4x^2 + 20x + 200 = -4(x - 2.5)^2 + 225
      const area = -4 * x * x + 20 * x + 200;
      const height = 10 + 2 * x;
      return {
        primaryLabel: 'Trapezium Area',
        primaryValue: `${area.toFixed(2)} cm²`,
        secondaryLabel: 'Height (10 + 2x)',
        secondaryValue: `${height.toFixed(2)} cm`,
        optimalLabel: 'Max Area at x = 2.5 cm',
        optimalValue: '225 cm² (< 230 cm²)',
        formulaText: 'A(x) = -4x² + 20x + 200 = -4(x - 2.5)² + 225',
        xLabel: 'x (cm)',
        yLabel: 'Area (cm²)',
        curveFn: (t) => -4 * t * t + 20 * t + 200,
        xRange: [0, 9],
        yRange: [0, 250],
        optPoint: { x: 2.5, y: 225 },
        threshold: { y: 230, label: 'Claim: > 230 cm²', pass: area > 230 },
      };
    }
  }
}
