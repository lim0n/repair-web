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
    icon: {
      title: 'Посудомоечные машины',
      character: '2',
    },
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
    title: 'Сушильные машины',
    longTitle: 'Ремонт сушильных машин',
    icon: {
      title: 'Сушильные машины',
      character: '3',
    },
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
    icon: {
      title: 'Электрические кухонные плиты',
      character: '4',
    },
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
    icon: {
      title: 'Духовки',
      character: '5',
    },
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
    icon: {
      title: 'Холодильники',
      character: '6',
    },
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
