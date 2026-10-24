// Mỗi object bên dưới là một tour mẫu dùng chung cho các trang.
const COAST_TOURS = [
  {
    id: 'vinh-hy-reef',
    title: 'Vinh Hy by sea',
    place: 'Vinh Hy Bay, Ninh Thuan',
    region: 'South Central Coast',
    category: 'On the water',
    duration: 'Full day',
    price: 1850000,
    group: 'Small group · up to 8',
    image: 'assets/470640795_1163051318518608_3597147537126791641_n_4-1-1440x750.webp',
    imageAlt: 'Clear blue water folding into a quiet coastal bay',
    gallery: [
      'assets/470640795_1163051318518608_3597147537126791641_n_4-1-1440x750.webp',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1500&q=85',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1500&q=85'
    ],
    summary: 'Take the long way around a quiet bay, with time to swim, snorkel, and linger over lunch on shore.',
    highlights: ['A slow boat ride along the coast', 'Snorkel time in clear water', 'A seafood lunch by the village'],
    itinerary: ['09:00 · Meet at Vinh Hy harbour', '09:30 · Cruise along the bay', '11:00 · Swim and snorkel', '12:30 · Local lunch, then a gentle return'],
    includes: ['Local boat and life jacket', 'Snorkel mask', 'Lunch and drinking water', 'Local trip host'],
    bestFor: 'Easygoing swimmers and coastal daydreamers'
  },
  {
    id: 'phu-yen-first-light',
    title: 'First light at Ganh Da Dia',
    place: 'Tuy Hoa, Phu Yen',
    region: 'South Central Coast',
    category: 'Coast & culture',
    duration: 'Half day',
    price: 1250000,
    group: 'Small group · up to 6',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Morning light over a broad stretch of ocean',
    gallery: [
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1500&q=85',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1500&q=85',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1500&q=85'
    ],
    summary: 'Walk the volcanic shoreline before the day warms up, then stop for a slow breakfast in Tuy Hoa.',
    highlights: ['Sunrise walk by the basalt columns', 'A local breakfast stop', 'Easy return to town by late morning'],
    itinerary: ['05:00 · Pick-up in Tuy Hoa', '05:45 · Shore walk at first light', '07:15 · Coffee and breakfast', '09:00 · Return to town'],
    includes: ['Town pick-up and drop-off', 'Local host', 'Breakfast and coffee', 'Drinking water'],
    bestFor: 'Early risers and landscape lovers'
  },
  {
    id: 'quy-nhon-islands',
    title: 'A day among the islands',
    place: 'Ky Co, Quy Nhon',
    region: 'South Central Coast',
    category: 'On the water',
    duration: 'Full day',
    price: 2190000,
    group: 'Small group · up to 8',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Bright turquoise water along a sandy island shore',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=85',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1500&q=85',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1500&q=85'
    ],
    summary: 'Cross a bright blue bay for a beach afternoon, with plenty of time for a swim and a seafood lunch.',
    highlights: ['Short coastal boat crossing', 'Unhurried beach time', 'Fresh lunch near the water'],
    itinerary: ['08:30 · Meet near Quy Nhon', '09:00 · Boat across the bay', '10:00 · Beach and swim time', '12:30 · Lunch, then return mid-afternoon'],
    includes: ['Return boat ride', 'Local host', 'Lunch and water', 'Basic snorkel gear'],
    bestFor: 'Beach days, warm water, and long lunches'
  },
  {
    id: 'phu-quoc-sunset',
    title: 'Golden hour on Phu Quoc',
    place: 'An Thoi, Phu Quoc',
    region: 'Southern Islands',
    category: 'On the water',
    duration: 'Afternoon',
    price: 1690000,
    group: 'Small group · up to 8',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'A calm tropical beach in the warm late-afternoon light',
    gallery: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1500&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=85',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1500&q=85'
    ],
    summary: 'Leave the afternoon open for island-hopping, a quiet swim, and the sun slipping behind the water.',
    highlights: ['Late start, easy pace', 'Two island swim stops', 'Sunset on the return journey'],
    itinerary: ['14:00 · Meet at An Thoi harbour', '14:30 · Cruise to the islands', '15:00 · Swim and snorkel', '17:30 · Watch the sun set on the way back'],
    includes: ['Shared boat trip', 'Snorkel gear and life jacket', 'Fruit and drinking water', 'Local boat crew'],
    bestFor: 'A relaxed afternoon on the water'
  },
  {
    id: 'con-dao-coast-walk',
    title: 'The quiet side of Con Dao',
    place: 'Con Son Island, Con Dao',
    region: 'Southern Islands',
    category: 'Coast & culture',
    duration: 'Full day',
    price: 2450000,
    group: 'Small group · up to 6',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'A green headland meets the sea along a quiet island trail',
    gallery: [
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1500&q=85',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1500&q=85',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1500&q=85'
    ],
    summary: 'Follow the island road between a shaded forest path, a quiet beach, and a family-run lunch spot.',
    highlights: ['Shaded coastal walk', 'A swim at a quiet beach', 'Time with a local island host'],
    itinerary: ['08:30 · Meet in Con Son town', '09:00 · Walk a forest-edge trail', '11:30 · Swim and rest by the sea', '13:00 · Island lunch and return'],
    includes: ['Local host and island transport', 'Lunch and water', 'Trail access', 'Small-group guiding'],
    bestFor: 'Walkers who like a little shade with their sea'
  },
  {
    id: 'ha-long-kayak',
    title: 'Paddle the quieter coves',
    place: 'Lan Ha Bay, Cat Ba',
    region: 'Northern Coast',
    category: 'On the water',
    duration: 'Full day',
    price: 2890000,
    group: 'Small group · up to 6',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'A green mountain landscape reflected in still water',
    gallery: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1500&q=85',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1500&q=85',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1500&q=85'
    ],
    summary: 'Trade the busiest routes for a day of paddling, floating, and watching limestone cliffs drift by.',
    highlights: ['Guided kayak through sheltered coves', 'A quiet swimming stop', 'Lunch on board'],
    itinerary: ['08:00 · Meet at Cat Ba harbour', '09:00 · Board the day boat', '10:00 · Paddle and swim', '12:30 · Lunch on board, return mid-afternoon'],
    includes: ['Day boat and kayak', 'Paddle and life jacket', 'Lunch and water', 'Local guide'],
    bestFor: 'Confident swimmers and curious paddlers'
  }
];
