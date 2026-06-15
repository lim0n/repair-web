import { IEntity } from "@interfaces/entity.interface";

export const WHAT_WE_DO: IEntity[] = [
  {
    title: 'Стиральные машины',
    icon: {
      title: 'Стиральные машины',
      // character: '1',
      link: 'icon_washing_machine'
    },
    route: 'washing-machine'
  },
  {
    title: 'Посудомоечные машины',
    icon: {
      title: 'Посудомоечные машины',
      // character: '2',
      link: 'icon_dishwasher'
    },
  },
  {
    title: 'Сушильные машины',
    icon: {
      title: 'Сушильные машины',
      // character: '3',
      link: 'icon_dryer'
    },
  },
  {
    title: 'Электрические кухонные плиты',
    icon: {
      title: 'Электрические кухонные плиты',
      // character: '4',
      link: 'icon_stove'
    },
  },
  {
    title: 'Духовки',
    icon: {
      title: 'Духовки',
      // character: '5',
      link: 'icon_oven'
    },
  },
  {
    title: 'Холодильники',
    icon: {
      title: 'Холодильники',
      // character: '6',
      link: 'icon_refrigerator'
    },
  }
];
