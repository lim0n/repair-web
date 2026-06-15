import { IEntity } from "@interfaces/entity.interface";
import { IOrderBanner } from "@interfaces/order-banner.interface";

export const SERVICE_PRODUCTS: IOrderBanner<IEntity[]>[] = [
  {
    title: 'Стиральные машины',
    longTitle: 'Ремонт стиральных машин всех моделей',
    orderName: 'Заявка на ремонт стиральной машины',
    icon: {
      title: 'Стиральные машины',
      character: '1',
      link: 'washing_machine',
      src: '/images/washing-machine.svg'
    },
    route: 'washing-machine',
    content: [
      { 
        title: 'Фронтальные',
        description: 'Прозрачное окно-дверца для загрузки белья',
        icon: {
          character: 'a',
          src: '/images/front-load.svg',
          link: 'icon_top_load'
        }
      },
      { 
        title: 'Вертикальные',
        description: 'Стиральные машины с загрузкой белья сверху',
        icon: {
          character: 'b',
          src: '/images/top-load.svg',
          link: 'icon_front_load'
        }
      },
      { 
        title: 'Встраиваемые',
        description: 'Конструкция предполагает наличие дополнительных крепежей',
        icon: {
          character: 'c',
          src: '/images/expand.svg',
          link: 'icon_built_in'
        }
      }
    ]
  },
  {
    title: 'Посудомоечные машины',
    longTitle: 'Ремонт посудомоечных машин',
    orderName: 'Заявка на ремонт посудомоечных машин',
    icon: {
      title: 'Посудомоечные машины',
      character: '2',
      link: 'dishwasher',
      src: '/images/dishwasher.svg'
    },
    route: 'dishwasher',
    content: [
      { 
        title: 'Промышленные',
      },
      { 
        title: 'Бытовые',
      },
      { 
        title: 'Обслуживание',
      },
      { 
        title: 'Диагностика',
      },
      {
        title: 'Ремонт'
      },
    ]
  },
  {
    title: 'Сушильные машины',
    longTitle: 'Ремонт сушильных машин',
    orderName: 'Заявка на ремонт сушильных машин',
    icon: {
      title: 'Сушильные машины',
      character: '3',
      link: 'dryer',
      src: '/images/dryer.svg'
    },
    route: 'dryer',
    content: [
      { 
        title: 'Обслуживание',
      },
      { 
        title: 'Диагностика',
      },
      {
        title: 'Ремонт'
      },
    ]
  },
  {
    title: 'Электрические кухонные плиты',
    longTitle: 'Ремонт электрических кухонных плит',
    orderName: 'Заявка на ремонт электрических кухонных плит',
    icon: {
      title: 'Электрические кухонные плиты',
      character: '4',
      link: 'stove',
      src: '/images/stove.svg'
    },
    route: 'stove',
    content: [
      { 
        title: 'Обслуживание',
      },
      { 
        title: 'Диагностика',
      },
      {
        title: 'Ремонт'
      },
    ]
  },
  {
    title: 'Духовки',
    longTitle: 'Ремонт духовок',
    orderName: 'Заявка на ремонт духовок',
    icon: {
      title: 'Духовки',
      character: '5',
      link: 'oven',
      src: '/images/oven.svg'
    },
    route: 'oven',
    content: [
      { 
        title: 'Обслуживание',
      },
      { 
        title: 'Диагностика',
      },
      {
        title: 'Ремонт'
      },
    ]
  },
  {
    title: 'Холодильники',
    longTitle: 'Ремонт холодильников',
    orderName: 'Заявка на ремонт холодильников',
    icon: {
      title: 'Холодильники',
      character: '6',
      link: 'refrigerator',
      src: '/images/refrigerator.svg'
    },
    route: 'refrigerator',
    content: [
      { 
        title: 'Обслуживание',
      },
      { 
        title: 'Диагностика',
      },
      {
        title: 'Ремонт'
      },
    ]
  }
];
