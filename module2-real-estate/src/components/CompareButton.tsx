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


/**
 * Esto de aqui lo que hace es definir el boton que importo en propertCard, Lo que hace es lo
 * que ya mencione, si la propiedad NO esta seleccionada para poderse comparar entonces el
 * boton muestra "Comparar", si la propiedad SI esta seleccionada para comparar entonces
 * el boton muetra Quitar (Quitar de la comparacion no quitar la propiedad), al hacerle
 * click a esa vaina entonces ejecuta el codigo que esta en PropertyCard, entonces basicamente
 * 
 * CompareButton lo que hace es mostrar un boton
 *                    |
 *                    v
 * Property Card registra y le pasa el click a App.tsx
 *                    |
 *                    v
 * App.tsx decide si agrega o no dependiendo de cuantos hayan
 * ya en la comapracion
 */