import { IEntity } from "@interfaces/entity.interface";

export const WHAT_WE_DO: IEntity[] = [
  {
    title: 'Стиральные машины',
    icon: {
      title: 'Стиральные машины',
      link: 'icon_washing_machine'
    },
    route: 'washing-machine'
  },
  {
    title: 'Посудомоечные машины',
    icon: {
      title: 'Посудомоечные машины',
      link: 'icon_dishwasher'
    },
  },
  {
    title: 'Сушильные машины',
    icon: {
      title: 'Сушильные машины',
      link: 'icon_dryer'
    },
  },
  {
    title: 'Электрические кухонные плиты',
    icon: {
      title: 'Электрические кухонные плиты',
      link: 'icon_stove'
    },
  },
  {
    title: 'Духовки',
    icon: {
      title: 'Духовки',
      link: 'icon_oven'
    },
  },
  {
    title: 'Холодильники',
    icon: {
      title: 'Холодильники',
      link: 'icon_refrigerator'
    },
  }
];
