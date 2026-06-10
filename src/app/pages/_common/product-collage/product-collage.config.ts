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
    },
    route: 'washing-machine',
    content: [
      { 
        title: 'Фронтальные',
        description: 'Прозрачное окно-дверца для загрузки белья',
        icon: {
          character: 'a'
        }
      },
      { 
        title: 'Вертикальные',
        description: 'Стиральные машины с загрузкой белья сверху',
        icon: {
          character: 'b'
        }
      },
      { 
        title: 'Встраиваемые',
        description: 'Конструкция предполагает наличие дополнительных крепежей',
        icon: {
          character: 'c'
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
