import React, { useMemo } from 'react';
import katex from 'katex';
import { mathToLatex, tokenizeLatexSegments } from '../utils/latexFormatter';

interface MathTextProps {
  text: string;
  className?: string;
  mode?: 'auto' | 'math';
  displayMode?: boolean;
}

export const MathText: React.FC<MathTextProps> = ({
  text,
  className = '',
  mode = 'auto',
  displayMode = false,
}) => {
  const renderedParts = useMemo(() => {
    if (mode === 'math') {
      const latex = mathToLatex(text);
      const html = katex.renderToString(latex, {
        throwOnError: false,
        strict: false,
        displayMode,
      });
      return [{ type: 'math' as const, html }];
    }

    const segs = tokenizeLatexSegments(text);
    return segs.map((seg) => {
      if (seg.type === 'text') {
        return { type: 'text' as const, value: seg.value };
      }
      const html = katex.renderToString(seg.value, {
        throwOnError: false,
        strict: false,
        displayMode: false,
      });
      return { type: 'math' as const, html };
    });
  }, [text, mode, displayMode]);

  return (
    <span className={`whitespace-pre-line ${className}`}>
      {renderedParts.map((part, idx) =>
        part.type === 'text' ? (
          <React.Fragment key={idx}>{part.value}</React.Fragment>
        ) : (
          <span
            key={idx}
            className="inline-block align-baseline"
            dangerouslySetInnerHTML={{ __html: part.html }}
          />
        )
      )}
    </span>
  );
};
