import { LocationType, Region } from '@/types/location_type';

export const LOCATION_TYPES: { value: LocationType; label: string }[] = [
    { value: 'beach', label: 'Пляж' },
    { value: 'mountains', label: 'Гори' },
    { value: 'lake', label: 'Озеро' },
    { value: 'park', label: 'Парк' },
];



export const REGIONS: { value: Region; label: string }[] = [
    { value: 'vinnytsia', label: 'Вінницька область' },
    { value: 'volyn', label: 'Волинська область' },
    { value: 'dnipropetrovsk', label: 'Дніпропетровська область' },
    { value: 'donetsk', label: 'Донецька область' },
    { value: 'zhytomyr', label: 'Житомирська область' },
    { value: 'zakarpattia', label: 'Закарпатська область' },
    { value: 'zaporizhzhia', label: 'Запорізька область' },
    { value: 'ivano-frankivsk', label: 'Івано-Франківська область' },
    { value: 'kyiv', label: 'Київська область' },
    { value: 'kirovohrad', label: 'Кіровоградська область' },
    { value: 'luhansk', label: 'Луганська область' },
    { value: 'lviv', label: 'Львівська область' },
    { value: 'mykolaiv', label: 'Миколаївська область' },
    { value: 'odesa', label: 'Одеська область' },
    { value: 'poltava', label: 'Полтавська область' },
    { value: 'rivne', label: 'Рівненська область' },
    { value: 'sumy', label: 'Сумська область' },
    { value: 'ternopil', label: 'Тернопільська область' },
    { value: 'kharkiv', label: 'Харківська область' },
    { value: 'kherson', label: 'Херсонська область' },
    { value: 'khmelnytskyi', label: 'Хмельницька область' },
    { value: 'cherkasy', label: 'Черкаська область' },
    { value: 'chernivtsi', label: 'Чернівецька область' },
    { value: 'chernihiv', label: 'Чернігівська область' },
    { value: 'crimea', label: 'АР Крим' }, // опціонально
];