// Site configuration
export const config = {
  site: 'https://your-domain.com',
  title: 'Your Blog Title',
  description: 'Your comprehensive blog description goes here. Write 1-2 sentences about what your blog covers.',
  author: {
    name: 'Your Name',
    url: '/about'
  }
} as const;

// Blog categories
export const CATEGORIES = [
  { id: 'tech', name: 'Tech', icon: '💻' },
  { id: 'home-lab', name: 'Home Lab', icon: '🏠' },
  { id: 'finance', name: 'Finance', icon: '💰' },
  { id: 'leadership', name: 'Leadership', icon: '👔' }
] as const;

// Export valid category names for validation
export const VALID_CATEGORIES = CATEGORIES.map(c => c.name);

// Difficulty levels
export const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;
export type DifficultyLevel = typeof DIFFICULTY_LEVELS[number];
