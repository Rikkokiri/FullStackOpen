interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface PartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends PartWithDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends PartWithDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends PartWithDescription {
  kind: 'special';
  requirements: string[];
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
