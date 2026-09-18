export enum InterviewTypes {
  IN_PERSON,
  SKYPE,
  TEAMS,
  PHONE,
  ZOOM,
}

export const InterviewTypesMap: Record<InterviewTypes, string> = {
  [InterviewTypes.IN_PERSON]: 'In Person',
  [InterviewTypes.SKYPE]: 'Skype',
  [InterviewTypes.TEAMS]: 'Teams',
  [InterviewTypes.PHONE]: 'Phone',
  [InterviewTypes.ZOOM]: 'Zoom',
}
