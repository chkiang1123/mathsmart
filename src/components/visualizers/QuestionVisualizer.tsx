import React from 'react';
import type { VisualConfig } from '../../types/math';
import { CoordinatePlot } from './CoordinatePlot';
import { VerticalLineTestViz, FunctionMachineViz } from './MappingAndTestViz';
import { CompletingSquareViz, DiscriminantExplorerViz } from './CompletingSquareViz';
import { GeometryLabViz, NumberLineViz } from './GeometryLabViz';

import type { StepProgressState } from '../StepAnalyzer';

interface QuestionVisualizerProps {
  questionId: string;
  visual: VisualConfig;
  stepProgress?: StepProgressState;
}

export const QuestionVisualizer: React.FC<QuestionVisualizerProps> = ({
  questionId,
  visual,
  stepProgress,
}) => {
  switch (visual.kind) {
    case 'coordinate':
      return (
        <CoordinatePlot
          key={questionId}
          title={visual.title}
          curves={visual.curves}
          points={visual.points}
          polygons={visual.polygons}
          circles={visual.circles}
          xRange={visual.xRange}
          yRange={visual.yRange}
          showAxisOfSymmetry={visual.showAxisOfSymmetry}
          showVertex={visual.showVertex}
          showRoots={visual.showRoots}
          note={visual.note}
          interactiveX={visual.interactiveX}
          stepProgress={stepProgress}
        />
      );
    case 'vertical-line-test':
      return <VerticalLineTestViz key={questionId} config={visual} />;
    case 'function-machine':
      return <FunctionMachineViz key={questionId} config={visual} stepProgress={stepProgress} />;
    case 'completing-square':
      return <CompletingSquareViz key={questionId} config={visual} stepProgress={stepProgress} />;
    case 'discriminant-explorer':
      return (
        <DiscriminantExplorerViz key={questionId} config={visual} stepProgress={stepProgress} />
      );
    case 'geometry-lab':
      return <GeometryLabViz key={questionId} config={visual} stepProgress={stepProgress} />;
    case 'number-line':
      return <NumberLineViz key={questionId} config={visual} />;
  }
};
