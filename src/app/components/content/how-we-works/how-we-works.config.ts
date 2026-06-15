import { IEntity } from "@interfaces/entity.interface";

export const HOW_WE_WORKS: IEntity[] = [
  {
    title: 'Бесплатный выезд мастера',
    icon: {
      character: '!',
      link: 'pin'
    }
  },
  {
    title: 'Диагностика и выявление причины поломки',
    icon: { 
      character: '"',
      link: 'search_check'
    }
  },
  {
    title: 'Согласование стоимости запчастей и работ',
    icon: { 
      character: '#',
      link: 'matching'
    }
  },
  {
    title: 'Ремонт, подключение, проверка, акт о проделанных работах',
    icon: { 
      character: '$',
      link: 'work'
    }
  }
];
