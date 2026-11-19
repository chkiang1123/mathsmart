export interface MathSegment {
  type: 'text' | 'math';
  value: string;
}

const PROSE_WORDS = new Set([
  'a', 'an', 'and', 'any', 'are', 'area', 'as', 'at', 'axis', 'be', 'because', 'between',
  'both', 'branches', 'but', 'by', 'can', 'cannot', 'check', 'claim', 'compare', 'complete',
  'completing', 'constant', 'constants', 'coordinates', 'corresponding', 'cross', 'crosses',
  'cup', 'cups', 'curve', 'curves', 'cuts', 'daily', 'decimal', 'dependent', 'determine',
  'differs', 'direction', 'disagree', 'agree', 'discriminant', 'distinct', 'divide', 'does',
  'domain', 'double', 'downwards', 'each', 'either', 'else', 'enclosed', 'equal', 'equation',
  'equations', 'evaluate', 'every', 'exact', 'exactly', 'example', 'expand', 'express',
  'expression', 'factor', 'factorize', 'fails', 'fence', 'figure', 'find', 'first', 'for',
  'form', 'formula', 'fourth', 'from', 'function', 'functions', 'garden', 'gardens', 'given',
  'go', 'graph', 'graphs', 'grassland', 'greater', 'has', 'have', 'height', 'hence', 'hits',
  'horizontal', 'how', 'if', 'in', 'independent', 'inequality', 'integer', 'integral',
  'intercept', 'intercepts', 'intersects', 'into', 'is', 'it', 'its', 'largest', 'left',
  'length', 'less', 'let', 'line', 'linear', 'lies', 'max', 'maximum', 'means', 'meets',
  'method', 'min', 'minimum', 'more', 'most', 'multiply', 'near', 'negative', 'new', 'no',
  'non', 'not', 'number', 'numbers', 'numerator', 'denominator', 'occurs', 'of', 'on', 'one',
  'only', 'open', 'opens', 'option', 'or', 'original', 'other', 'otherwise', 'outside', 'over',
  'parabola', 'parallel', 'part', 'passes', 'perimeter', 'perpendicular', 'places', 'plot',
  'point', 'points', 'positive', 'possible', 'product', 'profit', 'quadratic', 'range', 'real',
  'rectangle', 'rectangular', 'regions', 'relation', 'replace', 'respectively', 'right',
  'river', 'road', 'root', 'roots', 'same', 'satisfies', 'satisfy', 'second', 'see', 'segment',
  'segments', 'shaded', 'share', 'shows', 'side', 'sides', 'simplify', 'since', 'sketch',
  'slope', 'smaller', 'smallest', 'so', 'sold', 'solution', 'solutions', 'solve', 'square',
  'squares', 'squaring', 'statement', 'stone', 'straight', 'string', 'substitute',
  'substitution', 'subtract', 'subtracting', 'such', 'sum', 'symmetric', 'symmetry', 'table',
  'tangent', 'terms', 'than', 'that', 'the', 'their', 'then', 'there', 'therefore', 'these',
  'they', 'third', 'this', 'three', 'through', 'thrown', 'time', 'to', 'total', 'touches',
  'trapezium', 'triangle', 'true', 'two', 'undefined', 'unequal', 'unique', 'unit', 'units',
  'unknown', 'unknowns', 'up', 'upper', 'upwards', 'using', 'valid', 'value', 'values',
  'variable', 'variables', 'verify', 'vertex', 'vertical', 'via', 'when', 'where', 'whether',
  'which', 'while', 'width', 'wire', 'with', 'without', 'yields', 'yes', 'zero',
  // Common abbreviations & labels in textbook
  'max.', 'min.', 'e.g.', 'i.e.', 'fig.', 'km', 'cm', 'mm', 'kg', 'hr', 'hrs', 'sec',
  'hkdse', 'hkcee', 'hk', 'q1', 'q2', 'q3',
]);

function replaceUnicodeSuperscripts(s: string): string {
  const map: Record<string, string> = {
    '⁰': '0',
    '¹': '1',
    '²': '2',
    '³': '3',
    '⁴': '4',
    '⁵': '5',
    '⁶': '6',
    '⁷': '7',
    '⁸': '8',
    '⁹': '9',
    '⁻': '-',
    'ⁿ': 'n',
  };
  return s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻ⁿ]+/g, (seq) => {
    const mapped = seq
      .split('')
      .map((ch) => map[ch] ?? ch)
      .join('');
    return `^{${mapped}}`;
  });
}

function replaceUnicodeSubscripts(s: string): string {
  const map: Record<string, string> = {
    '₀': '0',
    '₁': '1',
    '₂': '2',
    '₃': '3',
    '₄': '4',
    '₅': '5',
    '₆': '6',
    '₇': '7',
    '₈': '8',
    '₉': '9',
  };
  return s.replace(/[₀₁₂₃₄₅₆₇₈₉]+/g, (seq) => {
    const mapped = seq
      .split('')
      .map((ch) => map[ch] ?? ch)
      .join('');
    return `_{${mapped}}`;
  });
}

function replaceSquareRoots(s: string): string {
  let out = '';
  let i = 0;
  while (i < s.length) {
    if (s[i] === '√') {
      i++;
      while (i < s.length && s[i] === ' ') i++;
      if (s[i] === '(') {
        let depth = 1;
        let j = i + 1;
        while (j < s.length && depth > 0) {
          if (s[j] === '(') depth++;
          else if (s[j] === ')') depth--;
          j++;
        }
        const inner = s.slice(i + 1, j - 1);
        out += `\\sqrt{${inner}}`;
        i = j;
      } else {
        const rest = s.slice(i);
        const m = rest.match(/^[a-zA-Z0-9]+(?:\^\{[^}]+\})?/);
        if (m) {
          out += `\\sqrt{${m[0]}}`;
          i += m[0].length;
        } else {
          out += '\\sqrt{}';
        }
      }
    } else {
      out += s[i];
      i++;
    }
  }
  return out;
}

function stripOuterParens(expr: string): string {
  const t = expr.trim();
  if (!t.startsWith('(') || !t.endsWith(')')) return t;
  let depth = 0;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === '(') depth++;
    else if (t[i] === ')') {
      depth--;
      if (depth === 0 && i < t.length - 1) return t;
    }
  }
  return t.slice(1, -1).trim();
}

function extractOperandLeft(s: string, slashIdx: number): { start: number; text: string } {
  let end = slashIdx;
  while (end > 0 && s[end - 1] === ' ') end--;
  if (end === 0) return { start: 0, text: '' };

  let i = end - 1;
  // Walk backwards across exponents like ^{2}
  const collectBackAtom = (): number => {
    let cur = i;
    if (cur < 0) return 0;
    if (s[cur] === '}') {
      let d = 1;
      cur--;
      while (cur >= 0 && d > 0) {
        if (s[cur] === '}') d++;
        else if (s[cur] === '{') d--;
        cur--;
      }
      if (cur >= 0 && s[cur] === '^') cur--;
    }
    if (cur >= 0 && s[cur] === ')') {
      let d = 1;
      cur--;
      while (cur >= 0 && d > 0) {
        if (s[cur] === ')') d++;
        else if (s[cur] === '(') d--;
        cur--;
      }
      // Include optional function name or \sqrt before (
      while (cur >= 0 && /[a-zA-Z0-9\\]/.test(s[cur])) cur--;
      return cur + 1;
    }
    while (cur >= 0 && /[a-zA-Z0-9.\\^{}_]/.test(s[cur])) {
      cur--;
    }
    // Attach leading unary minus only if preceded by operator, start, or '(' or ','
    if (cur >= 0 && s[cur] === '-') {
      const prevNonSpace = s.slice(0, cur).trimEnd().slice(-1);
      if (!prevNonSpace || '=(,[<>±+'.includes(prevNonSpace)) {
        cur--;
      }
    }
    return cur + 1;
  };

  const start = collectBackAtom();
  // Wait: if there's an exponent right before slash like (x-1)^2 / 4, the loop above collected '^' inside atom
  // Also handle chained factors like 2x or 3(x+1) if directly adjacent without spaces
  let adjustedStart = start;
  while (adjustedStart > 0 && /[0-9a-zA-Z]/.test(s[adjustedStart - 1])) {
    adjustedStart--;
  }
  return { start: adjustedStart, text: s.slice(adjustedStart, end) };
}

function extractOperandRight(s: string, slashIdx: number): { end: number; text: string } {
  let start = slashIdx + 1;
  while (start < s.length && s[start] === ' ') start++;
  if (start >= s.length) return { end: start, text: '' };

  let cur = start;
  if (s[cur] === '-') cur++;

  if (s[cur] === '(') {
    let d = 1;
    cur++;
    while (cur < s.length && d > 0) {
      if (s[cur] === '(') d++;
      else if (s[cur] === ')') d--;
      cur++;
    }
  } else if (s.slice(cur).startsWith('\\sqrt{')) {
    cur += 6;
    let d = 1;
    while (cur < s.length && d > 0) {
      if (s[cur] === '{') d++;
      else if (s[cur] === '}') d--;
      cur++;
    }
  } else {
    while (cur < s.length && /[a-zA-Z0-9.\\^{}_]/.test(s[cur])) {
      if (s[cur] === '{') {
        let d = 1;
        cur++;
        while (cur < s.length && d > 0) {
          if (s[cur] === '{') d++;
          else if (s[cur] === '}') d--;
          cur++;
        }
      } else {
        cur++;
      }
    }
  }
  // Trailing exponent like (x - 3)^{2}
  if (s.slice(cur).startsWith('^{')) {
    cur += 2;
    let d = 1;
    while (cur < s.length && d > 0) {
      if (s[cur] === '{') d++;
      else if (s[cur] === '}') d--;
      cur++;
    }
  }
  return { end: cur, text: s.slice(start, cur) };
}

function convertSlashesToFrac(s: string): string {
  let out = s;
  let guard = 0;
  let searchFrom = 0;
  while (guard++ < 16) {
    const idx = out.indexOf('/', searchFrom);
    if (idx === -1) break;
    // Skip unit rates like /m², /cm², /cup, /s, /hr, or prose slashes like max/min, and/or
    const after = out.slice(idx + 1).trimStart();
    if (/^(cm|mm|km|m|s|hr|cup|min|max|or|and)\b/i.test(after)) {
      searchFrom = idx + 1;
      continue;
    }
    const left = extractOperandLeft(out, idx);
    const right = extractOperandRight(out, idx);
    if (!left.text || !right.text) {
      searchFrom = idx + 1;
      continue;
    }
    const num = stripOuterParens(left.text);
    const den = stripOuterParens(right.text);
    const replacement = `\\frac{${num}}{${den}}`;
    out = out.slice(0, left.start) + replacement + out.slice(right.end);
    searchFrom = left.start + replacement.length;
  }
  return out;
}

export function mathToLatex(raw: string): string {
  let s = raw.trim();
  // Escape currency $ signs (e.g. $1566, $(expr))
  s = s.replace(/(?<!\\)\$/g, '\\$');
  s = replaceUnicodeSuperscripts(s);
  s = replaceUnicodeSubscripts(s);
  s = replaceSquareRoots(s);
  s = s.replace(/⇒/g, ' \\Rightarrow ');
  s = s.replace(/⇔/g, ' \\Leftrightarrow ');
  s = s.replace(/∴/g, ' \\therefore ');
  s = s.replace(/→/g, ' \\to ');
  s = s.replace(/≥/g, ' \\ge ');
  s = s.replace(/≤/g, ' \\le ');
  s = s.replace(/≠/g, ' \\ne ');
  s = s.replace(/≈/g, ' \\approx ');
  s = s.replace(/±/g, ' \\pm ');
  s = s.replace(/×/g, ' \\times ');
  s = s.replace(/÷/g, ' \\div ');
  s = s.replace(/·/g, ' \\cdot ');
  s = s.replace(/Δ/g, '\\Delta ');
  s = s.replace(/α/g, '\\alpha ');
  s = s.replace(/β/g, '\\beta ');
  s = s.replace(/θ/g, '\\theta ');
  s = s.replace(/Γ/g, '\\Gamma ');
  s = s.replace(/△/g, '\\triangle ');
  s = s.replace(/∠/g, '\\angle ');
  s = s.replace(/⊥/g, ' \\perp ');
  s = s.replace(/°/g, '^{\\circ}');
  s = s.replace(/%/g, '\\%');
  // Convert ^(...) or ^-1 etc
  s = s.replace(/\^\(([^)]+)\)/g, '^{$1}');
  s = s.replace(/\^(-?[a-zA-Z0-9]+)/g, '^{$1}');
  s = convertSlashesToFrac(s);
  // Format units cleanly after fraction conversion
  s = s.replace(/(\d|\})\s*(cm|mm|km|m|s)\^\{([23])\}/g, '$1\\,\\text{$2}^{$3}');
  s = s.replace(/\b(cm|mm|km|m)\^\{([23])\}/g, '\\text{$1}^{$2}');
  return s.replace(/\s{2,}/g, ' ').trim();
}

function isPureMathToken(token: string): boolean {
  if (!token) return false;
  if (/[²³⁵⁶⁻⁰¹⁴⁷⁸⁹₀₁₂₃₄₅₆₇₈₉√⇒⇔∴→≥≤≠≈±×÷·ΔαβθΓ△∠⊥°^]/.test(token)) return true;
  if (/^[=<>+\-*/(),[\]{}|]+$/.test(token)) return true;
  // Function calls like f(x), g(2), f(a+b), h(t)
  if (/^[a-zA-Z]\([^)]+\)$/.test(token)) return true;
  // Fractions like -16/11 or 2x/3 or (x-1)/(x+2)
  if (/^[+-]?[0-9a-zA-Z()²³]+\/[+-]?[0-9a-zA-Z()²³]+$/.test(token)) return true;
  // Coordinates like (-2, 3) or single variable/algebraic term like 2x, -3x, ax, kx, x, y, a, b, c, h, k, m, n, t
  if (/^[+-]?\d*[a-zA-Z](\d+)?$/.test(token)) {
    const lower = token.toLowerCase();
    if (PROSE_WORDS.has(lower)) return false;
    // Only single-letter or digit+letter algebra terms (avoid English words like "In", "At", "Or", "If", "No", "To", "Is", "It")
    if (/^[+-]?\d+[a-zA-Z]+$/.test(token)) return true;
    if (/^[a-zA-Z]$/.test(token) && token !== 'a' && token !== 'I' && token !== 'A') return true;
    if (/^[a-zA-Z]$/.test(token) && (token === 'a')) return false;
    return false;
  }
  // Uppercase geometric labels like ABC, DBEF, APQ, PQ, AB, BC, AC, DF, DB, PC, DQ, RA
  if (/^[A-Z]{2,4}$/.test(token) && !PROSE_WORDS.has(token.toLowerCase())) return true;
  return false;
}

/**
 * Splits a textbook string (which may be a pure math equation or English prose mixed with math)
 * into clean text and LaTeX math segments. Also respects explicit $...$ or $$...$$ delimiters.
 */
export function tokenizeLatexSegments(input: string): MathSegment[] {
  if (!input) return [];

  // Respect explicit $...$ if already authored as LaTeX (ignore currency like $150)
  if (/\$(?!\d)[^$]+\$/.test(input)) {
    const out: MathSegment[] = [];
    const regex = /\$\$([^$]+)\$\$|\$(?!\d)([^$]+)\$/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(input)) !== null) {
      if (m.index > last) {
        out.push({ type: 'text', value: input.slice(last, m.index) });
      }
      out.push({ type: 'math', value: (m[1] ?? m[2]).trim() });
      last = regex.lastIndex;
    }
    if (last < input.length) {
      out.push({ type: 'text', value: input.slice(last) });
    }
    return out;
  }

  // Split by whitespace while preserving punctuation boundaries gently
  // Group contiguous math tokens (including numbers, operators, variables, parens, commas inside coords)
  const rawWords = input.split(/(\s+)/);
  const segments: MathSegment[] = [];
  let mathBuf: string[] = [];
  let textBuf: string[] = [];

  const flushText = () => {
    if (textBuf.length > 0) {
      segments.push({ type: 'text', value: textBuf.join('') });
      textBuf = [];
    }
  };

  const flushMath = () => {
    if (mathBuf.length > 0) {
      let joined = mathBuf.join('').trim();
      // Preserve trailing sentence punctuation outside LaTeX unless part of coordinate
      let trailing = '';
      if (/[.;:?!]$/.test(joined)) {
        trailing = joined.slice(-1);
        joined = joined.slice(0, -1).trim();
      } else if (/,$/.test(joined) && !joined.startsWith('(')) {
        trailing = ',';
        joined = joined.slice(0, -1).trim();
      }
      if (joined) {
        segments.push({ type: 'math', value: mathToLatex(joined) });
      }
      if (trailing) {
        segments.push({ type: 'text', value: trailing + ' ' });
      }
      mathBuf = [];
    }
  };

  // Pre-scan: check if token is a pure number, math connector, or split paren math opener like "(x", "(4", "a(x", "3(x"
  const isSplitParenMath = (tok: string): boolean => {
    const clean = tok.replace(/[.,;:?!]+$/, '');
    if (/^\([a-z]{1,3}\)$/i.test(clean)) return false;
    if (/^(?:[+-]?\d+(?:\.\d+)?[a-zA-Z]?|[a-zA-Z])?\(-?[0-9a-zA-Z](?:[+\-*/^²³0-9a-zA-Z.]*)?$/.test(clean)) {
      const inner = clean.replace(/^(?:[+-]?\d+(?:\.\d+)?[a-zA-Z]?|[a-zA-Z])?\(/, '').toLowerCase();
      if (PROSE_WORDS.has(inner) && inner.length > 1) return false;
      return inner.length <= 3 || /\d|[+\-*/^²³]/.test(inner);
    }
    return false;
  };

  const isMathContinuation = (tok: string): boolean => {
    const clean = tok.replace(/[.,;:?!]+$/, '');
    if (!clean) return false;
    if (isSplitParenMath(clean)) return true;
    if (/^[=<>+\-*/×÷·±≥≤≠≈⇒⇔∴→]$/.test(clean)) return true;
    if (/^[+-]?\d+(?:\.\d+)?%?$/.test(clean)) return true;
    if (/^\(?[+-]?\d+(?:\.\d+)?(?:\/\d+)?,?$/.test(clean)) return true;
    if (/^[+-]?\d+(?:\.\d+)?\)?$/.test(clean)) return true;
    if (/^\([a-zA-Z0-9.+\-*/²³,\s]+\)$/.test(clean) && !PROSE_WORDS.has(clean.slice(1, -1).toLowerCase())) {
      return true;
    }
    if (/^[a-zA-Z0-9.+*/²³]+\)+[²³]?$/.test(clean)) return true;
    // Single letter 'a' inside equation e.g. "a = 1" or "f(a)"
    if (/^[a-zA-Z]$/.test(clean) && !['I', 'A'].includes(clean)) {
      return true;
    }
    return isPureMathToken(clean);
  };

  for (let i = 0; i < rawWords.length; i++) {
    const part = rawWords[i];
    if (!part) continue;
    if (/^\s+$/.test(part)) {
      if (mathBuf.length > 0) {
        const nextTok = rawWords[i + 1] ?? '';
        const nextClean = nextTok.replace(/[.,;:?!]+$/, '');
        if (
          nextClean &&
          !PROSE_WORDS.has(nextClean.toLowerCase()) &&
          (isPureMathToken(nextClean) ||
            isSplitParenMath(nextClean) ||
            (isMathContinuation(nextTok) &&
              (/[=<>+\-*/×÷·±≥≤≠≈⇒⇔∴→,(]$/.test(mathBuf.join('').trim()) ||
                /^[=<>+\-*/×÷·±≥≤≠≈⇒⇔∴→)]/.test(nextClean) ||
                (/^\(?-?\d/.test(nextClean) && mathBuf.join('').trim().endsWith(',')))))
        ) {
          mathBuf.push(part);
        } else {
          flushMath();
          textBuf.push(part);
        }
      } else {
        textBuf.push(part);
      }
      continue;
    }

    const clean = part.replace(/[.,;:?!]+$/, '');
    const trailingPunct = part.slice(clean.length);
    const lowerClean = clean.toLowerCase();

    // Special case: "x-axis", "y-axis", "x-intercept", "y-intercept", "x-coordinate"
    if (/^[xy]-(axis|intercepts?|coordinates?)$/i.test(clean)) {
      const [varChar, rest] = clean.split('-');
      flushMath();
      flushText();
      segments.push({ type: 'math', value: varChar });
      segments.push({ type: 'text', value: `-${rest}${trailingPunct}` });
      continue;
    }

    // Special case: single letter 'a' before '=' or '+' or '-' or '·' or '('
    const nextNonSpace = rawWords[i + 2] ?? '';
    const isSingleAInMath =
      clean === 'a' && /^[=<>+\-*/·×(]/.test(nextNonSpace.replace(/[.,;:?!]+$/, ''));

    // Special case: coordinate pair split on space like "(-2," followed by "3)"
    const isCoordStart = /^\(-?\d+(?:\.\d+)?(?:\/\d+)?,$/.test(part);
    const isCoordEnd =
      mathBuf.length > 0 &&
      mathBuf.join('').trim().endsWith(',') &&
      /^-?\d+(?:\.\d+)?(?:\/\d+)?\)[.,;:?!]*$/.test(part);

    // Special case: units after a number inside mathBuf like "112.5" followed by "m²" or "cm²" or "m"
    if (mathBuf.length > 0 && /^(cm|mm|km|m|s)[²³]?[.,;:?!]*$/.test(part)) {
      const formattedUnit = clean.replace(/([a-z]+)([²³])?/, (_, u, exp) =>
        exp ? `\\,\\text{${u}}${exp === '²' ? '^{2}' : '^{3}'}` : `\\,\\text{${u}}`
      );
      mathBuf.push(' ' + formattedUnit);
      if (trailingPunct) {
        flushMath();
        textBuf.push(trailingPunct);
      }
      continue;
    }

    const isProse = PROSE_WORDS.has(lowerClean) && !isSingleAInMath;
    const isBareEnglishParen = /^\([a-z]{1,3}\)$/.test(clean) && !/^\([xy]\)$/.test(clean);

    const pushCleanAndMaybeFlushPunct = () => {
      flushText();
      if (isCoordStart) {
        mathBuf.push(part);
      } else {
        mathBuf.push(clean);
        if (trailingPunct) {
          flushMath();
          textBuf.push(trailingPunct);
        }
      }
    };

    if (
      !isProse &&
      !isBareEnglishParen &&
      (isPureMathToken(clean) ||
        isSplitParenMath(clean) ||
        isSingleAInMath ||
        isCoordStart ||
        isCoordEnd ||
        (mathBuf.length > 0 && isMathContinuation(part)))
    ) {
      pushCleanAndMaybeFlushPunct();
    } else if (/^\$?\d+(?:\.\d+)?[.,;:?!]*$/.test(part) && (mathBuf.length > 0 || /^[=<>+\-*/]/.test(nextNonSpace))) {
      pushCleanAndMaybeFlushPunct();
    } else if (/^[a-zA-Z0-9()²³]+\/[a-zA-Z0-9()²³]+$/.test(clean) && !/^(max|min|and|or|true|false)\//i.test(clean)) {
      pushCleanAndMaybeFlushPunct();
    } else {
      flushMath();
      textBuf.push(part);
    }
  }

  flushMath();
  flushText();

  return segments;
}
