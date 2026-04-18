import { IEntity } from "@interfaces/entity.interface";

export const SERVICE_PRODUCTS: IEntity<IEntity[]>[] = [
  {
    title: 'Ремонт стиральных машин всех моделей',
    icon: {
      title: 'Стиральные машины',
      link: 'icon_washing_machine'
    },
    route: 'washing-machine',
    content: [
      { 
        title: 'Фронтальные',
        description: 'Прозрачное окно-дверца для загрузки белья',
        icon: 'icon_front_load'
      },
      { 
        title: 'Вертигальные',
        description: 'Стиральные машины с загрузкой белья сверху',
        icon: 'icon_top_load'
      },
      { 
        title: 'Встраиваемые',
        description: 'Конструкция предполагает наличие дополнительных крепежей',
        icon: 'icon_built_in'
      }
    ]
  },
  {
    title: 'Ремонт посудомоечных машин',
    icon: {
      title: 'Посудомоечные машины',
      link: 'icon_dishwasher'
    },
  },
  {
    title: 'Ремонт сушильных машин',
    icon: {
      title: 'Сушильные машины',
      link: 'icon_dryer'
    },
  },
  {
    title: 'Ремонт электрических кухонных плит',
    icon: {
      title: 'Электрические кухонные плиты',
      link: 'icon_stove'
    },
  },
  {
    title: 'Ремонт духовок',
    icon: {
      title: 'Духовки',
      link: 'icon_oven'
    },
  },
  {
    title: 'Ремонт холодильников',
    icon: {
      title: 'Холодильники',
      link: 'icon_refrigerator'
    },
  }
];
