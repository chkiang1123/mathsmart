export interface StatementSubItem {
  marker: string;
  text: string;
  nested?: StatementSubItem[];
}

export interface FormattedStatement {
  intro: string;
  items: StatementSubItem[];
}

interface PartLike {
  label: string;
  prompt: string;
}

const TOP_PART_RE = /(?:^|(?<=[\s.:;,]))\(([a-e])\)\s+/g;
const ROMAN_SUBPART_RE = /(?:^|(?<=[\s.:;,]))\((i{1,3}|iv)\)\s+/g;
const ROMAN_STMT_RE = /(?:^|(?<=[\s?]))(I{1,3})\.\s+/g;

function cleanTrailingSeparator(text: string, isLast: boolean): string {
  let trimmed = text.trim();
  if (!isLast) {
    trimmed = trimmed.replace(/(?:[,;]?\s+\band|\s*[,;])$/, '').trim();
  }
  return trimmed;
}

function splitRomanSubparts(text: string): { lead: string; nested: StatementSubItem[] } {
  const matches = Array.from(text.matchAll(ROMAN_SUBPART_RE));
  if (matches.length < 2) {
    return { lead: text.trim(), nested: [] };
  }

  const firstIdx = matches[0].index ?? 0;
  let lead = text.slice(0, firstIdx).trim();
  if (lead && !/[.:?]$/.test(lead)) {
    lead = `${lead}:`;
  }

  const nested: StatementSubItem[] = matches.map((m, idx) => {
    const start = (m.index ?? 0) + m[0].length;
    const end = idx + 1 < matches.length ? (matches[idx + 1].index ?? text.length) : text.length;
    return {
      marker: `(${m[1]})`,
      text: cleanTrailingSeparator(text.slice(start, end), idx === matches.length - 1),
    };
  });

  return { lead, nested };
}

function splitRomanStatements(text: string): FormattedStatement | null {
  const matches = Array.from(text.matchAll(ROMAN_STMT_RE));
  if (matches.length < 2) return null;

  const firstIdx = matches[0].index ?? 0;
  const intro = text.slice(0, firstIdx).trim();
  const items: StatementSubItem[] = matches.map((m, idx) => {
    const start = (m.index ?? 0) + m[0].length;
    const end = idx + 1 < matches.length ? (matches[idx + 1].index ?? text.length) : text.length;
    return {
      marker: `${m[1]}.`,
      text: text.slice(start, end).trim(),
    };
  });

  return { intro, items };
}

export function formatQuestionStatement(
  statement: string,
  parts?: PartLike[]
): FormattedStatement {
  const trimmedStmt = statement.trim();
  const topMatches = Array.from(trimmedStmt.matchAll(TOP_PART_RE));

  if (topMatches.length >= 2) {
    const firstIdx = topMatches[0].index ?? 0;
    let intro = trimmedStmt.slice(0, firstIdx).trim();
    if (intro && !/[.:?]$/.test(intro)) {
      intro = `${intro}:`;
    }

    const items: StatementSubItem[] = topMatches.map((m, idx) => {
      const start = (m.index ?? 0) + m[0].length;
      const end =
        idx + 1 < topMatches.length
          ? (topMatches[idx + 1].index ?? trimmedStmt.length)
          : trimmedStmt.length;
      const rawBody = cleanTrailingSeparator(
        trimmedStmt.slice(start, end),
        idx === topMatches.length - 1
      );
      const { lead, nested } = splitRomanSubparts(rawBody);
      return nested.length >= 2
        ? { marker: `(${m[1]})`, text: lead, nested }
        : { marker: `(${m[1]})`, text: rawBody };
    });

    return { intro, items };
  }

  // Check if parts array holds explicit lettered subparts not present in statement
  if (parts && parts.length > 1) {
    const labeledParts = parts.filter((p) => /^\([a-e]\)/i.test(p.label.trim()) && p.prompt.trim());
    if (labeledParts.length >= 2) {
      const items: StatementSubItem[] = labeledParts.map((p) => {
        const { lead, nested } = splitRomanSubparts(p.prompt);
        return nested.length >= 2
          ? { marker: p.label.trim(), text: lead, nested }
          : { marker: p.label.trim(), text: p.prompt.trim() };
      });
      return { intro: trimmedStmt, items };
    }
  }

  // Check for Roman statement lists I. ... II. ... III. ...
  const romanList = splitRomanStatements(trimmedStmt);
  if (romanList) {
    return romanList;
  }

  // Check for inline (i) ... (ii) ... in single-part statement
  const { lead, nested } = splitRomanSubparts(trimmedStmt);
  if (nested.length >= 2) {
    return { intro: lead, items: nested };
  }

  return { intro: trimmedStmt, items: [] };
}
