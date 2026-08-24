import { Zap, Settings, Factory, Hammer, Waves, HardHat, CircleDot, Package } from 'lucide-react';

const ICONS = { Zap, Settings, Factory, Hammer, Waves, HardHat, CircleDot };

export default function CategoryIcon({ name, size = 22, className = '' }) {
  const Icon = ICONS[name] || Package;
  return <Icon size={size} className={className} />;
}
