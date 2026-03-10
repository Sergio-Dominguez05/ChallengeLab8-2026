import type React from 'react';
import { Button } from '@/components/ui/button';

interface CompareButtonProps {
  isSelected: boolean;
  onClick: () => void;
}

export function CompareButton({
  isSelected,
  onClick,
}: CompareButtonProps): React.ReactElement {
  return (
    <Button variant="outline" onClick={onClick}>
      {isSelected ? 'Quitar' : 'Comparar'}
    </Button>
  );
}