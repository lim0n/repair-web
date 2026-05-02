import { IEntity } from "@interfaces/entity.interface";
import { IOrderBanner } from "@interfaces/order-banner.interface";

export const SERVICE_PRODUCTS: IOrderBanner<IEntity[]>[] = [
  {
    title: 'Стиральные машины',
    longTitle: 'Ремонт стиральных машин всех моделей',
    orderName: 'Заявка на ремонт стиральной машины',
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
        title: 'Вертикальные',
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
    title: 'Посудомоечные машины',
    longTitle: 'Ремонт посудомоечных машин',
    icon: {
      title: 'Посудомоечные машины',
      link: 'icon_dishwasher'
    },
  },
  {
    title: 'Сушильные машины',
    longTitle: 'Ремонт сушильных машин',
    icon: {
      title: 'Сушильные машины',
      link: 'icon_dryer'
    },
  },
  {
    title: 'Электрические кухонные плиты',
    longTitle: 'Ремонт электрических кухонных плит',
    icon: {
      title: 'Электрические кухонные плиты',
      link: 'icon_stove'
    },
  },
  {
    title: 'Духовки',
    longTitle: 'Ремонт духовок',
    icon: {
      title: 'Духовки',
      link: 'icon_oven'
    },
  },
  {
    title: 'Холодильники',
    longTitle: 'Ремонт холодильников',
    icon: {
      title: 'Холодильники',
      link: 'icon_refrigerator'
    },
  }
];
