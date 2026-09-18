import {
  IconActivity,
  IconBuildingSkyscraper,
  IconFileCv,
  IconHammer,
  IconPhoneCall,
} from '@tabler/icons-react'

export enum RoutePaths {
  CALLBACK = '/callback',
  HOME = '/',
  COMPANIES = '/companies',
  JOBS = '/jobs',
  INTERVIEWS = '/interviews',
  COVER_LETTERS = '/cover-letters',
  ACTIVITIES = '/activities',
  WILDCARD = '*',
}

const iconSize = '1.2rem'

export const links = [
  {
    path: RoutePaths.COMPANIES,
    id: 'companies',
    icon: <IconBuildingSkyscraper size={iconSize} />,
  },

  {
    path: RoutePaths.JOBS,
    id: 'jobs',
    icon: <IconHammer size={iconSize} />,
  },
  {
    path: RoutePaths.INTERVIEWS,
    id: 'interviews',
    icon: <IconPhoneCall size={iconSize} />,
  },
  {
    path: RoutePaths.COVER_LETTERS,
    id: 'cover letters',
    icon: <IconFileCv size={iconSize} />,
  },
  {
    path: RoutePaths.ACTIVITIES,
    id: 'activities',
    icon: <IconActivity />,
  },
]
